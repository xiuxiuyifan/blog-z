//  函数

// 函数一般也会标识类型  函数的参数 ， 函数的返回值

// 1. function来声明    2. 表达式来声明

// 如果能自动推断出来的可以不用标识类型

type Sum = (a: string , b: string) => string     // 类型别名， 类型可以复用的
 
let sum: Sum = (a: string, b: string) =>{
  return a + b
}

let r = sum('a', '110')


// function 声明的函数只能标识参数类型和返回值类型

function sum1(a: string, b: string): string {
  return a + b
}


// 同样支持 js 里面的 可选参数 ，默认值 ，和剩余参数

// 可选参数只能放在最后面
function optional(a: string, b?: string, c?: string) {

}

optional('a')

// 剩余参数
function spread(...args: number[]) {

}

spread(1,2,3,4)

// 默认值
function defaultVal(a: string, b:string = '100') {
}
defaultVal('fa')

// 用于标识  函数中的 this

function callThis(this: undefined, a: string) {} 

callThis.call(undefined, 'fasfa')


// 函数重载

// 给一个 字符串  '123'  返回 ['1','2','3']

// 给一个 数字 123       返回 [1, 2, 3]

function toArray(val: string):string[]   // 这里只做条件的限制 ，不做具体的实现，对函数返回的结果进行列举
function toArray(val: number):number[]
function toArray(val: string | number): string[] | number[] {     // 具体的实现
  if(typeof val === 'string') {
    return val.split('')
  }else {
    return val.toString().split('').map(item => Number(item))
  }
}

let arr = toArray('123')



export {

}