/// <reference path="./tools.ts" />

//  ts 中还有个重要的概念 命名空间

// 用来解决文件命名冲突问题



// 命名合并问题，  能合并的东西有  
// （接口同名可以合并）   
// （函数和命名空间可以合并） 
// （相同的命名空间和命名空间可以合并）
// （命名空间可以和类合并）（类和接口合并）

// import {Zoo, Foo} from './namespace'

// console.log(Zoo.m1)   // 相同的命名空间会合并
// console.log(Zoo.m2)

// console.log(Foo.x)


function Fn() {

}
namespace Fn{   // 给函数扩展属性
  export let a = 1
  export let b = 2
}
console.log(Fn.a)


// interface Person { // 给Person类原型扩充属性
//   say(): void
// }

// function addSay(target: Function) {
//   target.prototype.say = function() {
//     console.log('原型上的属性')
//   }
// }
// @addSay        // 给原型上添加属性
class Person {

}
namespace Person { // 给类本身扩充属性
  // export function say() { 
  //   console.log('88')
  // }
}
let person = new Person();
// person.say



// 三斜线指令

// 三斜线指令引用告诉编译器在编译过程中要引入的额外的文件。下例在编译 index.ts 之前，编译器会确保先编译 tools.ts。


// namespace xxx {
//   let count = Tools.count
//   console.log('hihih')
//   console.log(count)
//   class Animal {}
// }





// 给 window 添加属性
// 接口的合并 ，给window上添加类型 , 如果是全局的变量扩展的时候 需要使用 declare global 否则无法访问
declare global {
  interface Window {   // 大写
    xxx: string
  }
  interface String {
    xxx() : void
  }
}

String.prototype.xxx = function () {
  
}

window.xxx = '89789789'


// declare 声明的意思 
// 如果jquery是在cdn中引入的， 那么当前模块中是不会引入jquery的

// 不正常引入的 或者没有 @types 包的一般使用 ts 的话都会引入对应的声明文件的。

// .d.ts ts中的声明文件 ，声明（不是正常引入的类型） 全部使用 declare关键字
declare function $(selector: string) :{
  css(val: string): void
}
declare namespace $ {
  namespace fn{
    function extend(): void
  }
}

$('').css('xxx')

$.fn.extend()

declare module $ {   // .d.ts

}


export {}