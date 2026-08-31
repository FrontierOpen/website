import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://frontierworld.ai"),
  title: {
    default: "AI 内容工作流实践 | Frontier World 前沿之境",
    template: "%s | Frontier World",
  },
  description:
    "面向独立创作者与 2–10 人小团队，把真实 AI / 科技选题推进成可信、可发布的成果，并留下供下一次复用的工作流。",
  keywords: [
    "Frontier World",
    "前沿之境",
    "AI 内容工作流",
    "AI 科技内容",
    "Frontier Commons",
  ],
  authors: [{ name: "Frontier World" }],
  creator: "Frontier World",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: {
      url: "/frontier-mark-favicon.png",
      type: "image/png",
      sizes: "360x360",
    },
    shortcut: "/frontier-mark-favicon.png",
    apple: "/frontier-mark-favicon.png",
  },
  openGraph: {
    title: "把一条 AI 选题做成可信、可发布的成果，并留下工作流",
    description: "Frontier Commons 创始班适配度申请，面向独立创作者与 2–10 人小团队。",
    type: "website",
    locale: "zh_CN",
    url: "https://frontierworld.ai",
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
    title: "把一条 AI 选题做成可信、可发布的成果，并留下工作流",
    description: "Frontier Commons 创始班适配度申请。",
    images: ["/frontier-passage.jpg"],
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
};

const themeBootScript = `
  (() => {
    let mode = "system";
    try {
      const stored = window.localStorage.getItem("frontier-theme:v1");
      if (stored === "system" || stored === "light" || stored === "dark") {
        mode = stored;
      }
    } catch {}
    const theme =
      mode === "system"
        ? window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark"
        : mode;
    document.documentElement.dataset.themeMode = mode;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute("content", theme === "light" ? "#ffffff" : "#050608");
    }
  })();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      data-theme="dark"
      data-theme-mode="system"
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#050608" />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          跳到主要内容
        </a>
        {children}
      </body>
    </html>
  );
}
