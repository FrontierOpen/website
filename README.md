# Frontier World | 前沿之境

Frontier World 的公开官网。当前版本围绕三个动作展开：观察变化、共同实践、开放成果。

## 当前官网任务

> 让每周需要交付 AI / 科技内容的独立创作者与 2–10 人小团队，
> 在看过公开成果和真实验证状态后，申请 Frontier Commons 创始班，
> 带着一个真实选题完成一份可信、可发布的成果，并留下一套供下一次复用的工作流。

- 唯一主转化：申请 Frontier Commons 创始席位。
- 次级信任入口：阅读 [Frontier Signals](https://signals.frontierworld.ai/)。
- 当前边界：日期、城市和真实表单后端尚未确认；申请通过本机邮件客户端完成。
- 证据原则：没有真实客户数据以前，不展示虚构评价、案例或提效比例。

## 本地开发

需要 Node.js 22.13 或更高版本。

```bash
npm ci
npm run dev
```

访问 `http://localhost:5173`。

## 主题

- 首次访问默认跟随系统浅色 / 深色偏好。
- 页眉主题按钮可手动切换，选择保存在本机 `frontier-theme:v1`。
- 浅色主题覆盖 Hero、Header、正文、证据、申请区与页脚，整站统一使用纯白背景。
- Header 在顶部保持展开，滚动超过 80px 后收拢成居中胶囊。

## 动效

- 使用 `motion` 驱动 Hero 视差、区块进入视口、列表 stagger 与移动菜单开合。
- 遵循系统 `prefers-reduced-motion`；减少动态效果时禁用位移和视差。
- 本地 HTTP 预览不下发 `upgrade-insecure-requests`，避免 Safari 将 CSS / JS 错误升级到 HTTPS。

## 验证

```bash
npm run check
```

## Cloudflare 部署

```bash
npm run deploy
```

生产域名：`frontierworld.ai`。

## 品牌资产

- `public/frontier-mark.jpg`：用户确认的新主标原图
- `public/frontier-mark-white.png`：由原图明暗确定透明度的深色背景反白标
- `public/frontier-mark-favicon.png`：居中裁切的浏览器图标

两个适配版本均继承原图轮廓与柔化边缘，不经过生成式重绘。
