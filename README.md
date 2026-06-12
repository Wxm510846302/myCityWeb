# CityParkWeb

从 iOS SwiftUI 原型转换出的独立 Web 项目，未修改原 `CityParkTest` 工程。

## 技术栈

- React 19
- TypeScript
- Vite
- 资源来自原工程 `Assets.xcassets`，已复制到 `public/assets`

## 本地运行

```bash
npm install
npm run dev -- --port 5175
```

访问：

```text
http://localhost:5175
```

## 构建

```bash
npm run build
```

## 已迁移页面

- 欢迎对话页
- 首页
- 学练馆
- 学习房
- 练歌房
- 练琴房
- 朗诵房
- 我的学习足迹
- 同学圈
- 发布动态页
- 活动馆
- 娱乐馆
- 听书、游戏、修图页面

同学圈发布按钮已实现呼吸动效；练歌房、练琴房、朗诵房、学练馆、足迹页的声纹位置按当前 SwiftUI 版本迁移。
