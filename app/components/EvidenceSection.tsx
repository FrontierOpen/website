import { CheckCircle2, CircleDotDashed, FileClock, Rss } from "lucide-react";
import { Reveal } from "./MotionReveal";
import PretextHeading from "./PretextHeading";

const publishedArticles = [
  {
    date: "2026.08.18",
    title: "GPT-5.6 Sol 1M 上下文向 ChatGPT 账号开放",
    href: "https://signals.frontierworld.ai/2026/08/18/codex-gpt56-sol-1m-context/",
  },
  {
    date: "2026.08.16",
    title: "Claude Agent 组成团队后，开始串通和互相攻击",
    href: "https://signals.frontierworld.ai/2026/08/16/anthropic-multiagent-coordination/",
  },
  {
    date: "2026.08.15",
    title: "Claude 文本水印要来了，只能说明它可能参与过",
    href: "https://signals.frontierworld.ai/2026/08/15/claude-text-watermark/",
  },
];

const validationStatus = [
  {
    status: "已完成",
    title: "公开网站与 RSS 发布链路",
    detail: "公开文章与 RSS 可以直接检查；内容保留来源与判断边界。",
    kind: "complete",
  },
  {
    status: "已定义，待首次交付",
    title: "Frontier Commons 01 的交付物",
    detail: "真实选题、事实台账、可发布样稿、复用流程与 30 天指标。",
    kind: "defined",
  },
  {
    status: "待验证",
    title: "付费、30 天复用率与企业案例",
    detail: "这些结果尚未成立，因此本站不展示虚构评价或“提效 X%”。",
    kind: "pending",
  },
];

export default function EvidenceSection() {
  return (
    <section id="proof" className="theme-section-alt border-b border-white/10 bg-[#080a0d] py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-5xl">
          <div className="text-xs font-medium text-[#9be7c8]">
            02 / Proof
          </div>
          <PretextHeading
            text="先看已经做成的，再看仍在验证的"
            keepTogether={["已经做成", "仍在验证"]}
            className="mt-7 text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
          />
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/64">
            可信不是一串形容词。能打开的作品、说得清的边界，以及愿意公开承认的未知，才是证据。
          </p>
        </Reveal>

        <Reveal className="mt-14 lg:mt-20" delay={0.08}>
          <div className="grid overflow-hidden rounded-xl border border-white/14 lg:grid-cols-12">
            <div className="border-b border-white/12 bg-white/[0.035] p-6 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs text-white/54">可直接检查的公开成果</div>
                <h3 className="mt-2 text-2xl font-semibold text-white">Frontier Signals</h3>
              </div>
              <a
                href="https://signals.frontierworld.ai/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/14 px-3 text-xs font-medium text-white/72 transition-colors hover:border-white/28 hover:bg-white/[0.07] hover:text-white"
              >
                <Rss className="h-4 w-4" />
                RSS
              </a>
            </div>

            <div className="mt-7 border-t border-white/12">
              {publishedArticles.map((article) => (
                <a
                  key={article.href}
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid min-h-20 gap-3 border-b border-white/10 py-5 transition-colors hover:bg-white/[0.03] sm:grid-cols-[6.5rem_1fr] sm:items-center sm:px-2"
                >
                  <span className="text-xs tabular-nums text-white/52">{article.date}</span>
                  <span className="text-sm font-medium leading-6 text-white/78 transition-colors group-hover:text-white">
                    {article.title}
                  </span>
                </a>
              ))}
            </div>

            <a
              href="https://signals.frontierworld.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#b8d0ff] transition-colors hover:text-white"
            >
              <span>查看全部公开判断</span>
            </a>
            </div>

            <div className="p-6 sm:p-8 lg:col-span-5">
            <div className="text-xs text-white/54">当前验证状态</div>
            <div className="mt-7 grid gap-6">
              {validationStatus.map((item) => (
                <div key={item.title} className="grid grid-cols-[1.25rem_1fr] gap-3">
                  {item.kind === "complete" ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#9be7c8]" />
                  ) : item.kind === "defined" ? (
                    <FileClock className="mt-0.5 h-5 w-5 text-[#b8d0ff]" />
                  ) : (
                    <CircleDotDashed className="mt-0.5 h-5 w-5 text-[#b8d0ff]" />
                  )}
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-white">{item.title}</span>
                      <span className="text-[11px] text-white/54">{item.status}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/60">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
