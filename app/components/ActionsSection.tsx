import { Activity, ArrowUpRight, Braces, Users } from "lucide-react";

const actions = [
  {
    index: "01",
    name: "Frontier Signals",
    title: "看见变化",
    description:
      "持续观察 AI、大模型与 Agent 如何重写工作和组织。我们不追求抢先表态，而是给出可以验证、也允许被推翻的判断。",
    evidence: "深度观察 / 趋势拆解 / 现场笔记",
    status: "持续发布",
    href: "https://signals.frontierworld.ai/",
    external: true,
    icon: Activity,
  },
  {
    index: "02",
    name: "Frontier Commons",
    title: "共同实践",
    description:
      "围绕真实业务问题组织小规模协作。从一句问题开始，用原型、代码和真实反馈把讨论推进到可以检验的结果。",
    evidence: "闭门圆桌 / 原型共创 / 场景验证",
    status: "议题制开放",
    href: "#contact",
    external: false,
    icon: Users,
  },
  {
    index: "03",
    name: "Frontier Open",
    title: "开放成果",
    description:
      "把被验证的方法整理成报告、代码与工作流。不是把答案封装起来，而是把下一个人可以继续前进的起点留下来。",
    evidence: "Open source / Reports / Playbooks",
    status: "持续沉淀",
    href: "#method",
    external: false,
    icon: Braces,
  },
] as const;

export default function ActionsSection() {
  return (
    <section
      id="actions"
      className="border-b border-white/10 bg-[#080a0d] py-24 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="text-xs font-medium text-[#9be7c8] lg:col-span-2">
            02 / What we do
          </div>
          <h2 className="text-balance text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:col-span-6 lg:text-6xl">
            三个动作，
            <br />
            构成一条进化之路。
          </h2>
          <p className="max-w-md text-sm leading-7 text-white/54 lg:col-span-4">
            观察不是终点，连接也不是终点。每一次工作，都要继续走向实践和开放。
          </p>
        </div>

        <div className="mt-16 border-t border-white/14 md:mt-24">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <a
                key={action.index}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                className="group grid min-h-[15rem] gap-6 border-b border-white/12 py-8 transition-[background,transform] duration-300 hover:bg-white/[0.035] active:scale-[0.995] md:grid-cols-12 md:items-center md:px-4"
              >
                <div className="flex items-center gap-4 md:col-span-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/14 text-[#b8d0ff] transition-colors duration-300 group-hover:border-white/28 group-hover:bg-white/[0.06]">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-xs text-white/42">{action.index}</span>
                </div>

                <div className="md:col-span-4">
                  <div className="text-xs text-white/42">{action.name}</div>
                  <h3 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                    {action.title}
                  </h3>
                </div>

                <p className="max-w-xl text-sm leading-7 text-white/56 md:col-span-4">
                  {action.description}
                </p>

                <div className="flex items-end justify-between gap-4 md:col-span-2 md:h-full md:flex-col md:items-end">
                  <span className="flex items-center gap-2 text-xs text-[#9be7c8]">
                    <span className="h-1.5 w-1.5 rounded-sm bg-[#9be7c8]" />
                    {action.status}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-white/42 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                </div>

                <div className="text-xs text-white/38 md:col-start-7 md:col-span-4">
                  {action.evidence}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
