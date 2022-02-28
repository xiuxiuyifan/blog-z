class Pointer {
  x: number = 0   // 如果没有赋值 ts 默认不能将 null 赋值给其他类型
  y: number = 0
  constructor(x: number, y?: number) {
    this.x = x
    this.y = y!      // 如果参数是可选地的，在使用这个值得时候，就的断言他是存在的，
  }
}

let p = new Pointer(1)

let p1 = new Pointer(1)

console.log(p)


// 访问限制符

// public  公开的 自己能访问 儿子能访问  外界能访问
// protected  自己能访问 儿子能访问 外界不能访问
// private  自己能访问

class Animal {
  public readonly type: string = '哺乳类'
  constructor(type: string) {
    this.type = type
  }
  public getType() {
    return this.type
  }
  static flag = '动物'
  static getFlag() {
    console.log(this)
    return this.flag
  }
  eat() {
    console.log('animal eat')
    return ''
  }
}

class Dog extends Animal {
  constructor(type: string) {
    super(type)
  }
}

let animal = new Animal('动物')
let dog = new Dog('狗')

console.log(dog.type)

// es6 中的静态属性、方法  类的访问器都可以在ts中使用
class Cat extends Animal{ // Cat.__proto__ = Animal
  // private name:string = ''
  constructor(type:string,private name:string){ //接受name 并直接声明到实例上
      super(type);
      // this.name = name;
  }
  static getFlag(){ // 子类要改写父类的静态方法 返回的值要兼容
      console.log(super.getFlag())
      return '猫'
  }
  get newName(){
      return this.name
  }
  set newName(newVal){ // 校验 和 属性的保护，防止非法篡改name
      this.name = newVal;
  }
  eat(){ // 子类重写的原型方法 要和父类的一致
      super.eat();
      console.log('猫 eat')
      return ''
  }
}
let cat = new Cat('哺乳类','Tom');

// Vue里面的 ref 就是用类来实现的, vue2 defineReactvie

console.log(cat.eat())
console.log(Cat.getFlag()) // 静态属性和静态方法 是可以被子类直接继承的












export {}