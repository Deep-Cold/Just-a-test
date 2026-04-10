# 理大音游人格测试设计

面向**香港理工大学（PolyU）**校园与**音游**语境的趣味人格问卷：在经典四维度二分结构（P/E、S/M、A/I、C/B）上，将题干与结果图鉴改写为「理大 × 音游」主题，静态导出后适合部署在 **GitHub Pages**。

---

## 致谢 · 上游开源项目

本仓库是 **[rauf-21 / mbti-personality-test-app](https://github.com/rauf-21/mbti-personality-test-app)** 的改编与延伸实现，**并非**原项目的官方分支；我们保留并感谢其开源基础：

| 说明 | 链接 |
|------|------|
| 原仓库（Next.js + Chakra UI + 问卷逻辑） | [github.com/rauf-21/mbti-personality-test-app](https://github.com/rauf-21/mbti-personality-test-app) |
| 原作者 | Abdul Rauf（[rauf21dev@gmail.com](mailto:rauf21dev@gmail.com)） |
| 原版线上演示 | [r-21-mbti-personality-test-app.netlify.app](https://r-21-mbti-personality-test-app.netlify.app) |
| 原版问卷所参考的 MBTI 资料来源 | [MBTI-personality-test.pdf](http://www.lrjj.cn/encrm1.0/public/upload/MBTI-personality-test.pdf) |
| Myers–Briggs 类型指标（背景阅读） | [Wikipedia · MBTI](https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator) |

若你希望反馈**框架级**问题，仍可到原项目 [Issues](https://github.com/rauf-21/mbti-personality-test-app/issues) 讨论；**本题库、理大文案与部署相关**问题请优先在本仓库（或你们实际托管的 fork）中提出。

---

## 本仓库维护者

- [Deep-Cold](https://github.com/Deep-Cold)
- [shiguangWilliam](https://github.com/shiguangWilliam)

页脚署名：`based on the work of` [rauf-21](https://github.com/rauf-21)。

---

## 功能概览

- **32 道计分题** + 1 道不计入人格结果的社团征集题（可选外链表单）。
- **结果图鉴**：16 型四字母编码（如 EMIC「理大向日葵 / 今井莉莎型」等），见 `lib/result-archetypes.ts`。
- **维度得分**：侧栏 **雷达图**（Recharts），百分比按**对立维度组内**（如 P+E、S+M…）单独计算。
- **理大生存建议**：按测试结果仅展示对应类型的文案。
- **隐藏彩蛋**：特定填答路径解锁「今井莉莎限定评价」（逻辑见 `lib/lisa-easter-egg.ts`）。
- **彩蛋预览页** `/lisa-egg-preview`：默认**不**打进生产构建，需环境变量开启（见下）。

---

## 技术栈

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat-square&logo=chakraui&logoColor=white)](https://chakra-ui.com/)
[![Recharts](https://img.shields.io/badge/Recharts-8884d8?style=flat-square)](https://recharts.org/)

---

## 快速开始

```bash
npm install
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)。

### 常用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 本地开发 |
| `npm run build` | 生产构建（`output: "export"` → `out/`） |
| `npm run lint` | ESLint |
| `npm run dev:lisa-preview` | 开启 `LISA_EGG_PREVIEW` 后启动 dev，可访问彩蛋预览页 |
| `npm run build:lisa-preview` | 带彩蛋预览页的静态构建 |

---

## 静态导出与 GitHub Pages

`next.config.js` 会在设置环境变量 **`GITHUB_REPOSITORY`**（形如 `owner/repo`）且仓库名**不以** `.github.io` 结尾时，自动为资源加上 **`basePath` / `assetPrefix`**（即 `/${repo}`），以适配 **Project Pages**。

用户/组织根仓库的 `*.github.io` 部署一般无需 `basePath`，本地构建可不设该变量。

---

## 环境变量

| 变量 | 说明 |
|------|------|
| `GITHUB_REPOSITORY` | 可选。CI 中设为 `owner/repo` 以启用 Project Pages 的 `basePath`。 |
| `LISA_EGG_PREVIEW` | 设为 `1`、`true` 或 `yes` 时，构建/开发会生成路由 **`/lisa-egg-preview`**；未设置时该路由为 **404**，产物中不包含预览页。 |

可复制 `env.example` 为 `.env.local` 后按需填写。

---

## 许可证

若本目录未单独放置许可证文件，请以上游 **[rauf-21/mbti-personality-test-app](https://github.com/rauf-21/mbti-personality-test-app)** 仓库中的许可证为准；改编部分请在与上游协议相容的前提下使用。

---

<p align="center">
  <sub>Built with gratitude on <a href="https://github.com/rauf-21/mbti-personality-test-app">rauf-21/mbti-personality-test-app</a>.</sub>
</p>
