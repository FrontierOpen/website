import { ClipboardCheck, FileCheck2, FileText, Gauge, Workflow } from "lucide-react";
import { Reveal, RevealArticle } from "./MotionReveal";
import PretextHeading from "./PretextHeading";

const deliverables = [
  {
    index: "01",
    title: "选题判断卡",
    description: "先回答这条变化和谁有关、为什么现在值得做，以及什么条件下应该停手。",
    icon: ClipboardCheck,
  },
  {
    index: "02",
    title: "事实与主张台账",
    description: "把一手来源、可确认事实、编辑判断和不确定性边界分开，避免顺滑但无法核对。",
    icon: FileCheck2,
  },
  {
    index: "03",
    title: "可发布样稿",
    description: "完成一份可以继续编辑或发布的真实成果，不拿课堂练习代替你的截止时间。",
    icon: FileText,
  },
  {
    index: "04",
    title: "复用工作流",
    description: "把本次方法整理成供下一次复用、并在 30 天后复查的步骤、模板与验收条件。",
    icon: Workflow,
  },
  {
    index: "05",
    title: "30 天验证指标",
    description: "记录耗时、重大返工、事实错误或复用情况，用后续结果判断方法是否真的成立。",
    icon: Gauge,
  },
];

export default function ActionsSection() {
  return (
    <section id="commons" className="theme-section-base border-b border-white/10 bg-[#050608] py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-5xl">
          <div className="text-xs font-medium text-[#9be7c8]">03 / Frontier Commons 01</div>
          <PretextHeading
            text="带着一个真实选题来。带着五件能检查的东西走。"
            keepTogether={["真实选题", "五件", "能检查", "东西走"]}
            className="mt-7 text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
          />
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/62">
            第一场只验证一件事：能否在一次共创里，把“我想写这个”推进成可信成果，
            并留下一套供后续复用、30 天后可复查的流程。
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-4" delay={0.06} distance={16}>
            <dl className="grid grid-cols-2 gap-x-5 gap-y-6 border-t border-white/12 pt-7 text-sm">
              <div>
                <dt className="text-white/52">形式</dt>
                <dd className="mt-1.5 font-medium text-white">线下 3–4 小时</dd>
              </div>
              <div>
                <dt className="text-white/52">人数</dt>
                <dd className="mt-1.5 font-medium text-white">8 人开班 / 12 人封顶</dd>
              </div>
              <div>
                <dt className="text-white/52">创始价</dt>
                <dd className="mt-1.5 font-medium text-white">¥699 / 人</dd>
              </div>
              <div>
                <dt className="text-white/52">当前状态</dt>
                <dd className="mt-1.5 font-medium text-[#bcefdc]">收集适配度申请</dd>
              </div>
            </dl>

            <a
              href="#apply"
              className="group mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition-[background,transform] hover:bg-[#dfe9fb] active:scale-[0.97]"
            >
              <span>申请创始席位</span>
            </a>
          </Reveal>

          <div className="border-t border-white/14 lg:col-span-8">
            {deliverables.map((item) => {
              const Icon = item.icon;
              return (
                <RevealArticle
                  key={item.index}
                  delay={Number(item.index) * 0.055}
                  className="group grid gap-5 border-b border-white/12 py-7 sm:grid-cols-[4rem_1fr] sm:py-8"
                >
                  <div className="flex items-center justify-between sm:block">
                    <span className="text-xs font-medium text-white/56">{item.index}</span>
                    <span className="mt-4 hidden h-10 w-10 items-center justify-center rounded-md border border-white/12 text-white/56 transition-colors group-hover:border-[#76a7ff]/45 group-hover:text-[#b8d0ff] sm:flex">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="grid gap-3 md:grid-cols-[minmax(12rem,0.66fr)_1fr] md:items-start md:gap-8">
                    <h3 className="text-2xl font-medium text-white">{item.title}</h3>
                    <p className="max-w-xl text-base leading-7 text-white/60">{item.description}</p>
                  </div>
                </RevealArticle>
              );
            })}
          </div>
        </div>

        <Reveal className="mt-8 max-w-3xl" delay={0.1} distance={12}>
          <p className="text-sm leading-7 text-white/56">
            不承诺涨粉，不承诺拿投资，不讲泛 AI 名词，也不提供无限期 1v1。
            日期与城市会根据首批适配申请确认，申请本身不锁定席位。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
