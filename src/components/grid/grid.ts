import type { InjectionKey, ComputedRef } from 'vue'
import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import { isNumber, isObject, isClient, isUndefined } from '@/utils'

export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'

export type Gutter = number | Partial<Record<Breakpoint, number>>

export type ColSizeObject = {
  span?: number
  order?: number
  offset?: number
  push?: number
  pull?: number
}

export type ColSize = number | ColSizeObject

interface rowContext {
  gutter: ComputedRef<Gutter | [Gutter, Gutter]>
}

export const rowContextKey = Symbol() as InjectionKey<rowContext>

export const calcSize = (width: number) => {
  let size = 'xs'
  if (width < 575) {
    size = 'xs'
  } else if (width >= 576 && width < 768) {
    size = 'sm'
  } else if (width >= 768 && width < 992) {
    size = 'md'
  } else if (width >= 992 && width < 1200) {
    size = 'lg'
  } else if (width >= 1200 && width < 1600) {
    size = 'xl'
  } else if (width >= 1600) {
    size = 'xxl'
  }
  return size
}

export function useRowSize() {
  const size = ref(calcSize(isClient ? window.innerWidth : 0))
  const updateSize = () => {
    size.value = calcSize(isClient ? window.innerWidth : 0)
  }
  useEventListener('resize', updateSize)
  return size
}

export function calcRowStyle(gutter: Gutter | [Gutter, Gutter] | undefined, currentSize: string) {
  const rowStyle = {}
  const getPaddingXStyle = (gutter: number) =>
    Object.assign(rowStyle, {
      paddingLeft: `${gutter / -2}px`,
      paddingRight: `${gutter / -2}px`
    })

  const getPaddingYStyle = (gutter: number) =>
    Object.assign(rowStyle, {
      paddingTop: `${gutter / -2}px`,
      paddingBottom: `${gutter / -2}px`
    })

  const strategyMap = {
    isNumber: (gutter: number) => {
      if (isNumber(gutter)) {
        getPaddingXStyle(gutter)
      }
    },
    isArray: (gutter: string | any[]) => {
      if (Array.isArray(gutter) && gutter.length) {
        strategyMap.isNumber(gutter[0])

        if (isNumber(gutter[1])) {
          getPaddingYStyle(gutter[1])
        }

        if (isObject(gutter[0]) && !isUndefined(gutter[0][currentSize])) {
          getPaddingXStyle(gutter[0][currentSize])
        }

        if (isObject(gutter[1]) && !isUndefined(gutter[1][currentSize])) {
          getPaddingYStyle(gutter[1][currentSize])
        }
      }
    },
    isObject: (gutter: string | any[]) => {
      if (isObject(gutter) && gutter[currentSize]) {
        if (Array.isArray(gutter) && gutter.length) {
          getPaddingXStyle(gutter[currentSize][0])
          getPaddingYStyle(gutter[currentSize][1])
        } else {
          getPaddingXStyle(gutter[currentSize])
        }
      }
    }
  }

  Object.keys(strategyMap).forEach((item) => {
    strategyMap[item](gutter)
  })

  return rowStyle
}

export const calColSizeClass = (sizesVal: (ColSize | undefined)[]) => {
  const classes: string[] = []

  const sizes = ['xxl', 'xl', 'lg', 'sm', 'xs']

  sizesVal.forEach((e) => {
    const size = sizes[sizesVal.indexOf(e)]
    if (isNumber(e)) {
      classes.push(`semi-col-${size}-${e}`)
    } else if (isObject(e)) {
      classes.push(
        e.span ? `semi-col-${size}-${e.span}` : '',
        e.order ? `semi-col-${size}-order-${e.order}` : '',
        e.offset ? `semi-col-${size}-offset-${e.offset}` : '',
        e.push ? `semi-col-${size}-push-${e.push}` : '',
        e.pull ? `semi-col-${size}-pull-${e.pull}` : ''
      )
    }
  })

  return classes
}

export function calcColStyle(gutter: Gutter | [Gutter, Gutter] | undefined, currentSize: string) {
  const colStyle = {}
  const getPaddingXStyle = (gutter: number) =>
    Object.assign(colStyle, {
      paddingLeft: `${gutter / 2}px`,
      paddingRight: `${gutter / 2}px`
    })

  const getPaddingYStyle = (gutter: number) =>
    Object.assign(colStyle, {
      paddingTop: `${gutter / 2}px`,
      paddingBottom: `${gutter / 2}px`
    })

  const strategyMap = {
    isNumber: (gutter: number) => {
      if (isNumber(gutter)) {
        getPaddingXStyle(gutter)
      }
    },
    isArray: (gutter: string | any[]) => {
      if (Array.isArray(gutter) && gutter.length) {
        strategyMap.isNumber(gutter[0])

        if (isNumber(gutter[1])) {
          getPaddingYStyle(gutter[1])
        }

        if (isObject(gutter[0]) && !isUndefined(gutter[0][currentSize])) {
          getPaddingXStyle(gutter[0][currentSize])
        }

        if (isObject(gutter[1]) && !isUndefined(gutter[1][currentSize])) {
          getPaddingYStyle(gutter[1][currentSize])
        }
      }
    },
    isObject: (gutter: string | any[]) => {
      if (isObject(gutter) && gutter[currentSize]) {
        if (Array.isArray(gutter) && gutter.length) {
          getPaddingXStyle(gutter[currentSize][0])
          getPaddingYStyle(gutter[currentSize][1])
        } else {
          getPaddingXStyle(gutter[currentSize])
        }
      }
    }
  }

  Object.keys(strategyMap).forEach((item) => {
    strategyMap[item](gutter)
  })

  return colStyle
}
