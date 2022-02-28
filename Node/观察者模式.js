// 首先要有一个主题，也就是被观察者
// 其次需要一个或者多个观察者
// 当被观察者发生变化的时候，通知所有的观察者执行方法的调用

class Subject {
  constructor(name) {
    // 被观察者自身的名字
    this.name = name
    // 被观察者自身的状态
    this.state = '不开心'
    // 用来存放观察者
    this.observers = []
  }

  // 获取自身的状态
  getState() {
    return this.state
  }
  // 设置自身的状态
  setState(newState) {
    this.state = newState
    // 通知所有观察者更新
    this.notifyAllObserver()
  }
  // 添加观察者
  attach(observer) {
    this.observers.push(observer)
  }
  // 通知所有的观察者执行自身的方法
  notifyAllObserver() {
    this.observers.forEach(observer => {
      observer.update(this)
    })
  }
}


class Observer {
  constructor(name) {
    this.name = name
  }
  // 执行更新的回调拿到 最新的被观察者
  update(subject) {
    console.log(`我是${this.name}，我观察到${subject.name}的最新状态是 ${subject.state}`)
  }
}

// 创建一个主题（被观察者）
let baby = new Subject('小宝宝')

// 创建父亲
let f = new Observer('爸爸')
// 创建母亲
let m = new Observer('妈妈')

// 给小宝宝添加监护人（给被观察者添加观察者）
baby.attach(f)
baby.attach(m)

// 小宝宝哭了 （被观察者的状态发生变化了，自动通知所有的观察者触发更新）
baby.setState('哭了')
baby.setState('大笑')


// 观察者和发布订阅者模式的区别

// 发布订阅者模式：发布和订阅之间没有耦合关系，什么时候发布取决于自己，也就是主动发布。
// 观察者模式：观察者和被观察者之间有耦合关系，如果被观察者发生了变化，会主动通知观察者去更新（收集：被观察者要收集观察者）
// 观察者模式是包含发布订阅者模式的