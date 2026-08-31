import { Reveal, RevealArticle } from "./MotionReveal";
import PretextHeading from "./PretextHeading";

const audiences = [
  {
    index: "01",
    role: "独立创作者",
    before: "临时找资料、临时写提示词，一篇内容反复返工。",
    after: "完成一篇可继续编辑的样稿，并留下一套供下一篇复用、30 天后复查的流程。",
  },
  {
    index: "02",
    role: "2–10 人小团队",
    before: "研究、写作、审核和发布的责任边界混在一起。",
    after: "把角色、核验边界和共同模板放进同一条交付链路。",
  },
  {
    index: "03",
    role: "内容交付负责人",
    before: "听过很多 AI 分享，回到真实截止时间前仍不知道先做什么。",
    after: "用一项真实任务跑通方法，并留下下一次可检查的起点。",
  },
];

export default function TensionBento() {
  return (
    <section id="fit" className="theme-section-base border-b border-white/10 bg-[#050608] py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-5xl">
          <div className="text-xs font-medium text-[#9be7c8]">
            01 / Who it is for
          </div>
          <PretextHeading
            text="你不缺更多 AI 课。你缺的是把这次交付做稳。"
            keepTogether={["这次交付"]}
            className="mt-7 text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
          />
          <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-white/64">
            Frontier Commons 只从真实选题和真实截止时间开始。不是先学完工具，再想它能做什么。
          </p>
        </Reveal>

        <div className="mt-14 border-t border-white/14 md:mt-20">
          {audiences.map((item) => (
            <RevealArticle
              key={item.index}
              delay={Number(item.index) * 0.06}
              className="grid gap-5 border-b border-white/12 py-7 md:grid-cols-12 md:items-center md:gap-8 md:px-4 md:py-9"
            >
              <div className="flex items-center gap-4 text-xs md:col-span-2">
                <span className="font-medium text-white/76">{item.index}</span>
                <span className="text-[#b8d0ff]">{item.role}</span>
              </div>
              <p className="text-base leading-7 text-white/58 md:col-span-5">{item.before}</p>
              <p className="text-base font-medium leading-7 text-white md:col-span-5">{item.after}</p>
            </RevealArticle>
          ))}
        </div>

        <Reveal
          className="mt-8 grid gap-3 border-l-2 border-white/16 pl-5 text-sm leading-7 text-white/58 sm:grid-cols-[auto_1fr] sm:gap-6"
          delay={0.08}
          distance={14}
        >
          <span className="font-medium text-white/82">暂不适合</span>
          <p>
            只想听趋势、没有真实交付任务，或期待一场活动直接承诺涨粉、融资与“一键提效”的人。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
