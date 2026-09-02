import type { Metadata } from "next";
import { Mail } from "lucide-react";
import BrandMark from "../components/BrandMark";
import PretextHeading from "../components/PretextHeading";
import SiteFooter from "../components/SiteFooter";
import ThemeToggle from "../components/ThemeToggle";

export const metadata: Metadata = {
  title: "隐私说明",
  description: "Frontier World 网站如何处理访问与创始班申请信息。",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "隐私说明 | Frontier World",
    description: "Frontier World 网站如何处理访问与创始班申请信息。",
    type: "website",
    locale: "zh_CN",
    url: "https://frontierworld.ai/privacy",
    siteName: "Frontier World",
    images: [
      {
        url: "/frontier-passage.jpg",
        width: 1920,
        height: 1080,
        alt: "Frontier World 前沿之境的深色空间视觉",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "隐私说明 | Frontier World",
    description: "Frontier World 网站如何处理访问与创始班申请信息。",
    images: ["/frontier-passage.jpg"],
  },
};

const sections = [
  {
    title: "申请表里的内容",
    body:
      "首页申请表只在你的浏览器里整理邮件正文。点击提交后，网站会打开本机邮件客户端；在你亲自发送前，这些内容不会通过本站上传或保存。",
  },
  {
    title: "你主动发送的邮件",
    body:
      "发送到 contact@frontierworld.ai 的姓名、邮箱、任务背景与其他内容，只用于判断申请是否适配、回复沟通和安排后续。请不要发送账号密码、身份证号或未脱敏客户数据。",
  },
  {
    title: "基础访问记录",
    body:
      "本站由 Cloudflare 托管。为提供安全、稳定的访问，托管服务可能处理 IP 地址、浏览器类型、请求时间和错误日志等技术信息。当前页面没有接入额外的广告追踪或站内表单数据库。",
  },
  {
    title: "外部链接",
    body:
      "访问 Frontier Signals、RSS 或其他外部网站时，将适用对应网站和服务提供方的隐私规则。我们不会把外部链接伪装成本站内完成的提交。",
  },
  {
    title: "更新与联系",
    body:
      "如果网站以后接入真实表单、分析工具或支付能力，本说明会在上线前更新。你也可以通过 contact@frontierworld.ai 询问、更正或请求删除已经通过邮件提供的信息。",
  },
];

export default function PrivacyPage() {
  return (
    <div className="theme-light-region theme-page min-h-[100dvh] bg-[#050608] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
          <a href="/" className="flex min-h-11 items-center gap-3 rounded-full">
            <BrandMark className="h-8 w-8" />
            <span className="text-sm font-semibold">Frontier World</span>
          </a>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="/"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-white/70 transition-colors hover:bg-white/[0.07] hover:text-white"
            >
              返回首页
            </a>
          </div>
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24">
        <div className="text-xs font-medium text-[#9be7c8]">Privacy / 2026.08.31</div>
        <PretextHeading
          as="h1"
          text="隐私说明"
          className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-6xl"
        />
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/66">
          这份说明只写当前网站实际发生的事情。现在的申请动作依赖你的邮件客户端，
          本站本身不接收、存储或分析表单内容。
        </p>

        <div className="mt-12 border-t border-white/14">
          {sections.map((section) => (
            <section key={section.title} className="border-b border-white/12 py-7">
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <p className="mt-3 text-base leading-8 text-white/62">{section.body}</p>
            </section>
          ))}
        </div>

        <a
          href="mailto:contact@frontierworld.ai"
          className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition-[background,transform] hover:bg-[#dfe9fb] active:scale-[0.97]"
        >
          <Mail className="h-4 w-4" />
          联系我们
        </a>
      </main>

      <SiteFooter />
    </div>
  );
}
