# Tokgöz Lab

**[English](./README.md) | [简体中文](./README.zh-CN.md)**

萨班哲大学（Sabancı University）电子工程系 Tokgöz Lab 的官方网站。实验室致力于面向未来（6G）通信的高能效毫米波与亚太赫兹 CMOS 电路、集成系统及智能硬件研究。

在线网站：https://fatihardazengin.github.io/tokgozlab

网站基于 [Astro](https://astro.build) 与 Tailwind CSS 构建，静态生成，并使用 [Pagefind](https://pagefind.app) 提供站内搜索。每次推送到 `main` 分支时会通过 GitHub Actions 自动部署到 GitHub Pages（见 `.github/workflows/pages.yml`）。

---

## 本地开发

需要 Node.js v22.12.0 或更高版本。

```bash
npm install
npm run dev
```

访问 `http://localhost:4321`。

```bash
npm run build    # 导入 citations.bib、构建网站并生成搜索索引
npm run preview  # 本地预览生产构建
```

搜索索引在构建时生成，因此只有完整运行过 `npm run build` 后搜索功能才可用。

---

## 内容更新

| 内容 | 位置 |
|---|---|
| 论文列表 | 仓库根目录的 `citations.bib` —— 运行 `npm run import-bibtex` 重新生成 `src/content/publications/` |
| 研究方向 | `src/content/research/` 下的 Markdown 文件（`order` 字段控制排序） |
| 团队成员 | `src/content/team/` 下的 Markdown 文件（`weight` 字段控制排序） |
| 在研/已完成项目 | `src/pages/projects.astro` |
| 招生/合作页面 | `src/pages/join.astro` |
| 站点元信息、导航、社交链接 | `src/config.ts` |

### 从 BibTeX 导入论文

1. 从 Zotero、Mendeley、Google Scholar 等工具导出文献为仓库根目录下的 `citations.bib`。
2. 运行：
   ```bash
   npm run import-bibtex
   ```
3. `scripts/import-bibtex.js` 会将条目解析并写入 `src/content/publications/`。BibTeX 中的 `pdf`/`url`、`code`、`website`、`demo`、`video`、`slides`、`award`/`note` 等字段会自动映射为网站上对应的按钮与徽章。

### 添加团队成员

在 `src/content/team/` 下新建一个 Markdown 文件，例如：

```markdown
---
name: "Jane Doe"
role: "PhD Student"
title: ["Electronics Engineering"]
avatar: "../../assets/jane-doe.jpg"
bio: "一到两句话的研究方向简介。"
email: "jane.doe@sabanciuniv.edu"
weight: 10
---

正文中撰写更详细的个人简介。
```

`role` 的取值必须是 `src/content.config.ts` 中定义的枚举值之一。

---

## 部署

网站通过 `.github/workflows/pages.yml` 在每次推送到 `main` 分支时自动部署到 GitHub Pages。`astro.config.mjs` 中的 `site` 与 `base` 用于适配 GitHub Pages 的项目子路径——如果网站迁移到自定义域名或更换仓库名，需要同步更新这两项。

---

## 许可证

MIT
