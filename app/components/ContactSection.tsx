"use client";

import { useState, type FormEvent } from "react";
import { Check, Copy, Mail, Send } from "lucide-react";

const email = "contact@frontierworld.ai";
const topics = ["业务场景", "Signals 选题", "Commons 共创", "开放工具"];

export default function ContactSection() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [question, setQuestion] = useState("");
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleCopyEmail = async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard unavailable");
      }
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setFeedback("邮箱已复制。");
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setFeedback("复制失败，请直接发送邮件至 " + email + "。");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const context = question.trim();

    if (context.length < 8) {
      setFeedback("请再多写一点具体上下文，至少 8 个字。");
      return;
    }

    const subject = encodeURIComponent("[Frontier World] " + selectedTopic);
    const body = encodeURIComponent(
      "实践方向：" + selectedTopic + "\n\n问题与上下文：\n" + context
    );

    setFeedback("正在打开你的邮件客户端。");
    window.location.href = "mailto:" + email + "?subject=" + subject + "&body=" + body;
  };

  return (
    <section
      id="contact"
      className="border-b border-white/10 bg-[#050608] py-24 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="text-xs font-medium text-[#9be7c8] lg:col-span-2">
            04 / Together
          </div>
          <h2 className="text-balance text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:col-span-6 lg:text-6xl">
            带着一个
            <br />
            真实问题来。
          </h2>
          <p className="max-w-md text-sm leading-7 text-white/54 lg:col-span-4">
            一个具体业务卡点、一个值得争论的观察，或一次可以快速验证的原型协作，都可以成为起点。
          </p>
        </div>

        <div className="material-panel mt-16 grid overflow-hidden rounded-lg md:mt-24 lg:grid-cols-12">
          <div className="border-b border-white/12 p-6 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
            <div className="text-xs text-white/42">联系前沿之境</div>
            <a
              href={"mailto:" + email}
              className="mt-4 block rounded-md text-lg font-medium text-white transition-colors hover:text-[#b8d0ff]"
            >
              {email}
            </a>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/52">
              我们优先回应有明确上下文、愿意共同验证，也愿意复盘结果的问题。
            </p>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="mt-8 inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/14 bg-white/[0.05] px-3.5 text-xs font-medium text-white/76 transition-[background,transform,border-color] hover:border-white/26 hover:bg-white/[0.09] active:scale-[0.97]"
            >
              {copied ? <Check className="h-4 w-4 text-[#9be7c8]" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? "已复制" : "复制邮箱"}</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:col-span-8">
            <fieldset>
              <legend className="text-xs text-white/42">实践方向</legend>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => {
                      setSelectedTopic(topic);
                      setFeedback("");
                    }}
                    aria-pressed={selectedTopic === topic}
                    className={
                      "min-h-10 rounded-md border px-2 text-xs font-medium transition-[background,border-color,color,transform] active:scale-[0.96] " +
                      (selectedTopic === topic
                        ? "border-white bg-white text-black"
                        : "border-white/12 bg-black/18 text-white/58 hover:border-white/24 hover:text-white")
                    }
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </fieldset>

            <label htmlFor="practice-context" className="mt-7 block text-xs text-white/42">
              问题与上下文
            </label>
            <textarea
              id="practice-context"
              rows={5}
              value={question}
              onChange={(event) => {
                setQuestion(event.target.value);
                setFeedback("");
              }}
              aria-required="true"
              aria-describedby="contact-feedback"
              placeholder="例如：我们正在重构内部营销工作流，希望验证 Agent 协同中真正需要人工判断的边界。"
              className="mt-3 w-full resize-y rounded-lg border border-white/14 bg-black/20 p-4 text-sm leading-6 text-white outline-none transition-[background,border-color] placeholder:text-white/28 focus:border-[#76a7ff]/70 focus:bg-black/30"
            />

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div id="contact-feedback" className="min-h-5 text-xs text-white/48" role="status">
                {feedback}
              </div>
              <button
                type="submit"
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-black transition-[background,transform] hover:bg-[#dfe9fb] active:scale-[0.97]"
              >
                <Mail className="h-4 w-4" />
                <span>用邮件发送</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
