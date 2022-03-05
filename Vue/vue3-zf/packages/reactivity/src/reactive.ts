import { isObject } from "@vue/shared";
import { mutableHandlers, readonlyHandlers, shallowReactiveHandlers, shallowReadOnlyHandlers } from "./baseHandlers";

// 用 weakmap 容器缓存原始对象时候被代理过了，
// weakMap 是弱引用 在引用计数的时候不会被计算

const reactiveMap = new WeakMap(); // 正常响应式对象
const readonlyMap = new WeakMap(); // 只读响应式对象
const shallowReactiveMap = new WeakMap(); // 浅的响应式对象
const shallowReadonlyMap = new WeakMap(); // 浅的只读响应式对象

// 返回一个 响应式对象
export function reactive(target: object) {
  return createReactiveObject(target, mutableHandlers, reactiveMap);
}

// 浅的响应式对象

export function shallowReactive(target: object) {
  return createReactiveObject(target, shallowReactiveHandlers, shallowReactiveMap);
}

// 只读的响应式对象

export function readonly(target: object) {
  return createReactiveObject(target, readonlyHandlers, readonlyMap);
}

// 浅的只读的响应式对象

export function shallowReadonly(target: object) {
  return createReactiveObject(target, shallowReadOnlyHandlers, shallowReadonlyMap);
}

/**
 * 创建响应式对象， 根据参数的不同 来进行不同的处理
 * @param target 代理的原始对象
 * @param baseHandlers  proxy 的处理参数
 * @param proxyMap      每种类型对应的代理缓存池
 * @returns 
 */
export function createReactiveObject(target, baseHandlers, proxyMap) {
  // 检测 被代理目标是不是对象
  if (!isObject(target)) {
    return target;
  }

  // 检测是否已经代理 过了
  const existsProxy = proxyMap.get(target);
  if (existsProxy) {
    return existsProxy;
  }

  const proxy = new Proxy(target, baseHandlers);
  // 把代理的目标对象缓存起来
  // key 是原始对象  value 是代理后的 proxy 对象
  proxyMap.set(target, proxy);
  return proxy;
}
