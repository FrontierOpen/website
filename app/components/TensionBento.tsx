const tensions = [
  {
    index: "01",
    label: "速度",
    title: "工具越来越快，判断不能越来越薄。",
    description:
      "模型、产品和工作流每天都在变化。真正稀缺的，不是追完所有更新，而是知道哪些变化值得进入自己的现实。",
    signal: "从热点转述，走向持续判断",
  },
  {
    index: "02",
    label: "协作",
    title: "从认识很多人，走向共同完成一件事。",
    description:
      "连接本身不会自动产生价值。只有一个真实问题、明确分工和可检验结果，才能让关系成为协作。",
    signal: "从交换观点，走向场景验证",
  },
  {
    index: "03",
    label: "沉淀",
    title: "从一次有效，走向可以被复用。",
    description:
      "经验如果只停留在个人叙述里，很快就会消失。方法需要被整理成代码、报告和工作流，才能继续生长。",
    signal: "从口头经验，走向开放资产",
  },
];

export default function TensionBento() {
  return (
    <section
      id="why"
      className="border-b border-white/10 bg-[#050608]"
    >
      <div className="flex h-14 items-center justify-between border-b border-white/10 px-5 text-xs sm:hidden">
        <span className="font-medium text-[#9be7c8]">01 / Why now</span>
        <span className="text-white/34">继续向下</span>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="hidden text-xs font-medium text-[#9be7c8] sm:block lg:col-span-2">
            01 / Why now
          </div>
          <h2 className="text-balance text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:col-span-6 lg:text-6xl">
            变化很快。
            <br />
            真正稀缺的是方向。
          </h2>
          <p className="max-w-md text-pretty text-sm leading-7 text-white/56 lg:col-span-4">
            AI 正在扩大每个人能做的事，也在放大噪音。前沿之境关心三个更慢、也更重要的问题。
          </p>
        </div>

        <div className="mt-16 border-t border-white/14 md:mt-24">
          {tensions.map((item) => (
            <article
              key={item.index}
              className="group grid min-h-[13rem] gap-5 border-b border-white/12 py-8 transition-colors duration-300 hover:bg-white/[0.025] md:grid-cols-12 md:items-center md:px-4"
            >
              <div className="flex items-center gap-4 text-xs text-white/40 md:col-span-2">
                <span className="font-medium text-white/72">{item.index}</span>
                <span>{item.label}</span>
              </div>
              <h3 className="max-w-xl text-2xl font-medium leading-snug text-white md:col-span-5 md:text-3xl">
                {item.title}
              </h3>
              <div className="md:col-span-5 md:grid md:grid-cols-[1fr_auto] md:items-end md:gap-8">
                <p className="max-w-lg text-sm leading-7 text-white/54">
                  {item.description}
                </p>
                <span className="mt-5 block whitespace-nowrap text-xs text-[#b8d0ff] md:mt-0">
                  {item.signal}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
