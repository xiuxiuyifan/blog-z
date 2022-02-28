// 联合类型默认就是  并集的关系

let strOrNumber: string | number   // 如果不赋值，那么只能调用两个类型中间的公共方法
// strOrNumber.toString()   // 在没赋值的时候不能用，一般都需要赋值后才能使用。
strOrNumber = 1
strOrNumber.toFixed()
strOrNumber = 'fda'
strOrNumber.split('')


let ele: HTMLElement | null = document.getElementById('app')
ele!.style.color = 'red';   // ! 表示非空断言， 主管的表示，一定不能为空。后果自行承担

// console.log(ele)
// ?   
// ??   
// 两只都带表取值
// console.log(ele?.style)   // 表示 有 ele 才取 style 属性

// 过滤前一个值是不是 null 或者 undefined， 如果是 null | undefined 则返回后面的结果
// 不是 null 或者 undefined 的话返回自身。
// console.log(false ?? 2)   
// console.log(ele?.style ?? 100) // null



// as 类型断言 来处理为空的情况

(ele as HTMLElement).style.color = 'red';    // 强制断言成一个情况

(<HTMLElement>ele).style.color = 'blue';     // 可能和 jsx 冲突

let x: number | boolean
(x! as number).toFixed()    // 断言这个值 一定存在 ，并且是 number

x! as any as string         // 双重断言， 一般不建议使用，会破坏数据的原有结构




// 字面量类型

// 固定的值 通过 type 关键字来定义类型。
type COLOR = 'red' | 'blue' | 'yellow'
let color: COLOR = 'red'


export {

}