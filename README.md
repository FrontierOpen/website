# Frontier World | 前沿之境

Frontier World 正式官网：中文与英文，包含观察、产品、合作、开放、关于、基金会及三档播客入口。

首页采用 Claire 确认的两句：

> 欢迎你带着自己的想法，一起探索前沿世界。
>
> 让更多人的声音，进入关于未来的讨论。

栏目中标明待补充的内容仍为空位，不代表已经推出业务、单集或基金会项目。

## 开发与检查

需要 Node.js 22.13 或更高版本。

```sh
npm ci
npm run dev
npm run check
```

本地地址为 http://localhost:5173。页面与导航在 app/site.tsx、app/site-header.tsx，节目及导航内容在 lib/content.ts，样式在 app/globals.css。

## 发布

沿用现有 Cloudflare Worker frontier-world 与域名绑定。仓库已连接 Workers Builds；推送后检查 Cloudflare 构建结果，再核验正式域名实际内容。

```sh
npm run deploy
```

worker/index.ts 保留 HTTPS 与 www 转根域的308跳转和安全响应头。/privacy 保留，旧首页申请入口转到合作联系页。生产元数据允许索引；网站地图包含实际中英文路由。

## 资产

public/images/ 为已使用的自有节目图片；public/fonts/ 为 Inter 字体及其许可证。旧站资源保留，历史实现可由 Git 提交恢复。不要提交凭据、构建产物或浏览器会话。
