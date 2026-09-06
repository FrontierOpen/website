import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Site from '../site';
import { navigation, shows, type Lang } from '@/lib/content';
const validPaths = [
  '',
  'podcasts',
  ...navigation.map((n) => n.path),
  ...shows.map((s) => `podcasts/${s.slug}`),
];
async function resolve(params: Promise<{ path: string[] }>) {
  const { path: parts } = await params;
  const lang: Lang = parts[0] === 'en' ? 'en' : 'zh';
  const path = (lang === 'en' ? parts.slice(1) : parts).join('/');
  if (!validPaths.includes(path)) notFound();
  return { lang, path };
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string[] }>;
}): Promise<Metadata> {
  const { lang, path } = await resolve(params);
  const show = shows.find((s) => `podcasts/${s.slug}` === path);
  const nav = navigation.find((n) => n.path === path);
  return {
    alternates: { canonical: `${lang === 'en' ? '/en' : ''}${path ? `/${path}` : lang === 'en' ? '' : '/'}` },
    title: `${show?.name || nav?.label[lang] || (path === 'podcasts' ? (lang === 'zh' ? '播客' : 'Podcasts') : 'Frontier World')} · Frontier World`,
    description:
      show?.description[lang] || 'Frontier World — Podcasts, Signals, Open.',
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  return <Site {...await resolve(params)} />;
}
