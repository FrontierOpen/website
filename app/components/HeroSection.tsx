import { Check } from "lucide-react";
import HeroParallaxImage from "./HeroParallaxImage";
import { Reveal, RevealAside } from "./MotionReveal";
import PretextHeading from "./PretextHeading";

const deliverables = [
  "选题判断卡",
  "事实与主张台账",
  "可继续编辑或发布的样稿",
  "供下一次复用、30 天后复查的工作流",
  "一个 30 天验证指标",
];

export default function HeroSection() {
  return (
    <section className="theme-light-region theme-hero relative min-h-[92dvh] overflow-hidden border-b border-white/10 bg-[#050608]">
      <HeroParallaxImage />
      <div className="theme-hero-overlay-horizontal absolute inset-0 bg-[linear-gradient(90deg,rgba(3,5,8,0.98)_0%,rgba(3,5,8,0.78)_38%,rgba(3,5,8,0.2)_72%,rgba(3,5,8,0.38)_100%)]" />
      <div className="theme-hero-overlay-vertical absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,8,0.26)_0%,rgba(3,5,8,0.02)_50%,rgba(3,5,8,0.9)_100%)]" />

      <div className="relative mx-auto flex min-h-[92dvh] max-w-7xl items-center px-5 pb-20 pt-24 sm:px-8 sm:pb-28 sm:pt-32">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(21rem,0.68fr)] lg:gap-16">
          <Reveal className="max-w-4xl">
            <div className="mb-4 flex items-center gap-3 text-xs font-medium text-white/62 sm:mb-6">
              <span className="h-px w-8 bg-[#9be7c8]" />
              <span>Frontier Commons · 创始班适配度申请</span>
            </div>

            <PretextHeading
              as="h1"
              text="把一条 AI 选题，做成可信、可发布的成果"
              minScale={0.62}
              keepTogether={["选题", "可发布"]}
              className="max-w-4xl text-[clamp(2.35rem,6.5vw,5.8rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-white"
            />

            <p className="mt-5 max-w-2xl text-pretty text-base leading-8 text-white/72 sm:mt-7 sm:text-lg">
              面向每周交付 AI / 科技内容的独立创作者与 2–10 人小团队。
              带真实选题和截止时间来，完成判断、核验、样稿，并留下供下一次复用的流程。
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
              <a
                href="#apply"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition-[background,transform] duration-200 hover:bg-[#dfe9fb] active:scale-[0.97]"
              >
                <span>申请创始席位</span>
              </a>
              <a
                href="#proof"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/18 bg-black/18 px-5 text-sm font-medium text-white/84 backdrop-blur-md transition-[background,border-color,transform] duration-200 hover:border-white/32 hover:bg-white/[0.08] active:scale-[0.97]"
              >
                <span>先看公开证据</span>
              </a>
            </div>

            <p className="mt-4 text-xs leading-6 text-white/50">
              申请不等于占位。日期与城市确认后再完成付费，以实际通知为准。
            </p>
          </Reveal>

          <RevealAside
            className="material-panel relative overflow-hidden rounded-xl p-2"
            delay={0.12}
            ariaLabel="Frontier Commons 创始班交付概览"
          >
            <div className="rounded-lg bg-black/32 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4 border-b border-white/12 pb-5">
                <div>
                  <div className="text-xs text-[#9be7c8]">你带来</div>
                  <p className="mt-2 text-base font-medium text-white">
                    一个真实选题 + 明确截止时间
                  </p>
                </div>
                <span className="shrink-0 rounded-md border border-[#9be7c8]/30 bg-[#9be7c8]/10 px-2.5 py-1 text-[11px] font-medium text-[#bcefdc]">
                  首轮验证
                </span>
              </div>

              <div className="pt-5">
                <div className="text-xs text-white/50">你带走</div>
                <ul className="mt-4 grid gap-3">
                  {deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-white/74">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-[#9be7c8]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/12 pt-5 text-center">
                <div>
                  <div className="text-base font-semibold tabular-nums text-white">3–4h</div>
                  <div className="mt-1 text-[11px] text-white/50">线下共创</div>
                </div>
                <div className="border-x border-white/10">
                  <div className="text-base font-semibold tabular-nums text-white">8–12</div>
                  <div className="mt-1 text-[11px] text-white/50">人 / 场</div>
                </div>
                <div>
                  <div className="text-base font-semibold tabular-nums text-white">¥699</div>
                  <div className="mt-1 text-[11px] text-white/50">创始价 / 人</div>
                </div>
              </div>
            </div>
          </RevealAside>
        </div>
      </div>

      <div className="theme-hero-footer absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/14 backdrop-blur-sm">
        <div className="mx-auto hidden h-14 max-w-7xl grid-cols-3 items-center px-8 text-xs text-white/50 sm:grid">
          <span>For / 独立创作者</span>
          <span className="text-center">For / 2–10 人内容团队</span>
          <span className="text-right">Outcome / 可检查成果</span>
        </div>
      </div>
    </section>
  );
}
