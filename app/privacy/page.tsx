import type { Metadata } from 'next';
import SiteHeader from '../site-header';
import { Footer } from '../site';
export const metadata: Metadata = {
  title: '隐私说明 · Frontier World',
  description: 'Frontier World 的邮件联系、基础访问记录与外部链接说明。',
  alternates: { canonical: '/privacy' },
};
const sections = [
  {
    title: "邮件链接",
    body:
      "点击本站的邮件链接会打开本机邮件客户端；在你亲自发送前，邮件内容不会通过本站上传或保存。",
  },
  {
    title: "你主动发送的邮件",
    body:
      "发送到 contact@frontierworld.ai 的姓名、邮箱、任务背景与其他内容，只用于回复沟通和安排后续。请不要发送账号密码、身份证号或未脱敏客户数据。",
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
    <>
      <SiteHeader lang="zh" path="" />
      <main id="main" className="container section utility-page">
        <h1>隐私说明</h1>
        <div className="privacy-sections">
          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
        <a className="text-link" href="mailto:contact@frontierworld.ai">联系我们</a>
      </main>
      <Footer lang="zh" path="" />
    </>
  );
}
