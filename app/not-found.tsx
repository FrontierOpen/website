import type { Metadata } from "next";
import PretextHeading from "./components/PretextHeading";
import SiteFooter from "./components/SiteFooter";

export const metadata: Metadata = {
  title: "页面未找到",
};

export default function NotFound() {
  return (
    <div className="theme-light-region theme-page min-h-[100dvh] bg-[#050608] text-white">
      <main
        id="main-content"
        className="mx-auto flex min-h-[72dvh] max-w-5xl items-center px-5 py-20 sm:px-8"
      >
        <div className="max-w-3xl">
          <div className="text-xs font-medium text-[#9be7c8]">404 / Not found</div>
          <PretextHeading
            as="h1"
            text="这里还不是入口"
            className="mt-5 text-5xl font-semibold leading-[1.04] tracking-[-0.04em] sm:text-7xl"
          />
          <p className="mt-6 max-w-xl text-base leading-8 text-white/66">
            你访问的页面不存在，或者已经移动。可以回到 Frontier World 首页，
            也可以直接查看公开的 Frontier Signals。
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="/"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition-[background,transform] hover:bg-[#dfe9fb] active:scale-[0.97]"
            >
              返回首页
            </a>
            <a
              href="https://signals.frontierworld.ai/"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/16 px-5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:bg-white/[0.07] hover:text-white"
            >
              查看 Frontier Signals
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
