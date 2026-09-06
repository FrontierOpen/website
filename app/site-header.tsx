'use client';
import { useEffect, useState, type ComponentProps } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  PanelRight,
  X,
} from 'lucide-react';
import { NavigationMenu as Menu } from '@base-ui/react/navigation-menu';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet';
import { navigation, shows, route, type Lang } from '@/lib/content';

// Base UI supplies the accessible link content through its render prop.
function NavAnchor(props: ComponentProps<'a'>) {
  return <a {...props}>{props.children}</a>;
}

export default function SiteHeader(props: { lang: Lang; path: string }) {
  return <HeaderContent key={`${props.lang}/${props.path}`} {...props} />;
}

function HeaderContent({
  lang,
  path,
}: {
  lang: Lang;
  path: string;
}) {
  const [desktop, setDesktop] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [insideShows, setInsideShows] = useState(false);
  const zh = lang === 'zh';
  useEffect(() => {
    document.documentElement.lang = zh ? 'zh-CN' : 'en-US';
  }, [zh]);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1020px)');
    const change = () => {
      setDesktop(null);
      setMobile(false);
      setInsideShows(false);
    };
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  return (
    <header className="site-header">
      <div className="header-inner">
        <a
          className="wordmark"
          href={route(lang)}
          aria-label="Frontier World"
        >
          Frontier World
        </a>
        <Menu.Root
          className="desktop-nav"
          value={desktop}
          onValueChange={setDesktop}
          delay={100}
          closeDelay={200}
          aria-label={zh ? '主导航' : 'Main navigation'}
        >
          <Menu.List className="nav-list">
            <Menu.Item>
              <Menu.Link
                className="nav-link"
                render={<NavAnchor href={route(lang, 'signals')} />}
                active={path === 'signals'}
              >
                {zh ? '观察' : 'Signals'}
              </Menu.Link>
            </Menu.Item>
            <Menu.Item value="products">
              <Menu.Trigger
                className="nav-trigger"
                aria-current={
                  path.startsWith('podcasts') || path === 'products'
                    ? 'page'
                    : undefined
                }
              >
                {zh ? '产品' : 'Products'}
              </Menu.Trigger>
              <Menu.Content className="mega-content">
                <div className="mega-inner">
                  <section>
                    <h2>{zh ? '播客' : 'Podcasts'}</h2>
                    <ul className="mega-primary">
                      {shows.map((s) => (
                        <li key={s.slug}>
                          <Menu.Link
                            closeOnClick
                            render={
                              <NavAnchor href={route(lang, `podcasts/${s.slug}`)} />
                            }
                            active={path === `podcasts/${s.slug}`}
                          >
                            {s.name}
                          </Menu.Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h2>{zh ? '产品' : 'Products'}</h2>
                    <ul className="mega-secondary">
                      <li>
                        <Menu.Link
                          closeOnClick
                          render={<NavAnchor href={route(lang, 'products')} />}
                        >
                          {zh ? '产品概览' : 'Product overview'}
                        </Menu.Link>
                      </li>
                      <li>
                        <Menu.Link
                          closeOnClick
                          render={
                            <NavAnchor href={route(lang, 'products#courses')} />
                          }
                        >
                          {zh ? '课程' : 'Courses'}
                        </Menu.Link>
                      </li>
                      <li>
                        <Menu.Link
                          closeOnClick
                          render={
                            <NavAnchor href={route(lang, 'products#events')} />
                          }
                        >
                          {zh ? '活动' : 'Events'}
                        </Menu.Link>
                      </li>
                      <li>
                        <Menu.Link
                          closeOnClick
                          render={<NavAnchor href={route(lang, 'podcasts')} />}
                        >
                          {zh ? '全部节目' : 'All shows'}
                        </Menu.Link>
                      </li>
                      <li>
                        <Menu.Link
                          closeOnClick
                          render={<NavAnchor href={route(lang, 'about')} />}
                        >
                          {zh ? '关于 Claire' : 'About Claire'}
                        </Menu.Link>
                      </li>
                      <li>
                        <Menu.Link
                          closeOnClick
                          render={<NavAnchor href={route(lang, 'work')} />}
                        >
                          {zh ? '推荐嘉宾' : 'Suggest a guest'}
                        </Menu.Link>
                      </li>
                    </ul>
                  </section>
                </div>
              </Menu.Content>
            </Menu.Item>
            {navigation.slice(2).map((n) => (
              <Menu.Item key={n.path}>
                <Menu.Link
                  className="nav-link"
                  render={<NavAnchor href={route(lang, n.path)} />}
                  active={path === n.path}
                >
                  {n.label[lang]}
                </Menu.Link>
              </Menu.Item>
            ))}
          </Menu.List>
          <Menu.Portal>
            <div
              className="nav-scrim"
              data-open={desktop ? '' : undefined}
              aria-hidden="true"
              onPointerDown={() => setDesktop(null)}
            />
            <Menu.Positioner
              className="mega-positioner"
              side="bottom"
              sideOffset={0}
              align="start"
            >
              <Menu.Popup className="mega-popup">
                <Menu.Viewport />
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
        <div className="header-actions">
          <a
            className="language-header"
            href={route(zh ? 'en' : 'zh', path)}
            aria-label={zh ? 'Switch to English' : '切换到中文'}
          >
            {zh ? 'EN' : '中文'}
          </a>
          <a className="pill header-cta" href={route(lang, 'podcasts')}>
            {zh ? '看节目' : 'Explore shows'}
            <ArrowUpRight aria-hidden="true" />
          </a>
          <Sheet
            open={mobile}
            onOpenChange={(value) => {
              setMobile(value);
              if (value) setInsideShows(false);
            }}
          >
            <SheetTrigger
              className="icon-button mobile-trigger"
              aria-label={zh ? '打开菜单' : 'Open menu'}
            >
              <PanelRight aria-hidden="true" />
            </SheetTrigger>
            <SheetContent className="mobile-menu" showCloseButton={false}>
              <div className="mobile-menu-header">
                <SheetTitle className="wordmark">Frontier World</SheetTitle>
                <SheetClose
                  className="icon-button"
                  aria-label={zh ? '关闭菜单' : 'Close menu'}
                >
                  <X aria-hidden="true" />
                </SheetClose>
              </div>
              <SheetDescription className="sr-only">
                {zh ? '网站导航' : 'Site navigation'}
              </SheetDescription>
              <nav
                className="mobile-menu-links"
                aria-label={zh ? '移动导航' : 'Mobile navigation'}
              >
                {insideShows ? (
                  <>
                    <button
                      className="menu-back"
                      onClick={() => setInsideShows(false)}
                    >
                      <ArrowLeft />
                      {zh ? '返回' : 'Back'}
                    </button>
                    <a
                      className="mobile-category"
                      href={route(lang, 'products')}
                      onClick={() => setMobile(false)}
                    >
                      {zh ? '产品概览' : 'Product overview'}
                      <ArrowUpRight />
                    </a>
                    <a
                      className="mobile-category"
                      href={route(lang, 'podcasts')}
                      onClick={() => setMobile(false)}
                    >
                      {zh ? '全部节目' : 'All shows'}
                      <ArrowUpRight />
                    </a>
                    {shows.map((s) => (
                      <a
                        className="mobile-show-link"
                        key={s.slug}
                        href={route(lang, `podcasts/${s.slug}`)}
                        aria-current={
                          path === `podcasts/${s.slug}` ? 'page' : undefined
                        }
                        onClick={() => setMobile(false)}
                      >
                        {s.name}
                      </a>
                    ))}
                    <a
                      className="mobile-show-link"
                      href={route(lang, 'products#courses')}
                      onClick={() => setMobile(false)}
                    >
                      {zh ? '课程' : 'Courses'}
                    </a>
                    <a
                      className="mobile-show-link"
                      href={route(lang, 'products#events')}
                      onClick={() => setMobile(false)}
                    >
                      {zh ? '活动' : 'Events'}
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      className="mobile-category"
                      href={route(lang, 'signals')}
                      onClick={() => setMobile(false)}
                    >
                      {zh ? '观察' : 'Signals'}
                    </a>
                    <button
                      className="mobile-category"
                      onClick={() => setInsideShows(true)}
                      aria-expanded={false}
                    >
                      {zh ? '产品' : 'Products'}
                      <ArrowRight />
                    </button>
                    {navigation.slice(2).map((n) => (
                      <a
                        className="mobile-category"
                        key={n.path}
                        href={route(lang, n.path)}
                        aria-current={path === n.path ? 'page' : undefined}
                        onClick={() => setMobile(false)}
                      >
                        {n.label[lang]}
                      </a>
                    ))}
                    <div className="mobile-menu-bottom">
                      <a
                        className="mobile-category"
                        href={route(lang, 'podcasts')}
                        onClick={() => setMobile(false)}
                      >
                        {zh ? '看节目' : 'Explore shows'}
                        <ArrowUpRight />
                      </a>
                      <a
                        className="mobile-language"
                        href={route(zh ? 'en' : 'zh', path)}
                        onClick={() => setMobile(false)}
                      >
                        {zh ? 'English (US)' : '简体中文'}
                      </a>
                    </div>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
