// 比如说现在有一个函数，我们需要扩展一下函数的功能，但是不能修改源代码，我们就可以这样做
// function say(args) {
//   console.log("say", args);
// }

// say.before = function (cb) {
//   return (...args) =>{
//     // 调用原始方法
//     cb()
//     this(args)
//   }
// };

// let newSay = say.before(()=>{
//   console.log('beforeSay')
// })

// newSay('hi')

// function isType(typing) {
//   return function (val) {
//     return Object.prototype.toString.call(val) === `[object ${typing}]`;
//   };
// }

// let isString = isType("String");
// console.log(isString(9));


const fs = require('fs')
const path = require('path')

// 读取两个文件中的内容并在最后一起输出
// let source = {}
// function done() {
//   if(Object.keys(source).length === 2) {
//     console.log(source);
//   }
// }

// 编写一个after函数
/**
 *
 * @param times 异步执行的次数
 * @param callback 异步任务都执行完成之后的回调
 */
function after(times, callback) {
  // 缓存参数，形成闭包
  let obj = {}
  return function (key, data) {
    obj[key] = data
    // 当所有的异步任务都执行完成之后
    if(--times === 0) {
      callback(obj)
    }
  }
}

let done = after(2, (obj) => {
  console.log(obj);
})
fs.readFile(path.resolve(__dirname, './name.js'), 'utf-8', function(err, data){
  done('name', data)
})
fs.readFile(path.resolve(__dirname, './age.js'), 'utf-8', function (err, data){
  done('age', data)
})

