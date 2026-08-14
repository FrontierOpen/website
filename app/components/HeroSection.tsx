"use client";

import { useState } from "react";
import { Activity, ArrowDown, ArrowUpRight, Braces, Users } from "lucide-react";

const practices = [
  {
    id: "signals",
    index: "01",
    short: "Signals",
    name: "看见变化",
    label: "Frontier Signals",
    description:
      "追踪改变工作与组织的信号，给出可证伪、可继续追问的判断。",
    note: "持续观察 / 周期性发布",
    link: "https://signals.frontierworld.ai/",
    linkLabel: "阅读最新观察",
    external: true,
    icon: Activity,
  },
  {
    id: "commons",
    index: "02",
    short: "Commons",
    name: "共同实践",
    label: "Frontier Commons",
    description:
      "围绕真实问题协作，用最小原型和真实反馈把观点推进到结果。",
    note: "闭门共创 / 场景验证",
    link: "#contact",
    linkLabel: "带着问题来",
    external: false,
    icon: Users,
  },
  {
    id: "open",
    index: "03",
    short: "Open",
    name: "开放成果",
    label: "Frontier Open",
    description:
      "把验证过的方法整理成报告、代码与工作流，留下可复用的起点。",
    note: "报告 / 代码 / Playbooks",
    link: "#method",
    linkLabel: "查看工作方法",
    external: false,
    icon: Braces,
  },
] as const;

export default function HeroSection() {
  const [activePractice, setActivePractice] = useState(0);
  const current = practices[activePractice];
  const ActiveIcon = current.icon;

  return (
    <section className="relative min-h-[92dvh] overflow-hidden border-b border-white/10 bg-[#050608]">
      <img
        src="/frontier-passage.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[66%_center] opacity-95 sm:object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,5,8,0.98)_0%,rgba(3,5,8,0.78)_38%,rgba(3,5,8,0.2)_72%,rgba(3,5,8,0.38)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,8,0.26)_0%,rgba(3,5,8,0.02)_50%,rgba(3,5,8,0.9)_100%)]" />

      <div className="relative mx-auto flex min-h-[92dvh] max-w-7xl items-center px-5 pb-24 pt-24 sm:px-8 sm:pt-32">
        <div className="grid w-full items-center gap-9 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.72fr)] lg:gap-16">
          <div className="hero-copy max-w-3xl">
            <div className="mb-5 flex items-center gap-3 text-xs font-medium text-white/58">
              <span className="h-px w-8 bg-[#9be7c8]" />
              <span>Independent AI practice network</span>
            </div>
            <h1 className="text-balance font-semibold leading-[0.96] text-white">
              <span className="block text-[clamp(3.15rem,8vw,6.6rem)]">Frontier World</span>
              <span className="mt-4 block text-2xl font-medium text-white/78 sm:text-3xl">
                前沿之境
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-white/68 sm:text-lg sm:leading-8">
              观察 AI 时代正在发生的变化，让可信的人围绕真实问题共同实践，再把验证过的方法开放出来。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="https://signals.frontierworld.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-black transition-[background,transform] duration-200 hover:bg-[#dfe9fb] active:scale-[0.97]"
              >
                <span>读 Frontier Signals</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#actions"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/18 bg-black/18 px-4 text-sm font-medium text-white/82 backdrop-blur-md transition-[background,border-color,transform] duration-200 hover:border-white/30 hover:bg-white/[0.08] active:scale-[0.97]"
              >
                <span>查看实践</span>
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="hero-stage material-panel relative overflow-hidden rounded-lg p-2">
            <div
              className="grid grid-cols-3 gap-1 rounded-md bg-black/28 p-1"
              aria-label="Frontier World 三种实践形态"
            >
              {practices.map((practice, index) => (
                <button
                  key={practice.id}
                  type="button"
                  onClick={() => setActivePractice(index)}
                  aria-pressed={activePractice === index}
                  className={
                    "min-h-9 rounded-md px-2 text-xs font-medium transition-[background,color,transform] duration-200 active:scale-[0.96] " +
                    (activePractice === index
                      ? "bg-white text-black"
                      : "text-white/52 hover:bg-white/[0.07] hover:text-white")
                  }
                >
                  {practice.short}
                </button>
              ))}
            </div>

            <div
              key={current.id}
              className="practice-copy relative flex min-h-[11.75rem] flex-col justify-between px-4 pb-4 pt-4 sm:min-h-[13.75rem] sm:px-5 sm:pt-5"
            >
              <img
                src="/passage-mark-white.svg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 bottom-3 h-36 w-36 opacity-[0.055]"
              />
              <div className="relative">
                <div className="mb-3 flex items-center justify-between text-xs text-white/45 sm:mb-5">
                  <span>{current.index} / {current.label}</span>
                  <ActiveIcon className="h-4 w-4 text-[#9be7c8]" />
                </div>
                <h2 className="text-2xl font-semibold text-white">{current.name}</h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/62">
                  {current.description}
                </p>
              </div>
              <div className="relative mt-4 flex items-end justify-end gap-4 border-t border-white/12 pt-4 sm:mt-6 sm:justify-between">
                <span className="hidden text-xs text-white/42 sm:inline">{current.note}</span>
                <a
                  href={current.link}
                  target={current.external ? "_blank" : undefined}
                  rel={current.external ? "noopener noreferrer" : undefined}
                  className="group flex shrink-0 items-center gap-1.5 rounded-md text-xs font-semibold text-[#b8d0ff] transition-colors hover:text-white"
                >
                  <span>{current.linkLabel}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/12 backdrop-blur-sm">
        <div className="mx-auto hidden h-16 max-w-7xl grid-cols-3 items-center px-8 text-xs text-white/42 sm:grid">
          <span>01 / 观察变化</span>
          <span className="text-center">02 / 共同实践</span>
          <span className="text-right">03 / 开放成果</span>
        </div>
      </div>
    </section>
  );
}
