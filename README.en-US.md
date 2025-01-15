# vben-mock-instead

[![Node.js Version](https://img.shields.io/badge/Node.js-20%2B-brightgreen.svg?logo=node.js&logoColor=white)](https://nodejs.org/) [![Express.js Version](https://img.shields.io/badge/Express.js-4.16%2B-white.svg?logo=express&logoColor=white)](https://expressjs.com/)

[中文](./README.md) | English

## Overview

Based on Express, it serves as an alternative mock service for [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin) v5, and can be used as a prototype to develop real server-side applications. [🔗 Full Documentation](https://flowus.cn/xieyijiang/share/f40fb799-cd13-4a51-8f69-e656ddd7db9c?code=3DSYE7)

### Version Adaptation

Only tested versions are listed. Versions not listed are theoretically compatible as long as the mock interface is the same.

| vue-vben-admin                                               | vben-mock-instead |
| ------------------------------------------------------------ | ----------------- |
| [`v5.4.8`](https://github.com/vbenjs/vue-vben-admin/releases/tag/v5.4.8), [`v5.5.0`](https://github.com/vbenjs/vue-vben-admin/releases/tag/v5.5.0), [`v5.5.1`](https://github.com/vbenjs/vue-vben-admin/releases/tag/v5.5.1) | `v0.1.0`          |

## Features

- Pure [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and [CommonJS](https://nodejs.org/docs/v22.12.0/api/modules.html), almost no encapsulation, concise and easy to extend
- Using [ultimate-express](https://github.com/dimdenGD/ultimate-express)，performance is greatly improved
- Classic MVC architecture, easy to use
- Freely write JSDoc and type annotations, limited to comments, without affecting code logic

## Quick Start

- Disable vben's mock service (Refer to [official documentation](https://doc.vben.pro/en/guide/essentials/server.html#disabling-mock-service) for detailed steps)

```
VITE_NITRO_MOCK=false
```

- Clone the project

```bash
git clone https://github.com/xieyijiang/vben-mock-instead.git
```

- Install dependencies

```bash
cd vben-mock-instead && npm install
```

- Start the service

```bash
npm run dev
```
