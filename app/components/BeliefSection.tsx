export default function BeliefSection() {
  return (
    <section
      id="belief"
      className="relative overflow-hidden border-b border-white/10 bg-[#0d1014] py-28 md:py-44"
    >
      <img
        src="/passage-mark-white.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-20 h-[28rem] w-[28rem] opacity-[0.035] md:-bottom-36 md:right-4 md:h-[40rem] md:w-[40rem]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-end">
        <div className="text-xs font-medium text-[#9be7c8] lg:col-span-2">
          What we believe
        </div>
        <blockquote className="text-balance text-3xl font-medium leading-[1.28] text-white/54 sm:text-4xl md:text-5xl lg:col-span-8 lg:text-6xl">
          前沿不是一个遥远的地方，也不是一句虚妄的“未来已来”。
          <span className="text-white">
            前沿只有进入真实实践，才开始产生公共价值。
          </span>
        </blockquote>
        <div className="text-xs leading-6 text-white/38 lg:col-span-2 lg:text-right">
          Frontier World manifesto
          <br />
          The Passage / 2026
        </div>
      </div>
    </section>
  );
}
