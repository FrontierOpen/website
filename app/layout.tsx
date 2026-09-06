import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://frontierworld.ai'),
  title: 'Frontier World · 前沿之境',
  alternates: { canonical: '/' },
  description: 'Frontier World 的播客、观察与开放项目。',
  icons: { icon: '/favicon.png' },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
