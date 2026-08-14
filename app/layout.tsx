import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://frontierworld.ai"),
  title: {
    default: "Frontier World | 前沿之境",
    template: "%s | Frontier World",
  },
  description: "观察 AI 时代正在发生的变化，共同实践，并把被验证的方法开放出来。",
  keywords: ["Frontier World", "前沿之境", "AI", "开放实践"],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Frontier World | 前沿之境",
    description: "把前沿，变成实践。",
    type: "website",
    locale: "zh_CN",
    url: "https://frontierworld.ai",
    siteName: "Frontier World",
    images: [
      {
        url: "/frontier-passage.jpg",
        width: 1920,
        height: 1080,
        alt: "Frontier World Passage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frontier World | 前沿之境",
    description: "把前沿，变成实践。",
    images: ["/frontier-passage.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
