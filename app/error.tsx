"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="container section utility-page">
      <h1>这一页暂时没有正常打开</h1>
      <p>可以重新尝试，或通过 contact@frontierworld.ai 联系我们。</p>
      <button type="button" className="pill" onClick={reset}>再试一次</button>
      <a className="text-link" href="/">返回首页</a>
    </main>
  );
}
