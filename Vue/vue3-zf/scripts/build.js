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