"use client";

import { useRef, useState, type FormEvent } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { Reveal } from "./MotionReveal";
import PretextHeading from "./PretextHeading";

const email = "contact@frontierworld.ai";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const roles = [
  "独立创作者",
  "2–10 人品牌内容团队",
  "2–10 人研究 / 产品教育团队",
];

const steps = [
  "提交一个真实选题、当前卡点和预期截止时间。",
  "我们先确认问题是否适合用这一场创始班推进。",
  "日期与城市确认后通知付费；完成付费才锁定席位。",
];

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [name, setName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [deadline, setDeadline] = useState("");
  const [city, setCity] = useState("");
  const [task, setTask] = useState("");
  const [copied, setCopied] = useState(false);
  const [applicationCopied, setApplicationCopied] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleCopyEmail = async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard unavailable");
      }

      await navigator.clipboard.writeText(email);
      setCopied(true);
      setFeedback("邮箱已复制。");
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setFeedback("复制失败，请直接发送邮件至 " + email + "。");
    }
  };

  const clearFeedback = () => setFeedback("");

  const buildApplicationText = () =>
    [
      "申请人：" + name.trim(),
      "联系邮箱：" + contactEmail.trim(),
      "当前身份：" + selectedRole,
      "所在 / 可参与城市：" + city.trim(),
      "预期截止时间：" + deadline.trim(),
      "",
      "真实选题 / 当前卡点：",
      task.trim(),
      "",
      "来源页面：" + window.location.href,
    ].join("\n");

  const validateApplication = () => {
    const form = formRef.current;
    if (!form || !form.reportValidity()) {
      return false;
    }

    const checks = [
      {
        valid: name.trim().length >= 2,
        field: "name",
        message: "请填写至少 2 个字的称呼。",
      },
      {
        valid: emailPattern.test(contactEmail.trim()),
        field: "email",
        message: "请填写有效的联系邮箱。",
      },
      {
        valid: deadline.trim().length > 0,
        field: "deadline",
        message: "请填写这项任务的预计截止时间。",
      },
      {
        valid: city.trim().length > 0,
        field: "city",
        message: "请填写所在或可以参与的城市。",
      },
      {
        valid: task.trim().length >= 20,
        field: "task",
        message: "请用至少 20 个字说明真实选题或当前卡点。",
      },
    ];

    const invalid = checks.find((check) => !check.valid);
    if (!invalid) {
      return true;
    }

    setFeedback(invalid.message);
    const field = form.elements.namedItem(invalid.field);
    if (field instanceof HTMLElement) {
      field.focus();
    }
    return false;
  };

  const handleCopyApplication = async () => {
    if (!validateApplication()) {
      return;
    }

    try {
      await navigator.clipboard.writeText(buildApplicationText());
      setApplicationCopied(true);
      setFeedback("完整申请已复制，可粘贴到任意邮件或聊天工具中发送。");
      window.setTimeout(() => setApplicationCopied(false), 2200);
    } catch {
      setFeedback("复制失败，请直接发送邮件至 " + email + "。");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateApplication()) {
      return;
    }

    const subject = encodeURIComponent(
      "[Frontier Commons 创始班申请] " + name.trim()
    );
    const body = encodeURIComponent(buildApplicationText());

    setFeedback("正在打开你的邮件客户端。请在邮件中确认内容并点击发送。");
    window.location.href = "mailto:" + email + "?subject=" + subject + "&body=" + body;
  };

  return (
    <section id="apply" className="theme-section-alt border-b border-white/10 bg-[#050608] py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-5xl">
          <div className="text-xs font-medium text-[#9be7c8]">
            04 / Apply
          </div>
          <PretextHeading
            text="把你这次必须交付的东西，说具体。"
            keepTogether={["必须交付", "说具体"]}
            className="mt-7 text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
          />
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/64">
            不用先写一份漂亮方案。说清你要交付什么、卡在哪里，以及什么时候必须完成。
          </p>
        </Reveal>

        <Reveal className="mt-14 md:mt-20" delay={0.08}>
          <div className="material-panel grid overflow-hidden rounded-xl lg:grid-cols-12">
            <div className="border-b border-white/12 p-6 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
            <div className="text-xs text-white/54">申请如何发生</div>
            <ol className="mt-6 grid gap-5">
              {steps.map((step, index) => (
                <li key={step} className="grid grid-cols-[1.5rem_1fr] gap-3">
                  <span className="text-xs tabular-nums text-[#9be7c8]">0{index + 1}</span>
                  <span className="text-sm leading-7 text-white/66">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8 border-t border-white/12 pt-6">
              <div className="text-xs text-white/54">邮件入口</div>
              <a
                href={"mailto:" + email}
                className="mt-3 block min-h-11 break-all rounded-md py-2 text-base font-medium text-white transition-colors hover:text-[#b8d0ff]"
              >
                {email}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/14 bg-white/[0.05] px-3.5 text-xs font-medium text-white/76 transition-[background,transform,border-color] hover:border-white/26 hover:bg-white/[0.09] active:scale-[0.97]"
              >
                {copied ? <Check className="h-4 w-4 text-[#9be7c8]" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? "已复制" : "复制邮箱"}</span>
              </button>
            </div>

            <a
              href="https://signals.frontierworld.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#b8d0ff] transition-colors hover:text-white"
            >
              <span>只是想先看内容？前往 Signals</span>
            </a>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="p-6 sm:p-8 lg:col-span-8">
            <fieldset>
              <legend className="text-xs text-white/54">你以什么身份来</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {roles.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      setSelectedRole(role);
                      clearFeedback();
                    }}
                    aria-pressed={selectedRole === role}
                    className={
                      "min-h-11 rounded-full border px-3 text-xs font-medium transition-[background,border-color,color,transform] active:scale-[0.97] " +
                      (selectedRole === role
                        ? "border-white bg-white text-black"
                        : "border-white/12 bg-black/18 text-white/66 hover:border-white/24 hover:bg-white/[0.07] hover:text-white")
                    }
                  >
                    {role}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-xs text-white/54">
                怎么称呼你
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={80}
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    clearFeedback();
                  }}
                  placeholder="你的姓名"
                  className="min-h-12 rounded-lg border border-white/14 bg-black/20 px-4 text-sm text-white outline-none transition-[background,border-color] placeholder:text-white/34 focus:border-[#76a7ff]/70 focus:bg-black/30"
                />
              </label>

              <label className="grid gap-2 text-xs text-white/54">
                联系邮箱
                <input
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  maxLength={160}
                  value={contactEmail}
                  onChange={(event) => {
                    setContactEmail(event.target.value);
                    clearFeedback();
                  }}
                  placeholder="you@example.com"
                  className="min-h-12 rounded-lg border border-white/14 bg-black/20 px-4 text-sm text-white outline-none transition-[background,border-color] placeholder:text-white/34 focus:border-[#76a7ff]/70 focus:bg-black/30"
                />
              </label>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-xs text-white/54">
                这项任务什么时候要交
                <input
                  name="deadline"
                  type="text"
                  required
                  maxLength={80}
                  value={deadline}
                  onChange={(event) => {
                    setDeadline(event.target.value);
                    clearFeedback();
                  }}
                  placeholder="例如：9 月 15 日；预计范围也可以"
                  className="min-h-12 rounded-lg border border-white/14 bg-black/20 px-4 text-sm text-white outline-none transition-[background,border-color] placeholder:text-white/34 focus:border-[#76a7ff]/70 focus:bg-black/30"
                />
              </label>

              <label className="grid gap-2 text-xs text-white/54">
                所在 / 可参与城市
                <input
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  required
                  maxLength={80}
                  value={city}
                  onChange={(event) => {
                    setCity(event.target.value);
                    clearFeedback();
                  }}
                  placeholder="例如：上海；也可以去杭州"
                  className="min-h-12 rounded-lg border border-white/14 bg-black/20 px-4 text-sm text-white outline-none transition-[background,border-color] placeholder:text-white/34 focus:border-[#76a7ff]/70 focus:bg-black/30"
                />
              </label>
            </div>

            <label htmlFor="practice-context" className="mt-5 block text-xs text-white/54">
              真实选题 / 当前卡点
            </label>
            <textarea
              id="practice-context"
              name="task"
              rows={6}
              required
              minLength={20}
              maxLength={2000}
              value={task}
              onChange={(event) => {
                setTask(event.target.value);
                clearFeedback();
              }}
              aria-describedby="contact-help contact-feedback"
              placeholder="例如：我们每周要发两篇 AI 产品教育内容，但研究、写作和审核没有统一边界。这次要在 9 月 15 日前完成一篇关于 Agent 协同的公众号稿，希望先跑通事实核验和多人审核流程。"
              className="mt-3 w-full resize-y rounded-lg border border-white/14 bg-black/20 p-4 text-sm leading-7 text-white outline-none transition-[background,border-color] placeholder:text-white/34 focus:border-[#76a7ff]/70 focus:bg-black/30"
            />
            <p id="contact-help" className="mt-2 text-xs leading-6 text-white/50">
              至少 20 个字。请不要填写身份证号、账号密码、未脱敏客户数据或其他敏感资料。
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
              <div id="contact-feedback" className="min-h-5 text-xs leading-5 text-white/58" role="status">
                {feedback}
              </div>
              <button
                type="button"
                onClick={handleCopyApplication}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/16 bg-white/[0.05] px-4 text-sm font-medium text-white/78 transition-[background,transform,border-color] hover:border-white/28 hover:bg-white/[0.09] active:scale-[0.97]"
              >
                {applicationCopied ? (
                  <Check className="h-4 w-4 text-[#9be7c8]" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span>{applicationCopied ? "申请已复制" : "复制完整申请"}</span>
              </button>
              <button
                type="submit"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition-[background,transform] hover:bg-[#dfe9fb] active:scale-[0.97]"
              >
                <Mail className="h-4 w-4" />
                <span>打开邮件，完成申请</span>
              </button>
            </div>

            <p className="mt-5 border-t border-white/10 pt-5 text-xs leading-6 text-white/50">
              本站不会上传或保存你在表单中填写的内容。按钮只会在本机打开邮件客户端，
              请在邮件里再次确认后发送。日期、场地、取消 / 延期 / 退款与开票规则会在付款前书面确认；
              这些信息确认前不会收款。
            </p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
