"use client";

import { RotateCcw } from "lucide-react";
import PretextHeading from "./components/PretextHeading";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main
      id="main-content"
      className="theme-light-region theme-page flex min-h-[100dvh] items-center justify-center bg-[#050608] px-5 text-white"
    >
      <div className="max-w-xl text-center">
        <div className="text-xs font-medium text-[#9be7c8]">Something went wrong</div>
        <PretextHeading
          as="h1"
          text="这一页暂时没有正常打开"
          className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-6xl"
        />
        <p className="mt-6 text-base leading-8 text-white/66">
          可以重新尝试；如果问题持续存在，请通过 contact@frontierworld.ai 联系我们。
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition-[background,transform] hover:bg-[#dfe9fb] active:scale-[0.97]"
        >
          <RotateCcw className="h-4 w-4" />
          再试一次
        </button>
      </div>
    </main>
  );
}
