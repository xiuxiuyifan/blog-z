// 基础类型

// 1-3
let str: string = 'dfafa'
let num: number = 100
let bool: boolean = false


let b: boolean = false
let b1: Boolean = true
// let b2: boolean = new Boolean(false)  // 实例类型无法赋值给基本数据类型

// 元组  类型是固定长度的 数组
// 4
let tuple: [string, number, boolean] = ['a', 1, false]   // 不能通过索引增加数据

tuple[1] = 333
tuple.push(23424)  // 在添加数据的时候只能添加已有类型的数据


// 5
// 数组

// 特点，存放一类类型的集合，联合类型可以设置数组的类型

let arr: (number|string)[] = [1, '33']
arr.push(100)

let arr1: any = {}
let arr2: any[] = [{}, {}]  //   any[]， 表示这个数组里面的内容可以是随意的
let arr3: Array<(number | string)> = [1]

// 6 
// 枚举类型，状态码， 固定标识

// 如果有默认值，并且不是数组的话，就不会反举。
enum AUTH {
  ADMIN = 'a',
  MANAGER = 'b',
  USER = 'c'
}
// console.log(AUTH.ADMIN)

// 默认情况下 枚举的功能具有反举，最终编译的结果是一个对象， 如果没有默认值，会自动递增的，
enum AUTH1 {
  ADMIN,
  USER,
  MANAGER
}

// console.log(AUTH1[0])
// console.log(AUTH1.ADMIN)

// 在不需要反举的情况下， 通常使用常量枚举
const enum COLOR {
  red,
  yellow,
  blue
}
// console.log(COLOR.red)

// 再包含一点位运算的知识。一般情况下用来做权限

// 箭头朝左，就是左移运算符
// 一个字节是 8 位 
// 在左移的过程中，符号位始终保持不变。如果右侧空出位置，则自动填充为 0；超出 32 位的值，则自动丢弃
// 任何数字的 0 次方都是 1
let color = {
  admin: 1,            // 0000 0001  1*2^0 + 0*2^1  = 1 + 0
  manager: 1 << 1,     // 0000 0010  0*2^0 + 1*2^1  = 0 + 2
  user: 1 << 2         // 0000 0100  0*2^0 + 0*2^1 + 1*2^2  = 0 + 0 + 4
}


// 假设某个用户拥有中权限    admin 和 user 
// 那么，最终的结果就是
// 001 | 100       0000 0101   1*2^0 + 0*2^1 + 1*2^2  = 1 + 0 + 4 = 5
// 权限组合
let user1 = color.admin | color.user   // 进行一个 或运算 有一位为真就是真   101
// console.log(user1)   // 5

// 判断权限
// 就可以判断 user1 是否有 admin 和 user 权限了。
// 010 & 101   ->   000
let has = color.manager & user1;         // 按位进行与，两个都是真才是真 

console.log(has)   // 0


// 7, 8  null 和 undefined 的区别是什么？

// 严格模式中  null 只能赋值给 null undefined 只能赋值给 undefined
// 非严格模式中 null 和 undefined 可以赋值给任意类型（任何类型的子类型）

let un: undefined = undefined
let nu: null = null

// 9  void  空类型 一般用于函数的返回类型
// void 能够接受的值有 undefined 和 null 在严格模式下不能使用null
// strictNullChecks 如果开启null 的检测 ， 在严格模式下 返回值 不能使用 null
function a(): void {
}


// 10. never  标识永远不

// 1. 程序无法到终点（死循环，抛错，）
// 2. 判断的时候会出现 
// 3. 用来做一些特殊的处理

function throwError(): never {
  throw new Error()
}

function whileTrue(): never{
  while(true) {

  }
}

function getVal(str: string) {
  if(typeof str == 'string') {
    str
  }else {
    str
  }
}


// 11 Symbol bigInt
// 唯一值
let s1: Symbol = Symbol()
let s2 = Symbol()

console.log(s1 === s2)   // false

let big1 = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1)
let big2 = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(2)

console.log(big1  === big2)

// 12 object  除了进本类型都可以用  object

function create(o: object) {

}

create([])
create({})
create(function() {})

// 默认添加 export {} , 表示当前是一个模块
export {}