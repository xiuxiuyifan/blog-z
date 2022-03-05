import { isObject } from "@vue/shared";
import { reactive, readonly } from ".";
import { track } from "./effect";

/**
 * 创建 生成 get 处理器函数
 * 并且在  get 函数 里面要做依赖收集
 * @param isReadonly
 * @param shallow
 */
function createGetter(isReadonly = false, shallow = false) {
  /**
   * 代理目标对象   获取值的时候的 key、   receiver: proxy 代理对象
   */
  return function get(target, key, receiver) {
    // 原始值
    let res = Reflect.get(target, key, receiver)   // 相当于  target[key]
    // 如果不是仅读的， 就要进行依赖收集
    if(!isReadonly) {
      // 依赖收集
      track(target, 'get', key)
    }
    if(shallow) {
      return res  //直接返回 浅的响应式对象
    }
    // 如果 target[key] 的值是一个对象，的话就记性递归代理
    // 但是不是一开始就代理的， 是在用到这个对象的时候才进行代理的 ，既访问到这个对象的时候
    if(isObject(res)) {
      // 是对象的时候还分两种情况， 如果是只读的就调用 readonly,  否则调用 reactive 进行代理
      return isReadonly ? readonly(res) : reactive(res)
    }
    return res
  };
}

/**
 * 创建 set 处理器
 * 并且在 set 里面要进行 触发依赖
 * @param shallow 是不是浅的响应式
 */
function createSetter(shallow = false) {
  return function set() {

  };
}

const get = createGetter();
const readonlyGet = createGetter(true, false)  // 仅读的 
const shallowGet = createGetter(false, true)   // 浅的
const shallowReadonlyGet = createGetter(true, true)  // 浅的仅读的


const set = createSetter();

export const mutableHandlers = {
  get,
  set,
};

export const readonlyHandlers = {
  get: readonlyGet
}

export const shallowReactiveHandlers = {
  get: shallowGet
}

export const shallowReadOnlyHandlers = {
  get: shallowReadonlyGet
}
