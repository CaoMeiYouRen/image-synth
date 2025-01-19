<h1 align="center">image-synth </h1>
<p>
  <a href="https://www.npmjs.com/package/image-synth" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/image-synth.svg">
  </a>
  <a href="https://www.npmjs.com/package/image-synth" target="_blank">
    <img alt="npm downloads" src="https://img.shields.io/npm/dt/image-synth?label=npm%20downloads&color=yellow">
  </a>
  <img alt="Version" src="https://img.shields.io/github/package-json/v/CaoMeiYouRen/image-synth.svg" />
  <a href="https://github.com/CaoMeiYouRen/image-synth/actions?query=workflow%3ARelease" target="_blank">
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/CaoMeiYouRen/image-synth/release.yml?branch=master">
  </a>
  <img src="https://img.shields.io/node/v/image-synth" />
  <a href="https://github.com/CaoMeiYouRen/image-synth#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/CaoMeiYouRen/image-synth/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/CaoMeiYouRen/image-synth/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/CaoMeiYouRen/image-synth?color=yellow" />
  </a>
</p>


> 一个可以指定背景图片和文字，并合成图片的 Node.js 工具

## 🏠 主页

[https://github.com/CaoMeiYouRen/image-synth#readme](https://github.com/CaoMeiYouRen/image-synth#readme)


## 📦 依赖要求


- node >=18

## 🚀 安装

```sh
npm install image-synth
```

## 👨‍💻 使用

首先安装依赖：

```sh
npm install image-synth
```

然后在代码中使用：

```typescript
import path from 'path'
import { synthesizeImage } from 'image-synth'

// 合成图片
const image = await synthesizeImage({
    backgroundImagePath: path.resolve(__dirname, './background.png'), // 背景图片路径
    text: 'Hello World', // 要绘制的文字
    outputPath: path.resolve(__dirname, './output.png'), // 输出图片路径
    fontSize: 80, // 字体大小
    textAlign: 'center', // 文字对齐方式
    textY: 200, // 文字Y轴位置
    fontColor: '#ffffff', // 文字颜色
    fontFamily: 'sans-serif' // 字体
})

console.log('图片合成成功！')
```

### 参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| backgroundImagePath | string | 背景图片路径 |
| text | string | 要绘制的文字 |
| outputPath | string | 输出图片路径（可选） |
| fontSize | number | 字体大小（默认60） |
| fontColor | string | 文字颜色（默认#ffffff） |
| fontFamily | string | 字体（默认sans-serif） |
| textAlign | 'left'\|'right'\|'center'\|'start'\|'end' | 文字对齐方式（默认left） |
| textX | number | 文字X轴位置（默认0） |
| textY | number | 文字Y轴位置（默认0） |
| maxWidth | number | 文字最大宽度（可选） |

## 🛠️ 开发

```sh
npm run dev
```

## 🔧 编译

```sh
npm run build
```

## 🔍 Lint

```sh
npm run lint
```

## 💾 Commit

```sh
npm run commit
```


## 👤 作者


**CaoMeiYouRen**

* Website: [https://blog.cmyr.ltd/](https://blog.cmyr.ltd/)

* GitHub: [@CaoMeiYouRen](https://github.com/CaoMeiYouRen)


## 🤝 贡献

欢迎 贡献、提问或提出新功能！<br />如有问题请查看 [issues page](https://github.com/CaoMeiYouRen/image-synth/issues). <br/>贡献或提出新功能可以查看[contributing guide](https://github.com/CaoMeiYouRen/image-synth/blob/master/CONTRIBUTING.md).

## 💰 支持

如果觉得这个项目有用的话请给一颗⭐️，非常感谢

<a href="https://afdian.com/@CaoMeiYouRen">
  <img src="https://oss.cmyr.dev/images/202306192324870.png" width="312px" height="78px" alt="在爱发电支持我">
</a>


## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=CaoMeiYouRen/image-synth&type=Date)](https://star-history.com/#CaoMeiYouRen/image-synth&Date)

## 📝 License

Copyright © 2025 [CaoMeiYouRen](https://github.com/CaoMeiYouRen).<br />
This project is [MIT](https://github.com/CaoMeiYouRen/image-synth/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [cmyr-template-cli](https://github.com/CaoMeiYouRen/cmyr-template-cli)_
