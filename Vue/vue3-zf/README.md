# Vue3 源码学习笔记

## 一、环境搭建



### 1、安装依赖

```
mkdir vue3-zf

yarn init -y 
tsc --init
```

```shell
yarn add typescript rollup rollup-plugin-typescript2 @rollup/plugin-node-resolve @rollup/plugin-json execa -D
```

| typescript                  | 支持typescript         |
| --------------------------- | ---------------------- |
| rollup                      | 打包工具               |
| rollup-plugin-typescript2   | rollup 和 ts的 桥梁    |
| @rollup/plugin-node-resolve | 解析node第三方模块     |
| @rollup/plugin-json         | 支持引入json           |
| execa                       | 开启子进程方便执行命令 |

### 2、workspace 配置

```json
{
  "private": true,
  "workspaces": [
    "packages/*"
  ],
}
```

> 目录结构

```sh
│  package.json        # 配置运行命令 
│  rollup.config.js    # rollup配置文件
│  tsconfig.json       # ts配置文件 更改为esnext
│  yarn.lock
│  
├─packages             # N个repo
│  └─reactivity
│      │  package.json
│      └─src
│          index.ts
│              
└─scripts              # 打包命令
        build.js
        dev.js
```

> 配置模块名称及打包选项

```json
{
  "name": "@vue/reactivity",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "buildOptions": {
    "name": "VueReactivity",
    "formats": [
      "esm-bundler",
      "cjs",
      "global"
    ]
  }
}
```

### 3、对packages下模块进行打包

> scripts/build.js 

[execa](https://github.com/sindresorhus/execa) 是更好的子进程管理工具（A better child_process）。本质上就是衍生一个 shell，传入的 command 字符串在该 shell 中直接处理。 

```javascript
// 目的：打包的目的就是 多个文件夹并行打包  
// 同时执行多个  rollup -c -w 命令 


// execa 可以单独开启一个子进程执行命令  ， 单独开启一个进行进行打包
import {execa} from 'execa';
// 获取 packages 目录下面所有的包
import {readdirSync, statSync} from 'fs'

let targetPath = 'packages'
// 读取 packages 目录下面所有的包， 并过滤掉不是文件夹的东西
// 拿到的是一个数组，然后进行过滤
let targets = readdirSync(targetPath).filter(item => {
  // 检测文件信息，是不是一个文件夹
  return statSync(`${targetPath}/${item}`).isDirectory()
})
// 此时下面已经全部是文件夹了


// 单个打包，拆分
async function build(target) {
  console.log('打包' + target)
  // 专门开启一个进程 调用 rollup 进行打包
  return execa('rollup', ['-c', '--environment', 'TARGET:'+target], {
    stdout: 'inherit'   // 表示子进程输出的结果会输出到父进程中
  })
}

// 并行执行开启子进程
function runAll(targets) {
  let result = []
  for(let target of targets){
    result.push(build(target))
  }
  return Promise.all(result)   // 多个文件夹并行打包
}

console.log(targets)
runAll(targets)
.then(() => {
  console.log('打包完成')
})
.catch((e) => {
  console.log(e)
  console.log('打包异常！')
})
```



![image-20220302221735544](C:\Users\z\Documents\笔记\images\image-20220302221735544.png)



### 4、创建rollup.config.js文件

### ^_^ 知识补充

#### 1、path.join & path.resolve的区别

- path.join

path.join():方法使用平台特定的分隔符把全部给定的 path 片段**连接**到一起，并**规范化**生成的路径。

例如：path.join('foo', 'baz', 'bar'); // 返回 'foo/baz/bar'

注：如果连接后的路径字符串是一个长度为零的字符串，则返回 '.'，表示当前工作目录。

- path.resolve

path.resolve:方法会把一个路径或路径片段的序列解析为一个**绝对路径**。

例如：

注： 当前工作目录为 /home/myself/node

```javascript
1、path.resolve('/foo/bar', './baz');// 返回: '/foo/bar/baz'

2、path.resolve('/foo/bar', '/tmp/file/');// 返回: '/tmp/file'

3、path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');// 如果当前工作目录为 /home/myself/node，// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
```

- 两者区别：

1、join是把各个path片段连接在一起， resolve把‘／’当成根目录

```javascript
path.join('/a', '/b') // Outputs '/a/b'
path.resolve('/a', '/b') // Outputs '/b'
```

2、join直接拼接字段，resolve解析路径并返回

```javascript
path.join("a", "b1", "..", "b2")
console打印会得到"a/b2"
path.resolve("a", "b1", "..", "b2")
console打印得到"/home/myself/node/a/b2"
```

> rollup.config.js

```javascript
const path = require("path");
const ts = require("rollup-plugin-typescript2");
const resolvePlugin = require("@rollup/plugin-node-resolve").default;

// 根据调用 rollup 命令的时候传入的环境变量 --environment .TARGET 获取到当前正在打的包名
let target = process.env.target;

// 1. 拼接入口文件地址
// 2. 动态声明 多个 output 配置
// 3. 添加其他配置信息 （插件信息）

let currentPath = path.join(__dirname, 'packages', target)

let packageJson = require(`${currentPath}/package.json`)
let buildOptions = packageJson.buildOptions

function genOutput(buildOptions) {
  let formats = buildOptions.formats || []
  return formats.map(format => {
    return {
      file: `${currentPath}/dist/${target}.${format}.js`,
      format: format,
      name: format === 'umd' ? buildOptions.name : undefined    // output umd 规范 一定要有名字
    }
  })
}

export default {
  input: `${currentPath}/src/index.ts`,
  output: genOutput(buildOptions),
  plugin: [
    ts({
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
    }),
    resolvePlugin(),
  ],
};

```

子模块下面的 package.json 文件  `yarn init -y`

```json
{
  "name": "@vue/reactivity",
  "version": "1.0.0",
  "module": "dist/reactivity.es.js",
  "license": "MIT",
  "buildOptions": {
    "name": "VueReactivity",    // 包 umd 的下面对应的 window.VueReactivity 的名字
    "formats": [
      "es",   // es6 module
      "cjs",  // commonjs module
      "umd"   // umd  浏览器环境和 node 环境都支持
    ]
  },
  // 子模块之间依赖，写完这个配置之后要手动执行 yarn install ， yarn 会生成软连接，把依赖的包都提取到根目录下面的 node_modules 下面去。
  "dependencies": {   // 当前模块依赖的模块
    "@vue/shared": "1.0.0"
  }
}

```



### 5、开发环境打包



## 二、响应式模块

### 1、响应式API初体验

```javascript
<script src="https://unpkg.com/vue@next"></script>
let {reactive, readonly, shallowReactive, shallowReadonly} = Vue

// 都是返回 对象的响应式副本  
let o1 = reactive({a: 1, b: {age: 100}}) 
let o2 = readonly({a: 2, b: {age: 100}})
let o3 = shallowReactive({a: 3, b: {age : 100}})
let o4 = shallowReadonly({a: 4, b: {age: 10}})

console.log(o1.b)    // 获取到的是一个代理对象
o2.b.age = 100       // 深层仅读的对象属性不能被修改
console.log(o3.b)    // 浅 的代理对象，下面的对象不会被代理
o4.b.age = 9         // 浅的只读的对象 深层的还可以修改
console.log(o4.b.age)
```

![image-20220304220856271](C:\Users\z\Documents\笔记\images\image-20220304220856271.png)

### ^_^ 知识补充

#### 1、Proxy的使用

`get`方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。

```javascript
const proxy = new Proxy({}, {
  get: function(target, key, receiver) {
    return receiver;
  }
});
// 这里的意思是去 proxy 对象上读某个属性就会触发 get 函数并返回 第三个参数，也就是  proxy 实例本身
proxy.xxx === proxy // true
```

还有其他的参考 [阮一峰 ES6 入门](https://es6.ruanyifeng.com/#docs/proxy)

#### 2、weakMap() & Map()

+ Map(), 它类似于对象，也是键值对集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当做键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

weakMap 和 Map 的区别

1. 首先，`WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。
2. 其次，`WeakMap`的键名所指向的对象，不计入垃圾回收机制。总之，`WeakMap`的专用场合就是，它的键所对应的对象，可能会在将来消失。`WeakMap`结构有助于防止内存泄漏。
3. 注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

其他的参考 [阮一峰 ES6 入门](https://es6.ruanyifeng.com/#docs/set-map#Map)

### 2、响应式API实现

### 3、shared模块实现





## 三、初始化流程



## 四、渲染流程



## 五、diff算法



## 六、异步更新策略



## 七、声明周期实现原理



## 八、编译原理



## 九、参考文章

1. [Rollup打包工具的使用（超详细，超基础，附代码截图超简单）](https://juejin.cn/post/6844904058394771470)
2. [path.join()和path.resolve()区别](https://zhuanlan.zhihu.com/p/27798478)
3. 2
4. 































