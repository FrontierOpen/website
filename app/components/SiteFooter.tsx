import BrandMark from "./BrandMark";

export default function SiteFooter() {
  return (
    <footer className="theme-light-region theme-footer bg-[#050608] py-10 text-white/56">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <a
            href="/"
            className="group flex min-h-11 w-max items-center gap-3 rounded-lg text-white"
          >
            <BrandMark className="h-8 w-8 transition-transform duration-300 group-hover:scale-105" />
            <span className="text-sm font-semibold">Frontier World</span>
            <span className="text-xs text-white/58">前沿之境</span>
          </a>
          <p className="mt-4 max-w-md text-xs leading-6 text-white/56">
            给正在用 AI 做事的人：公开判断，完成实践，留下供后续复用与复查的方法。
          </p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs" aria-label="页脚导航">
            <a href="/#fit" className="inline-flex min-h-11 items-center rounded-md px-2 transition-colors hover:text-white">
              适合谁
            </a>
            <a href="/#proof" className="inline-flex min-h-11 items-center rounded-md px-2 transition-colors hover:text-white">
              公开证据
            </a>
            <a href="/#apply" className="inline-flex min-h-11 items-center rounded-md px-2 transition-colors hover:text-white">
              申请创始席位
            </a>
            <a href="/privacy" className="inline-flex min-h-11 items-center rounded-md px-2 transition-colors hover:text-white">
              隐私说明
            </a>
            <a
              href="https://signals.frontierworld.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-11 items-center gap-1 rounded-md px-2 transition-colors hover:text-white"
            >
              <span>Frontier Signals</span>
            </a>
          </nav>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/50">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-sm bg-[#9be7c8]" />
              商业验证期
            </span>
            <span>© 2026 Frontier World</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
