# webpack

> 前端资源加载/打包工具。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。Webpack 可以将多种静态资源 js、css、less 转换成一个静态文件，减少了页面的请求

> 核心概念
>
> - entry 入口
>   - 入口指示webpack以哪个文件为入口文件开始打包，分析构建内部依赖图
> - output 输出
>   - 输出指示webpack打包后的资源bundles输出到哪里，以及如何命名
> - loader 翻译官
>   - loader可以让webpack能够处理那些非js文件（webpack自身只理解js、json，现webpack5可以处理图片资源了～）
> - plugins 插件
>   - 插件plugins可以用于执行范围更广的任务。插件的范围包括：从打包优化和压缩、一直到重新定义环境中的变量
> - mode 模块
>   - 模式指示webpack使用相应模式的配置

**使用 webpack 进行性能优化**
1. 代码拆分：将应用程序拆分为多个小块，按需加载，减小初始加载的文件大小，提高页面加载速度。
2. 延迟加载：按需加载某些模块或代码块，减少初始加载的文件大小，提高页面响应速度。
3. 压缩和混淆代码：使用压缩工具对代码进行压缩和混淆，减小文件大小，提高加载速度。
4. 优化文件大小：使用加载器和插件对不同类型的文件进行优化处理，如压缩CSS、压缩图片等。
6. 缓存和长效缓存：生成带有哈希值的文件名，利用浏览器缓存机制，减少请求次数，提高再次访问时的加载速度。
7. Tree Shaking：消除未使用的代码，减小文件大小，提高运行时的性能。
8. 并行构建和缓存：使用多线程构建和缓存策略，加快构建速度，提高开发效率。
9. 优化Webpack配置：合理配置选项和插件，如设置合适的模式、调整模块解析规则等。

- generate-asset-webpack-plugin 外部使用json
  ```js
  const GeneraterAssetPlugin = require('generate-asset-webpack-plugin')
  const createJson = function(compilation) {
    return JSON.stringify(serverConfig)
  }

  new GeneraterAssetPlugin({
    // 输出到dist根目录下的serverConfig.json文件,名字可以按需改
    filename: 'serverConfig.json',
    fn: (compilation, cb) => {
      cb(null, createJson(compilation));
    }
  })
  // 利用localStorage存储JSON_HOST配置值，外部就可以通过修改该配置文件，变更host了
  // host: window.localStorage['JSON_HOST']
  axios.get('serverConfig.json').then((result) => {
    window.localStorage['JSON_HOST'] = result.data.baseUrl
  }).catch((error) => { console.log(error) });
  ```

- loader转换
  - loader 本身是一个 JS 函数，接收模块文件的源代码作为参数，经过加工改造后返回新的代码
- 将ES6代码转换为ES5 `Babel Loader`
- 将Sass文件转换为CSS并添加浏览器前缀 `Sass Loader & PostCSS Loader`
- 将HTML文件转换为字符串 `HTML Loader`
- 压缩和优化图像 `Image Loader`

```js
module.exports = {
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ]
  }
}
```
```js
// webpack config
module.exports = {
  module: {
    rules: [
      { test: /\.js$/, use: '/my-custom-log.js' },
    ]
  }
}
// 自定义loader /my-custom-log.js
const path = require('path');
const fs = require('fs');
module.exports = function(source) {
  try {
    // 执行源代码
    eval(source);
  } catch (error) {
    // 处理异常
    console.error('Error caught in loader:', error);
    // 记录错误信息
    const errorMessage = `Error caught in loader: ${error}\n`;
    // 将错误信息写入日志文件
    const logFilePath = path.resolve(__dirname, 'error-log.txt');
    fs.appendFileSync(logFilePath, errorMessage);
    // 抛出错误（可选）
    throw new Error('An error occurred during the loading process.');
  }
  return source
}
```

##  打包流程

1. 初始化阶段 - 初始化阶段的逻辑集中在调用 webpack(config)
  1. 读取与合并配置信息
  2. 创建编译器（compiler）对象
  3. 插件注册
2. 编译阶段 - 起点是在 compiler.run
  1. 发起构建通知，触发 hooks.run 通知相关插件
  2. 创建 compilation 编译对象，执行 compilation.build 开始模块构建
  3. 读取 entry 入口文件
  4. 编译 entry 入口文件
    - 通过 fs 模块读取 entry 入口文件内容；
    - 调用 loader 来转换（更改）文件内容；
    - 为模块创建 module 对象，通过 AST 解析源代码收集依赖模块，并改写依赖模块的路径；
    - 如果存在依赖模块，递归进行上述三步操作
3. 生成阶段
  - 会根据 entry 创建对应 chunk 并从 this.modules 中查找被 entry 所依赖的 module 集合
  - 结合 runtime webpack 模块机制运行代码，经过拼接生成最终的 assets 产物
4. 写入阶段
  - assets 上已经拥有了最终打包后的代码内容，最后要做的就是将代码内容写入到本地磁盘之中

> Webpack优化
>
> 1. 代码切割，使用code splitting将代码进行分割，避免将所有代码打包到一个文件，减少响应体积。
> 2. 按需加载代码，在使用使用的时候加载代码。
> 3. 压缩代码体积，可以减小代码体积
> 4. 优化静态资源，使用字体图标、雪碧图、webp格式的图片、svg图标等
> 5. 使用Tree Shaking 删除未被引用的代码
> 6. 开启gzip压缩
> 7. 静态资源使用CDN加载，减少服务器压力
> 8. 使用 happypack 等插件开启多线程loader
