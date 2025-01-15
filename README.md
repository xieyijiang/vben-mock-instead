# vben-mock-instead

[![Node.js Version](https://img.shields.io/badge/Node.js-20%2B-brightgreen.svg?logo=node.js&logoColor=white)](https://nodejs.org/) [![Express.js Version](https://img.shields.io/badge/Express.js-4.16%2B-white.svg?logo=express&logoColor=white)](https://expressjs.com/)

中文 | [English](./README.en-US.md)

## 概述

基于 Express，替代 [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin) v5 的 mock 服务，可以此为原型开发真实服务端应用。[🔗 完整文档](https://flowus.cn/xieyijiang/share/f40fb799-cd13-4a51-8f69-e656ddd7db9c?code=3DSYE7)

### 版本适配

仅列出测试过的版本，未列出的版本理论上只要 mock 接口相同就可以兼容

| vue-vben-admin                                               | vben-mock-instead |
| ------------------------------------------------------------ | ----------------- |
| [`v5.4.8`](https://github.com/vbenjs/vue-vben-admin/releases/tag/v5.4.8), [`v5.5.0`](https://github.com/vbenjs/vue-vben-admin/releases/tag/v5.5.0), [`v5.5.1`](https://github.com/vbenjs/vue-vben-admin/releases/tag/v5.5.1) | `v0.1.0`          |

## 特点

- 纯粹的 [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) 和 [CommonJS](https://nodejs.cn/api/modules.html)，几乎无封装，代码精简直观、易扩展
- 使用 [ultimate-express](https://github.com/dimdenGD/ultimate-express)，性能大幅提升
- 经典的 MVC 架构，易上手
- 自由编写 JSDoc 和类型注解，仅限注释，不影响代码逻辑

## 快速开始

- 关闭 vben 的 mock 服务 (详细步骤参阅[官方文档](https://doc.vben.pro/guide/essentials/server.html#关闭-mock-服务))

```
VITE_NITRO_MOCK=false
```

- 克隆项目

```bash
git clone https://github.com/xieyijiang/vben-mock-instead.git
```

- 安装依赖

```bash
cd vben-mock-instead && npm install
```

- 启动服务

```bash
npm run dev
```

## 部署
- [Sealos](https://cloud.sealos.run/?uid=gUbGwlEZuk) DevBox (最省心)
- 云服务器: [雨云](https://www.rainyun.com/XIEJIANG_)，优惠码: **XIEJIANG**

### 手动打包 Docker 镜像 

大部分服务器或云环境是 **x86_64** 架构，若打包环境与目标环境不同，则需要转换架构

- 使用 `buildx` 工具构建多架构镜像，Docker Desktop for Mac 通常已内置，也可手动安装

  ```bash
  docker buildx install
  ```

- 构建指定架构的镜像

  ```bash
  docker buildx build --platform linux/amd64 -t vben-mock-instead:latest .
  ```

### 完整流程

使用 [**阿里云容器镜像服务**](https://cr.console.aliyun.com/) + [**Sealos**](https://cloud.sealos.run/?uid=gUbGwlEZuk)

1. 创建个人实例和命名空间

## 存疑

