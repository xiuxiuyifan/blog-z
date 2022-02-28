const fs = require("fs");
const path = require("path");

// 用发布订阅者实现
let event = {
  /**
   * 事件池
   * {
   *   name: [fn, fn, fn],
   *   name1: [fn, fn, fn]
   * }
   */
  pond: {},
  /**
   *
   * @param type 订阅的事件类型
   * @param fn 订阅事件触发之后的回调函数
   */
  on(type, fn) {
    // 检测在当前事件池中是否含有要加入的类型的事件，
    // 如果没有则创建一个当前类型的数组用来存放这一类型的事件函数
    // 取出当前事件类型的数组，判断当前事件函数是否存在于当前类型的事件池中，如果存在则返回
    !this.pond.hasOwnProperty(type) ? this.pond[type] = [] : null
    let arr = this.pond[type]
    if(!arr.includes(fn)) {
      arr.push(fn)
    }
  },
  /**
   * 取出之前注册的这一类事件，依次执行，并且传入当前数据
   * @param type
   * @param data
   */
  emit(type, data) {
    let arr = this.pond[type] || []
    arr = arr.slice(0)
    arr.forEach(fn => {
      fn(data)
    })
  }
}

event.on('load', (data) => {
  console.log(`当前已加载完${data.key}`)
})
let result = {}

event.on('load', (data) => {
  let {key, content} = data
  !result[key] ? result[key] = content : null
  if(Object.keys(result).length === 2) {
    console.log('文件已经全部加载完毕', result);
  }
})

fs.readFile(path.resolve(__dirname, './name.js'), 'utf-8', function(err, data){
  event.emit('load', {key: 'name', content: data})
})

fs.readFile(path.resolve(__dirname, './age.js'), 'utf-8', function (err, data){
  event.emit('load', {key: 'age', content: data})
})