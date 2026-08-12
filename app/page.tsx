const actions = [
  {
    number: "01",
    name: "Media",
    title: "看见变化",
    state: "正在筹备",
    copy: "观察、记录与解释 AI 时代正在发生什么。少一点热点转述，多一点能帮助判断和行动的理解。",
  },
  {
    number: "02",
    name: "Commons",
    title: "共同实践",
    state: "仍在验证",
    copy: "让可信的人围绕真实问题相遇、交流与协作。关系不是资产，共同完成的事情才是证据。",
  },
  {
    number: "03",
    name: "Open",
    title: "开放成果",
    state: "MVP-0",
    copy: "把被验证的方法整理为报告、代码与工作流，让一次有效尝试成为别人也能使用的起点。",
  },
];

export default function Home() {
  return (
    <>
      <header className="site-header" id="top">
        <a className="brand" href="#top" aria-label="Frontier World 首页">
          <img src="/passage-mark-blue.svg" alt="" />
          <span>Frontier World</span>
        </a>
        <nav aria-label="主导航">
          <a href="#why">为什么</a>
          <a href="#actions">我们在做什么</a>
          <a href="#method">如何工作</a>
        </nav>
        <a className="nav-cta" href="#actions">进入前沿 <span aria-hidden="true">↘</span></a>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Frontier World / 前沿之境</p>
            <h1 id="hero-title">把前沿，<br />变成实践。</h1>
            <p className="hero-lede">
              我们观察 AI 时代正在发生的变化，让可信的人围绕真实问题共同实践，
              并把被验证的方法开放出来。
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#actions">了解三个动作 <span>↘</span></a>
              <a className="text-link" href="#why">为什么是现在 <span>↓</span></a>
            </div>
          </div>

          <div className="hero-visual" aria-label="Frontier World 品牌图形 The Passage">
            <div className="visual-meta">
              <span>THE PASSAGE / 通往</span>
              <span>VISUAL 6.1 · 2026</span>
            </div>
            <img src="/passage-mark-white.svg" alt="" />
            <p className="visual-message">前方不是答案。<br />是入口。</p>
            <div className="visual-foot">
              <span>OBSERVE</span>
              <span>PRACTICE</span>
              <span>OPEN</span>
            </div>
          </div>
        </section>

        <section className="tension" id="why" aria-labelledby="why-title">
          <div className="section-index">01 / WHY NOW</div>
          <div className="tension-main">
            <h2 id="why-title">工具越来越快。<br />真正稀缺的，是把变化变成行动。</h2>
            <p>
              AI 正在同时扩大信息、工具与可能性，但理解、信任和可复用成果，
              并不会自动随之出现。Frontier World 关注的，正是中间这段距离。
            </p>
          </div>
          <div className="tension-points">
            <article><strong>看见很多</strong><span>不等于理解发生了什么</span></article>
            <article><strong>认识很多人</strong><span>不等于能够共同完成一件事</span></article>
            <article><strong>产出很多</strong><span>不等于留下可维护的方法</span></article>
          </div>
        </section>

        <section className="actions" id="actions" aria-labelledby="actions-title">
          <div className="section-head">
            <div className="section-index">02 / WHAT WE DO</div>
            <h2 id="actions-title">三个动作，<br />构成同一条路。</h2>
            <p>它们是正在构建的方向，不是三家已经成熟的公司。</p>
          </div>
          <div className="action-grid">
            {actions.map((action) => (
              <article className="action-card" key={action.name}>
                <div className="card-top">
                  <span className="card-number">{action.number}</span>
                  <span className="card-state">{action.state}</span>
                </div>
                <p className="card-name">Frontier {action.name}</p>
                <h3>{action.title}</h3>
                <p className="card-copy">{action.copy}</p>
                <span className="card-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="method" id="method" aria-labelledby="method-title">
          <div className="method-top">
            <div className="section-index section-index-light">03 / HOW WE WORK</div>
            <p>OUR METHOD</p>
          </div>
          <h2 id="method-title">不是预测未来。<br />是把下一步做出来。</h2>
          <div className="method-flow" aria-label="从信号到开放成果的工作方法">
            <div><span>01</span><strong>Signal</strong><small>捕捉真实变化</small></div>
            <div><span>02</span><strong>Conversation</strong><small>校正不同视角</small></div>
            <div><span>03</span><strong>Practice</strong><small>进入具体行动</small></div>
            <div><span>04</span><strong>Open</strong><small>沉淀可复用成果</small></div>
          </div>
        </section>

        <section className="belief" aria-labelledby="belief-title">
          <p className="eyebrow">WHAT WE BELIEVE</p>
          <blockquote id="belief-title">
            前沿不是一个遥远的地方，<br />也不是一句“未来已来”。<br />前沿只有进入真实实践，<br />才开始产生公共价值。
          </blockquote>
          <p className="belief-note">Turn the frontier into practice.</p>
        </section>

        <section className="contact" aria-labelledby="contact-title">
          <div>
            <p className="section-index">04 / TOGETHER</p>
            <h2 id="contact-title">带着一个真实问题来。</h2>
          </div>
          <div className="contact-copy">
            <p>如果你也在 AI 变化中做事，我们愿意从一个具体问题、一次共同实践开始。</p>
            <p className="contact-status">公开联系入口将在邮箱确认后接入。</p>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand brand-footer" href="#top">
          <img src="/passage-mark-white.svg" alt="" />
          <span>Frontier World</span>
        </a>
        <div className="footer-cn">前沿之境</div>
        <div className="footer-meta">
          <span>Website 1.0 · 2026</span>
          <span>frontierworld.ai</span>
        </div>
      </footer>
    </>
  );
}
