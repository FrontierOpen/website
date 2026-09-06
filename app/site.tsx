import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  Globe,
  Mail,
} from 'lucide-react';
import SiteHeader from './site-header';
import LegacyAnchors from './legacy-anchors';
import {
  companyIdentity,
  footerSections,
  shows,
  articles,
  route,
  type Lang,
} from '@/lib/content';
const pick = (lang: Lang, zh: string, en: string) => (lang === 'zh' ? zh : en);
function TextLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      className="text-link"
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {external ? <ArrowUpRight size={17} /> : <ArrowRight size={17} />}
    </a>
  );
}
function SectionTitle({
  title,
  href,
  lang,
  label,
}: {
  title: string;
  href?: string;
  lang: Lang;
  label?: string;
}) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {href && (
        <TextLink href={href}>
          {label || pick(lang, '查看全部', 'View all')}
        </TextLink>
      )}
    </div>
  );
}
function PageNav({
  lang,
  items,
}: {
  lang: Lang;
  items: { id: string; zh: string; en: string }[];
}) {
  return (
    <nav
      className="page-nav container"
      aria-label={pick(lang, '本页导航', 'On this page')}
    >
      {items.map((i) => (
        <a key={i.id} href={`#${i.id}`}>
          {pick(lang, i.zh, i.en)}
        </a>
      ))}
    </nav>
  );
}
function ReservedSection({
  lang,
  id,
  title,
  compact = false,
}: {
  lang: Lang;
  id: string;
  title: string;
  compact?: boolean;
}) {
  return (
    <section
      id={id}
      className={`container section reserved-section ${compact ? 'reserved-compact' : ''}`}
    >
      <SectionTitle title={title} lang={lang} />
      <div className="reserved-space">
        <span>{pick(lang, '内容待补充', 'Content to come')}</span>
      </div>
    </section>
  );
}
function ArticleGrid({ lang }: { lang: Lang }) {
  return (
    <div className="article-grid">
      {articles.map((a) => (
        <a
          key={a.url}
          className="article-card"
          href={a.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="article-image">
            <img
              src={a.image}
              alt=""
              width="1200"
              height="630"
              loading="lazy"
            />
          </div>
          <h3>{a.title[lang]}</h3>
          <div className="metadata">
            <span>Signals</span>
            <time>{a.date}</time>
            <ArrowUpRight size={15} />
          </div>
        </a>
      ))}
    </div>
  );
}
function Home({ lang }: { lang: Lang }) {
  return (
    <>
      <LegacyAnchors />
      <section id="top" className="intro company-intro">
        <h1>
          {lang === 'zh'
            ? companyIdentity.philosophy.zh
                .split(/(?<=带着|，|探索)/)
                .map((phrase) => (
                  <span className="hero-phrase" key={phrase}>
                    {phrase}
                  </span>
                ))
            : companyIdentity.philosophy.en}
        </h1>
        <p className="hero-values">
          {lang === 'zh'
            ? companyIdentity.values.zh.split(/(?<=，)/).map((phrase) => (
                <span className="hero-phrase" key={phrase}>
                  {phrase}
                </span>
              ))
            : companyIdentity.values.en}
        </p>
        <a className="hero-scroll" href="#featured">
          {pick(lang, '向下浏览', 'Explore')}
          <ArrowDown aria-hidden="true" size={14} />
        </a>
      </section>
      <section id="featured" className="container section feature-section">
        <SectionTitle
          title={pick(lang, '当前重点', 'In focus')}
          href={route(lang, 'podcasts')}
          label={pick(lang, '全部节目', 'All shows')}
          lang={lang}
        />
        <div className="feature-grid">
          <a
            href={route(lang, 'podcasts/claire-and-friends')}
            className="main-feature"
          >
            <div className="main-feature-image">
              <img
                className="feature-mark"
                src="/images/mark-white.png"
                alt="Claire & Friends · Frontier World"
                width="1024"
                height="1024"
                fetchPriority="high"
              />
            </div>
            <div className="feature-caption">
              <h2>{shows[0].intro[lang]}</h2>
              <div className="metadata">
                <span>Claire & Friends</span>
                <span>{shows[0].kind[lang]}</span>
              </div>
            </div>
          </a>
          <div className="side-features">
            {shows.slice(1).map((s) => (
              <a
                href={route(lang, `podcasts/${s.slug}`)}
                className={`side-feature ${s.slug}`}
                key={s.slug}
              >
                <div className="side-image">
                  <img
                    src={s.image}
                    alt={`${s.name} cover`}
                    width="1600"
                    height="1600"
                  />
                </div>
                <div className="side-caption">
                  <h3>{s.intro[lang]}</h3>
                  <span className="metadata">
                    <span>{s.name}</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="container section product-overview">
        <SectionTitle
          title={pick(lang, '产品', 'Products')}
          lang={lang}
          href={route(lang, 'products')}
        />
        <div className="channel-grid">
          {[
            {
              path: 'podcasts',
              title: pick(lang, '播客', 'Podcasts'),
              desc: pick(lang, '三档节目', 'Three shows'),
            },
            {
              path: 'signals',
              title: pick(lang, '文章', 'Articles'),
              desc: 'Frontier Signals',
            },
            {
              path: 'open',
              title: pick(lang, '工具', 'Tools'),
              desc: 'Frontier Open',
            },
          ].map((item) => (
            <a
              className="channel-link"
              key={item.path}
              href={route(lang, item.path)}
            >
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          ))}
        </div>
      </section>
      <section className="container section">
        <SectionTitle
          title={pick(lang, '最近的观察', 'Recent signals')}
          lang={lang}
          href={route(lang, 'signals')}
        />
        <ArticleGrid lang={lang} />
      </section>
      <section className="container section open-section">
        <div>
          <h2>Frontier Open</h2>
          <p>
            {pick(
              lang,
              '代码、工具和工作方法。',
              'Code, tools, and ways of working.',
            )}
          </p>
          <TextLink href={route(lang, 'open')}>
            {pick(lang, '查看开放项目', 'Explore open projects')}
          </TextLink>
        </div>
        <div className="open-project-links">
          <a
            href="https://github.com/FrontierOpen"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>GitHub</span>
            <ArrowUpRight size={22} />
          </a>
          <a href={route(lang, 'open#docs')}>
            <span>{pick(lang, '使用文档', 'Documentation')}</span>
            <ArrowUpRight size={22} />
          </a>
        </div>
      </section>
      <section className="container section">
        <SectionTitle
          title={pick(lang, '合作', 'Work')}
          href={route(lang, 'work')}
          label={pick(lang, '查看合作', 'Explore collaborations')}
          lang={lang}
        />
        <div className="reserved-space">
          <span>{pick(lang, '合作项目待补充', 'Projects to come')}</span>
        </div>
      </section>
      <section className="container section foundation-entry">
        <h2>{pick(lang, '基金会', 'Foundation')}</h2>
        <TextLink href={route(lang, 'foundation')}>
          {pick(lang, '查看', 'Explore')}
        </TextLink>
      </section>
    </>
  );
}
function Products({ lang }: { lang: Lang }) {
  return (
    <>
      <PageIntro
        label="PRODUCTS"
        title={pick(lang, '产品', 'Products')}
        subtitle={pick(
          lang,
          '内容、工具，以及可以一起参与的事。',
          'Content, tools, and things to take part in.',
        )}
      />
      <PageNav
        lang={lang}
        items={[
          { id: 'podcasts', zh: '播客', en: 'Podcasts' },
          { id: 'reading', zh: '阅读', en: 'Reading' },
          { id: 'tools', zh: '工具', en: 'Tools' },
          { id: 'courses', zh: '课程', en: 'Courses' },
          { id: 'events', zh: '活动', en: 'Events' },
        ]}
      />
      <section id="podcasts" className="container section">
        <SectionTitle
          title={pick(lang, '播客', 'Podcasts')}
          lang={lang}
          href={route(lang, 'podcasts')}
        />
        <div className="show-grid">
          {shows.map((show) => (
            <a
              key={show.slug}
              className="show-card"
              href={route(lang, `podcasts/${show.slug}`)}
            >
              <div className="show-image">
                <img
                  src={show.image}
                  alt={show.name}
                  width="1600"
                  height="1600"
                />
              </div>
              <h2>{show.name}</h2>
              <p>{show.kind[lang]}</p>
            </a>
          ))}
        </div>
      </section>
      <section id="reading" className="container section">
        <SectionTitle
          title={pick(lang, '阅读', 'Reading')}
          lang={lang}
          href={route(lang, 'signals')}
        />
        <ArticleGrid lang={lang} />
      </section>
      <section id="tools" className="container section channel-feature">
        <h2>Frontier Open</h2>
        <p>
          {pick(
            lang,
            '代码、工具和工作方法。',
            'Code, tools, and ways of working.',
          )}
        </p>
        <TextLink href={route(lang, 'open')}>
          {pick(lang, '查看', 'Explore')}
        </TextLink>
      </section>
      <ReservedSection
        id="courses"
        lang={lang}
        title={pick(lang, '课程', 'Courses')}
      />
      <ReservedSection
        id="events"
        lang={lang}
        title={pick(lang, '活动', 'Events')}
      />
    </>
  );
}
function Podcasts({ lang }: { lang: Lang }) {
  return (
    <>
      <PageIntro
        label="FRONTIER WORLD / PODCASTS"
        title={pick(lang, '播客', 'Podcasts')}
        subtitle={pick(
          lang,
          '访谈身边的人，访谈创业者，也留一些时间自言自语。',
          'People around us. Founders at work. And time to think out loud.',
        )}
      />
      <PageNav
        lang={lang}
        items={[
          { id: 'featured-episode', zh: '推荐单集', en: 'Featured episode' },
          { id: 'shows', zh: '全部节目', en: 'All shows' },
          { id: 'episodes', zh: '全部单集', en: 'Episodes' },
          { id: 'platforms', zh: '收听平台', en: 'Listen' },
        ]}
      />
      <ReservedSection
        id="featured-episode"
        lang={lang}
        title={pick(lang, '推荐单集', 'Featured episode')}
      />
      <section id="shows" className="container section">
        <div className="show-grid">
          {shows.map((s) => (
            <a
              key={s.slug}
              className="show-card"
              href={route(lang, `podcasts/${s.slug}`)}
            >
              <div className="show-image">
                <img
                  src={s.image}
                  alt={`${s.name} cover`}
                  width="1600"
                  height="1600"
                />
              </div>
              <div className="metadata">
                {s.kind[lang]}
                <ArrowUpRight size={17} />
              </div>
              <h2>{s.name}</h2>
              <p>{s.description[lang]}</p>
            </a>
          ))}
        </div>
      </section>
      <ReservedSection
        id="episodes"
        lang={lang}
        title={pick(lang, '全部单集', 'Episodes')}
        compact
      />
      <section id="platforms" className="container section">
        <SectionTitle
          title={pick(lang, '节目平台', 'Show platforms')}
          lang={lang}
        />
        <div className="platform-directory">
          {shows.map((show) => (
            <div className="platform-row" key={show.slug}>
              <h3>{show.name}</h3>
              <div>
                {show.platformLinks.length ? (
                  show.platformLinks.map((link) => (
                    <TextLink key={link.url} href={link.url} external>
                      {link.label[lang]}
                    </TextLink>
                  ))
                ) : (
                  <p className="platform-pending">
                    {pick(
                      lang,
                      '平台链接待确认',
                      'Platform link to be confirmed',
                    )}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
function PageIntro({
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="page-intro container">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </section>
  );
}
function ShowDetail({ lang, slug }: { lang: Lang; slug: string }) {
  const show = shows.find((s) => s.slug === slug)!;
  return (
    <section className="container show-detail">
      <a className="back-link" href={route(lang, 'podcasts')}>
        <ArrowLeft size={16} />
        {pick(lang, '全部节目', 'All shows')}
      </a>
      <div className="show-detail-grid">
        <img
          className="detail-cover"
          src={show.image}
          alt={`${show.name} cover`}
          width="1600"
          height="1600"
        />
        <div className="show-detail-copy">
          <span className="metadata">{show.kind[lang]}</span>
          <h1>{show.name}</h1>
          <p>{show.description[lang]}</p>
          <div className="host">
            <span>{pick(lang, '主持人', 'Host')}</span>
            <strong>Claire</strong>
          </div>
          <div className="show-platform-links">
            {show.platformLinks.length ? (
              show.platformLinks.map((link) => (
                <TextLink key={link.url} href={link.url} external>
                  {link.label[lang]}
                </TextLink>
              ))
            ) : (
              <TextLink href={show.source} external>
                {pick(lang, '查看现有节目页', 'Visit the current show page')}
              </TextLink>
            )}
          </div>
        </div>
      </div>
      <div className="episode-empty" id="episodes">
        <h2>{pick(lang, '单集', 'Episodes')}</h2>
        <p>
          {show.verifiedEpisodeCount === 0
            ? pick(
                lang,
                '小宇宙节目页目前没有公开单集。',
                'No public episodes are currently listed on Xiaoyuzhou.',
              )
            : pick(lang, '单集待补充。', 'Episodes to come.')}
        </p>
      </div>
      <div className="show-reading-space">
        <h2>{pick(lang, '章节与文字稿', 'Chapters and transcripts')}</h2>
        <div className="reserved-space">
          <span>{pick(lang, '内容待补充', 'Content to come')}</span>
        </div>
      </div>
      <SectionTitle title={pick(lang, '其他节目', 'Other shows')} lang={lang} />
      <div className="related-shows">
        {shows
          .filter((s) => s.slug !== slug)
          .map((s) => (
            <a key={s.slug} href={route(lang, `podcasts/${s.slug}`)}>
              <img src={s.image} alt="" width="120" height="120" />
              <span>
                {s.name}
                <small>{s.kind[lang]}</small>
              </span>
              <ArrowUpRight size={20} />
            </a>
          ))}
      </div>
    </section>
  );
}
function Signals({ lang }: { lang: Lang }) {
  return (
    <>
      <PageIntro
        label="FRONTIER SIGNALS"
        title={pick(lang, '观察', 'Signals')}
        subtitle={pick(
          lang,
          '关于 AI、产品和正在发生的变化。',
          'Notes on AI, products, and what’s changing.',
        )}
      />
      <PageNav
        lang={lang}
        items={[
          { id: 'latest', zh: '最新文章', en: 'Latest' },
          { id: 'topics', zh: '专题', en: 'Topics' },
          { id: 'method', zh: '编辑方法', en: 'Editorial approach' },
        ]}
      />
      <section id="latest" className="container section">
        <ArticleGrid lang={lang} />
        <div className="page-end-link">
          <TextLink href="https://signals.frontierworld.ai/" external>
            {pick(lang, '查看全部文章', 'Read all articles')}
          </TextLink>
        </div>
      </section>
      <ReservedSection
        id="topics"
        lang={lang}
        title={pick(lang, '专题', 'Topics')}
      />
      <ReservedSection
        id="method"
        lang={lang}
        title={pick(lang, '编辑方法', 'Editorial approach')}
        compact
      />
    </>
  );
}
function Open({ lang }: { lang: Lang }) {
  return (
    <>
      <PageIntro
        label="FRONTIER OPEN"
        title={pick(lang, '开放', 'Open')}
        subtitle={pick(
          lang,
          '代码、工具和工作方法。',
          'Code, tools, and ways of working.',
        )}
      />
      <PageNav
        lang={lang}
        items={[
          { id: 'projects', zh: '项目', en: 'Projects' },
          { id: 'docs', zh: '文档', en: 'Docs' },
          { id: 'updates', zh: '更新', en: 'Updates' },
          { id: 'github', zh: 'GitHub', en: 'GitHub' },
        ]}
      />
      <ReservedSection
        id="projects"
        lang={lang}
        title={pick(lang, '开放项目', 'Open projects')}
      />
      <ReservedSection
        id="docs"
        lang={lang}
        title={pick(lang, '使用文档', 'Documentation')}
        compact
      />
      <ReservedSection
        id="updates"
        lang={lang}
        title={pick(lang, '更新', 'Updates')}
        compact
      />
      <section id="github" className="container section open-page">
        <div className="open-statement">
          <h2>
            {pick(
              lang,
              '我们做过的东西，\n你也可以接着用。',
              'What we make,\nyou can build on.',
            )}
          </h2>
          <p>
            {pick(
              lang,
              '项目说明以 GitHub 为准。',
              'See GitHub for project information.',
            )}
          </p>
          <a
            className="pill"
            href="https://github.com/FrontierOpen"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
    </>
  );
}
function Work({ lang }: { lang: Lang }) {
  return (
    <>
      <PageIntro
        label="WORK WITH FRONTIER WORLD"
        title={pick(lang, '合作', 'Work with us')}
        subtitle={pick(
          lang,
          '先聊聊你想做的事。',
          'Tell us what you have in mind.',
        )}
      />
      <PageNav
        lang={lang}
        items={[
          { id: 'collaborations', zh: '合作方向', en: 'Collaborations' },
          { id: 'cases', zh: '项目与案例', en: 'Projects' },
          { id: 'contact', zh: '联系', en: 'Contact' },
        ]}
      />
      <ReservedSection
        id="collaborations"
        lang={lang}
        title={pick(lang, '合作方向', 'Collaborations')}
      />
      <ReservedSection
        id="cases"
        lang={lang}
        title={pick(lang, '项目与案例', 'Projects and case studies')}
      />
      <section id="contact" className="container section reading-layout">
        <div>
          <h2>{pick(lang, '联系', 'Get in touch')}</h2>
          <a className="contact-email" href="mailto:contact@frontierworld.ai">
            contact@frontierworld.ai <ArrowUpRight size={23} />
          </a>
        </div>
        <div className="body-copy">
          <p>
            {pick(
              lang,
              '可以聊内容合作、推荐嘉宾，或一个想一起做的项目。',
              'Get in touch about content, a guest recommendation, or a project you’d like to make together.',
            )}
          </p>
          <p>
            {pick(
              lang,
              '来信说说你是谁、想做什么，以及大概的时间。',
              'Tell us who you are, what you’d like to do, and your rough timeline.',
            )}
          </p>
          <p className="muted">
            {pick(
              lang,
              '具体做什么，聊过再定。',
              'We’ll work out the details together.',
            )}
          </p>
        </div>
      </section>
    </>
  );
}
function About({ lang }: { lang: Lang }) {
  return (
    <>
      <PageIntro
        label="ABOUT"
        title="Frontier World"
        subtitle={pick(lang, '前沿之境', 'A closer look at a changing world.')}
      />
      <PageNav
        lang={lang}
        items={[
          { id: 'brand', zh: 'Frontier World', en: 'Frontier World' },
          { id: 'claire', zh: 'Claire', en: 'Claire' },
          { id: 'team', zh: '团队', en: 'Team' },
          { id: 'principles', zh: '原则', en: 'Principles' },
        ]}
      />
      <section className="container section reading-layout">
        <div>
          <h2 id="brand">
            {pick(lang, '现在在做的事', 'What we’re working on')}
          </h2>
        </div>
        <div className="body-copy">
          <p>
            {pick(
              lang,
              '我们关注科技、AI、产品、创业，以及身处其中的人。',
              'We follow technology, AI, products, entrepreneurship, and the people behind them.',
            )}
          </p>
          <p>
            {pick(
              lang,
              '现在，从播客和文章开始。Claire 主持三档节目，Frontier Signals 记录观察，Frontier Open 分享代码和工具。',
              'For now, we’re starting with podcasts and articles. Claire hosts three shows, Frontier Signals publishes observations, and Frontier Open shares code and tools.',
            )}
          </p>
          <TextLink href={route(lang, 'podcasts')}>
            {pick(lang, '看节目', 'Explore the shows')}
          </TextLink>
        </div>
        <div>
          <h2 id="claire">Claire</h2>
        </div>
        <div className="body-copy">
          <p>
            {pick(
              lang,
              '播客主持人。喜欢跟人聊天，也喜欢顺着一个问题一直想下去。',
              'Podcast host. Curious about people, and happy to follow a question wherever it leads.',
            )}
          </p>
          <TextLink href="https://clairesparlor.com/" external>
            {pick(lang, 'Claire 的个人网站', 'Claire’s personal website')}
          </TextLink>
        </div>
        <div>
          <h2>{pick(lang, '联系', 'Contact')}</h2>
        </div>
        <div className="body-copy">
          <TextLink href="mailto:contact@frontierworld.ai" external>
            contact@frontierworld.ai
          </TextLink>
        </div>
      </section>
      <ReservedSection
        id="team"
        lang={lang}
        title={pick(lang, '团队', 'Team')}
      />
      <ReservedSection
        id="principles"
        lang={lang}
        title={pick(lang, '原则', 'Principles')}
        compact
      />
    </>
  );
}
function Foundation({ lang }: { lang: Lang }) {
  return (
    <>
      <section className="foundation-hero container">
        <p className="metadata">Frontier World</p>
        <h1>{pick(lang, '基金会', 'Foundation')}</h1>
        <p className="prototype-note">
          {pick(
            lang,
            '页面规划中 · 具体内容待补充',
            'Page in planning · Details to come',
          )}
        </p>
        <a className="hero-scroll" href="#mission">
          {pick(lang, '向下浏览', 'Explore')}
          <ArrowDown size={14} aria-hidden="true" />
        </a>
      </section>
      <PageNav
        lang={lang}
        items={[
          { id: 'mission', zh: '使命', en: 'Mission' },
          { id: 'priorities', zh: '关注方向', en: 'Priorities' },
          { id: 'programs', zh: '项目', en: 'Programs' },
          { id: 'participation', zh: '参与方式', en: 'Get involved' },
          { id: 'organization', zh: '组织信息', en: 'Organization' },
          { id: 'updates', zh: '动态', en: 'Updates' },
        ]}
      />
      <ReservedSection
        id="mission"
        title={pick(lang, '使命', 'Mission')}
        lang={lang}
      />
      <ReservedSection
        id="priorities"
        title={pick(lang, '关注方向', 'Priorities')}
        lang={lang}
      />
      <ReservedSection
        id="programs"
        title={pick(lang, '项目', 'Programs')}
        lang={lang}
      />
      <ReservedSection
        id="participation"
        title={pick(lang, '参与方式', 'Get involved')}
        lang={lang}
        compact
      />
      <ReservedSection
        id="organization"
        title={pick(lang, '组织信息', 'Organization')}
        lang={lang}
        compact
      />
      <ReservedSection
        id="updates"
        title={pick(lang, '动态', 'Updates')}
        lang={lang}
        compact
      />
      <p className="container prototype-note foundation-status">
        {pick(
          lang,
          '本页仅预留内容结构；名称、设立安排与项目信息尚待确认。',
          'This page reserves the content structure. The name, establishment arrangements, and program details are not yet confirmed.',
        )}
      </p>
    </>
  );
}
export function Footer({ lang, path }: { lang: Lang; path: string }) {
  return (
    <footer className="site-footer container">
      <div className="footer-top">
        {footerSections.map((section) => (
          <div className="footer-column" key={section.path}>
            <h3>
              <a href={route(lang, section.path)}>
                {section.label[lang]}
              </a>
            </h3>
            {section.links.map((link) => (
              <a key={link.path} href={route(lang, link.path)}>
                {link.label[lang]}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <div className="social-links">
          <a
            href="https://github.com/FrontierOpen"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>GitHub</span>
          </a>
          <a
            href="mailto:contact@frontierworld.ai"
            aria-label={pick(lang, '邮件', 'Email')}
          >
            <Mail size={16} />
          </a>
        </div>
        <span>Frontier World © 2026</span>
        <a href="/privacy">{pick(lang, '隐私说明', 'Privacy')}</a>
        <a
          className="language-pill"
          href={route(lang === 'zh' ? 'en' : 'zh', path)}
        >
          <Globe size={14} />
          {lang === 'zh' ? 'English (US)' : '简体中文'}
        </a>
      </div>
    </footer>
  );
}
export default function Site({
  lang = 'zh',
  path = '',
}: {
  lang?: Lang;
  path?: string;
}) {
  let content;
  if (!path) content = <Home lang={lang} />;
  else if (path === 'products') content = <Products lang={lang} />;
  else if (path === 'foundation') content = <Foundation lang={lang} />;
  else if (path === 'podcasts') content = <Podcasts lang={lang} />;
  else if (path.startsWith('podcasts/'))
    content = <ShowDetail lang={lang} slug={path.split('/')[1]} />;
  else if (path === 'signals') content = <Signals lang={lang} />;
  else if (path === 'open') content = <Open lang={lang} />;
  else if (path === 'work') content = <Work lang={lang} />;
  else content = <About lang={lang} />;
  return (
    <div lang={lang === 'zh' ? 'zh-CN' : 'en-US'}>
      <a href="#main" className="skip-link">
        {pick(lang, '跳到正文', 'Skip to main content')}
      </a>
      <SiteHeader lang={lang} path={path} />
      <main id="main" tabIndex={-1} key={`${lang}-${path}`}>
        {content}
      </main>
      <Footer lang={lang} path={path} />
    </div>
  );
}
