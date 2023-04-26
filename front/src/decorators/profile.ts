import { getProfiler } from '../utils/profiler'

export const profile = function (label?: string) {
  return function (_target: Object, methodName: unknown, descriptor: PropertyDescriptor) {
    const key = label ?? (methodName as string)
    if (typeof methodName !== 'string') {
      return
    }
    const originalMethod = descriptor.value
    const newMethod = function (this: any, ...args: unknown[]) {
      const profiler = getProfiler()
      profiler.start(key)
      const result = originalMethod.apply(this, args)
      profiler.end(key)

      return result
    }
    descriptor.value = newMethod
    return descriptor
  }
}

export const profileAsync = function (label?: string) {
  return function (_target: Object, methodName: unknown, descriptor: PropertyDescriptor) {
    const key = label ?? (methodName as string)
    if (typeof methodName !== 'string') {
      return
    }
    const originalMethod = descriptor.value
    const newMethod = async function (this: any, ...args: unknown[]) {
      const profiler = getProfiler()
      profiler.start(key)
      const result = await originalMethod.apply(this, args)
      profiler.end(key)

      return result
    }
    descriptor.value = newMethod
    return descriptor
  }
}
