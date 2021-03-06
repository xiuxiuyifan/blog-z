//  都是从安全性 去考虑 ts 中的兼容性的  兼容性是在把一个变量赋值给另一个变量的时候才产生的


// 基本类型兼容性
 
// 少的类型可以赋值给多的类型
let v1!: string | number
let v2!: string | number | boolean

// v2 = v1  // 允许
// v1 = v2     // 不允许  


// 接口的兼容性

// 只要多的类型，可以赋值给少的   鸭子类型  （不关心内容，只看长得一不一样）

interface I1{
  a: string
  b: string
}

interface I2{
  a: string
}

let i1!: I1
let i2!: I2

i2 = i1       // 多的类型可以 可以赋值给少的


// 函数的兼容性  参数 返回值
//  少的  可以赋值给多的
let sum1 = (a: string, b: string): string | number => 1
let sum2 = (a: string): string => ''
// 之前写过一个map方法  我定义的时候 有2个参数，但是用户使用的时候只用了一个
sum1 = sum2;// 定义了a，b 。 你只用一个c 也是可以的



// 类的类型  兼容他的检测是符合鸭子检测的 （实例 只要实例一样 那就是一个东西）
// 特殊的情况 就是类中如果带了 private protected 就不是一个东西了 （不兼容了）
class Person {
  public name = "张三"
}
class Animal {
  public name = "张三"
}
let p!: Person
let a!: Animal

p = a
a = p

// 枚举永远不兼容
enum E1 { }
enum E2 { }

// let e1!:E1;
// let e2!:E2

// e1 == e2




// 针对函数的抽象概念、参数是逆变的   返回值是协变的 可以返回儿子   （传父返子）

class GrandParent{
  house: string = ''
}

class Parent extends GrandParent {
  money: string = ''
}

class Son extends Parent {
  play: string = ''
}


function genFn(cb: (val: Parent) => Parent) {

}
// 此时的 val 可以处理 house 和 money
genFn((val: GrandParent) => new Son)


function getFn1(cb: (val: number | boolean) => string | boolean) {
  cb(10)
}

// 调用 的时候声明的回调函数的参数类型多的，可以赋值给声明时候参数少的那个。
getFn1((val: number | string | boolean) => '')

export {}