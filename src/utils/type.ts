export { isBoolean, isNumber, isObject, isString, isFunction } from '@vueuse/core'

export const isUndefined = (val: any): val is undefined => val === undefined
