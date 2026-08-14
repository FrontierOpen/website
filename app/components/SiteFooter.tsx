import { ArrowUpRight } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="bg-[#050608] py-10 text-white/44">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <a
            href="#top"
            className="group flex w-max items-center gap-3 rounded-lg text-white"
          >
            <img
              src="/passage-mark-white.svg"
              alt=""
              width="28"
              height="28"
              className="h-7 w-7 transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-sm font-semibold">Frontier World</span>
            <span className="text-xs text-white/42">前沿之境</span>
          </a>
          <p className="mt-5 max-w-md text-xs leading-6 text-white/42">
            观察变化，共同实践，开放成果。
          </p>
        </div>

        <div className="flex flex-col gap-5 md:items-end">
          <nav className="flex flex-wrap items-center gap-5 text-xs" aria-label="页脚导航">
            <a href="#why" className="rounded-md transition-colors hover:text-white">为什么</a>
            <a href="#actions" className="rounded-md transition-colors hover:text-white">三大动作</a>
            <a href="#contact" className="rounded-md transition-colors hover:text-white">联系我们</a>
            <a
              href="https://signals.frontierworld.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 rounded-md transition-colors hover:text-white"
            >
              <span>Frontier Signals</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </nav>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-sm bg-[#9be7c8]" />
              Network online
            </span>
            <span>(c) 2026 Frontier World</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
