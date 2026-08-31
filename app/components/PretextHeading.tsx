"use client";

import {
  layoutWithLines,
  prepareWithSegments,
  type PreparedTextWithSegments,
} from "@chenglou/pretext";
import { useEffect, useRef, useState } from "react";

type HeadingTag = "h1" | "h2";

type PretextHeadingProps = {
  as?: HeadingTag;
  text: string;
  className?: string;
  minScale?: number;
  keepTogether?: readonly string[];
};

type HeadingLayout = {
  fontSize: number | null;
  lines: string[];
};

const preparedCache = new Map<string, PreparedTextWithSegments>();
const EMPTY_KEEP_TOGETHER: readonly string[] = [];
let wordSegmenter: Intl.Segmenter | null = null;

function addPunctuationBreakHints(text: string) {
  return text.replace(/([，。！？；：])/g, "$1\u200B");
}

function addSemanticBreakHints(text: string, phrases: readonly string[]) {
  wordSegmenter ??= new Intl.Segmenter("zh-CN", { granularity: "word" });
  const protectedPhrases = [...new Set(phrases.filter(Boolean))].sort(
    (left, right) => right.length - left.length
  );
  const pieces: Array<{ text: string; protected: boolean }> = [];
  let cursor = 0;

  while (cursor < text.length) {
    let nextIndex = -1;
    let nextPhrase = "";

    for (const phrase of protectedPhrases) {
      const index = text.indexOf(phrase, cursor);
      if (
        index >= 0 &&
        (nextIndex < 0 || index < nextIndex ||
          (index === nextIndex && phrase.length > nextPhrase.length))
      ) {
        nextIndex = index;
        nextPhrase = phrase;
      }
    }

    if (nextIndex < 0) {
      pieces.push({ text: text.slice(cursor), protected: false });
      break;
    }

    if (nextIndex > cursor) {
      pieces.push({ text: text.slice(cursor, nextIndex), protected: false });
    }
    pieces.push({ text: nextPhrase, protected: true });
    cursor = nextIndex + nextPhrase.length;
  }

  const tokens: string[] = [];
  const appendToken = (token: string) => {
    if (!token) {
      return;
    }
    if (/^\s+$/u.test(token) && tokens.length > 0) {
      tokens[tokens.length - 1] += token;
      return;
    }
    if (/^[，。！？；：、,.!?;:]+$/u.test(token) && tokens.length > 0) {
      tokens[tokens.length - 1] += token;
      return;
    }
    tokens.push(token);
  };

  for (const piece of pieces) {
    if (piece.protected) {
      appendToken(piece.text);
      continue;
    }
    for (const segment of wordSegmenter.segment(piece.text)) {
      appendToken(segment.segment);
    }
  }

  return tokens.join("\u200B");
}

function getPreparedText(
  text: string,
  font: string,
  letterSpacing: number,
  preferPunctuationBreaks: boolean,
  keepTogether: readonly string[]
) {
  const hintedText = preferPunctuationBreaks
    ? addPunctuationBreakHints(text)
    : addSemanticBreakHints(text, keepTogether);
  const key =
    hintedText +
    "\n" +
    font +
    "\n" +
    letterSpacing +
    "\n" +
    preferPunctuationBreaks;
  const cached = preparedCache.get(key);
  if (cached) {
    return cached;
  }

  const prepared = prepareWithSegments(
    hintedText,
    font,
    {
      letterSpacing,
      // Clause-level breaks are cleaner on tablet and desktop. On narrow
      // screens, semantic word hints avoid splitting key terms in half.
      wordBreak: "keep-all",
    }
  );
  preparedCache.set(key, prepared);
  return prepared;
}

function getPreferredLineCount(width: number) {
  if (width >= 960) {
    return 1;
  }
  if (width >= 560) {
    return 2;
  }
  return 3;
}

export default function PretextHeading({
  as = "h2",
  text,
  className,
  minScale = 0.68,
  keepTogether = EMPTY_KEEP_TOGETHER,
}: PretextHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [headingLayout, setHeadingLayout] = useState<HeadingLayout>({
    fontSize: null,
    lines: [text],
  });
  const Heading = as;

  useEffect(() => {
    const heading = headingRef.current;
    if (
      !heading ||
      typeof ResizeObserver === "undefined" ||
      typeof Intl.Segmenter === "undefined"
    ) {
      return;
    }

    let animationFrame = 0;
    let cancelled = false;

    const applyLayout = () => {
      const containerWidth = Math.max(1, heading.clientWidth);
      // Canvas and DOM font metrics differ slightly in WebKit. Reserve enough
      // width that the manually laid-out lines never clip in Safari.
      const width = containerWidth * 0.95;
      const previousInlineSize = heading.style.fontSize;
      heading.style.fontSize = "";
      const computed = window.getComputedStyle(heading);
      const maxFontSize = Number.parseFloat(computed.fontSize);
      const computedLineHeight = Number.parseFloat(computed.lineHeight);
      const lineHeightRatio = Number.isFinite(computedLineHeight)
        ? computedLineHeight / maxFontSize
        : 1.08;
      const parsedLetterSpacing = Number.parseFloat(computed.letterSpacing);
      const letterSpacing = Number.isFinite(parsedLetterSpacing)
        ? parsedLetterSpacing
        : 0;
      const fontStyle =
        computed.fontStyle && computed.fontStyle !== "normal"
          ? computed.fontStyle + " "
          : "";
      const fontFamily = computed.fontFamily;
      const fontWeight = computed.fontWeight;
      heading.style.fontSize = previousInlineSize;

      const targetLines = getPreferredLineCount(containerWidth);
      const preferPunctuationBreaks = containerWidth >= 560;
      const minFontSize = maxFontSize * minScale;

      const layoutAt = (fontSize: number) => {
        const roundedSize = Math.round(fontSize * 10) / 10;
        const font =
          fontStyle +
          fontWeight +
          " " +
          roundedSize +
          "px " +
          fontFamily;
        const prepared = getPreparedText(
          text,
          font,
          letterSpacing,
          preferPunctuationBreaks,
          keepTogether
        );
        return {
          fontSize: roundedSize,
          result: layoutWithLines(
            prepared,
            width,
            roundedSize * lineHeightRatio
          ),
        };
      };

      let best = layoutAt(minFontSize);
      const maximum = layoutAt(maxFontSize);

      if (maximum.result.lineCount <= targetLines) {
        best = maximum;
      } else {
        let lower = minFontSize;
        let upper = maxFontSize;

        for (let index = 0; index < 9; index += 1) {
          const middle = (lower + upper) / 2;
          const candidate = layoutAt(middle);
          if (candidate.result.lineCount <= targetLines) {
            best = candidate;
            lower = middle;
          } else {
            upper = middle;
          }
        }
      }

      if (cancelled) {
        return;
      }

      const lines = best.result.lines.map((line) => {
        return line.text.replaceAll("\u200B", "");
      });
      setHeadingLayout((current) => {
        const unchanged =
          current.fontSize === best.fontSize &&
          current.lines.length === lines.length &&
          current.lines.every((line, index) => line === lines[index]);
        return unchanged
          ? current
          : {
              fontSize: best.fontSize,
              lines,
            };
      });
    };

    const scheduleLayout = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(applyLayout);
    };

    const resizeObserver = new ResizeObserver(scheduleLayout);
    resizeObserver.observe(heading);
    scheduleLayout();
    void document.fonts?.ready.then(scheduleLayout);

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [keepTogether, minScale, text]);

  return (
    <Heading
      ref={headingRef}
      aria-label={text}
      className={"pretext-heading " + (className ?? "")}
      style={
        headingLayout.fontSize === null
          ? undefined
          : { fontSize: headingLayout.fontSize + "px" }
      }
    >
      {headingLayout.lines.map((line, index) => (
        <span
          key={index + "-" + line}
          aria-hidden="true"
          className={
            headingLayout.fontSize === null
              ? "block"
              : "block whitespace-nowrap"
          }
        >
          {line}
        </span>
      ))}
    </Heading>
  );
}
