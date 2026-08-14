import { Hammer, MessageSquareText, ScanSearch, Share2 } from "lucide-react";

const stages = [
  {
    index: "01",
    label: "Signal",
    title: "捕捉真实变化",
    description:
      "从新闻、产品和一线实践中发现不寻常的变化，分清短期热闹与长期结构。",
    output: "一条值得追踪的判断",
    icon: ScanSearch,
  },
  {
    index: "02",
    label: "Conversation",
    title: "校正不同视角",
    description:
      "邀请真正处在问题里的人参与，让观点经历质疑、补充和重新定义。",
    output: "一个更准确的问题",
    icon: MessageSquareText,
  },
  {
    index: "03",
    label: "Practice",
    title: "进入具体行动",
    description:
      "把讨论变成最小可行实践，用真实用户、真实数据与真实约束检验它。",
    output: "一段可复盘的证据",
    icon: Hammer,
  },
  {
    index: "04",
    label: "Open",
    title: "沉淀可复用成果",
    description:
      "把被验证的方法整理为报告、代码和工作流，让结论能够被检查和继续使用。",
    output: "一个开放的起点",
    icon: Share2,
  },
];

export default function MethodSection() {
  return (
    <section
      id="method"
      className="border-b border-white/10 bg-[#050608] py-24 md:py-36"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="text-xs font-medium text-[#9be7c8]">03 / How we work</div>
          <h2 className="mt-8 max-w-md text-balance text-4xl font-semibold leading-[1.1] text-white sm:text-5xl">
            不是预测未来。
            <br />
            是把下一步做出来。
          </h2>
          <p className="mt-7 max-w-sm text-sm leading-7 text-white/54">
            每个阶段都留下可以被检查的东西。判断、问题、证据、成果，缺一不可。
          </p>
        </div>

        <div className="border-t border-white/14 lg:col-span-8">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <article
                key={stage.index}
                className="group grid gap-5 border-b border-white/12 py-7 sm:grid-cols-[4rem_1fr] sm:py-9"
              >
                <div className="flex items-start justify-between sm:block">
                  <span className="text-xs font-medium text-white/44">{stage.index}</span>
                  <span className="mt-5 hidden h-9 w-9 items-center justify-center rounded-md border border-white/12 text-white/48 transition-colors duration-300 group-hover:border-[#76a7ff]/45 group-hover:text-[#b8d0ff] sm:flex">
                    <Icon className="h-4 w-4" />
                  </span>
                </div>

                <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(13rem,0.72fr)] md:items-end">
                  <div>
                    <div className="text-xs text-[#b8d0ff]">{stage.label}</div>
                    <h3 className="mt-2 text-2xl font-medium text-white">
                      {stage.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-7 text-white/54">
                      {stage.description}
                    </p>
                  </div>
                  <div className="md:text-right">
                    <div className="text-xs text-white/34">阶段产出</div>
                    <div className="mt-2 text-sm font-medium text-white/76">
                      {stage.output}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
