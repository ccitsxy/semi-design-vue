import { type InjectionKey, type ComputedRef, ref, onMounted, onUnmounted } from 'vue'

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

export const isServer = typeof window === 'undefined'
/**
 * rowSizeHook
 * @returns
 */
export function useRowSize() {
  const size = ref(calcSize(isServer ? 0 : window.innerWidth))
  const updateSize = () => {
    size.value = calcSize(isServer ? 0 : window.innerWidth)
  }

  // useListener('resize', updateSize)
  onMounted(() => {
    addEventListener('resize', updateSize)
  })
  onUnmounted(() => {
    removeEventListener('resize', updateSize)
  })

  return size
}

/**
 *
 * @param gutter
 * @param currentSize
 * @returns
 */
export function calcRowStyle(gutter: Gutter | [Gutter, Gutter] | undefined, currentSize: string) {
  const rowStyle = {}
  const getMarginStyle = (gutter: number) =>
    Object.assign(rowStyle, {
      marginLeft: `${gutter / -2}px`,
      marginRight: `${gutter / -2}px`
    })

  const getRowGapStyle = (gutter: number) =>
    Object.assign(rowStyle, {
      rowGap: `${gutter}px`
    })

  const strategyMap = {
    isNumber: (gutter: number) => {
      if (typeof gutter === 'number') {
        getMarginStyle(gutter)
      }
    },
    isArray: (gutter: string | any[]) => {
      if (Array.isArray(gutter) && gutter.length) {
        strategyMap.isNumber(gutter[0])

        if (typeof gutter[1] === 'number') {
          getRowGapStyle(gutter[1])
        }

        if (typeof gutter[0] === 'object' && !(typeof gutter[0][currentSize] === 'undefined')) {
          getMarginStyle(gutter[0][currentSize])
        }

        if (typeof gutter[1] === 'object' && !(typeof gutter[1][currentSize] === 'undefined')) {
          getRowGapStyle(gutter[1][currentSize])
        }
      }
    },
    isObject: (gutter: { [x: string]: number }) => {
      if (typeof gutter === 'object' && gutter[currentSize]) {
        if (Array.isArray(gutter) && gutter.length) {
          // @ts-ignore
          getMarginStyle(gutter[currentSize][0])
          // @ts-ignore
          getRowGapStyle(gutter[currentSize][1])
        } else {
          getMarginStyle(gutter[currentSize])
        }
      }
    }
  }

  Object.keys(strategyMap).forEach((item) => {
    // @ts-ignore
    strategyMap[item](gutter)
  })

  return rowStyle
}

/**
 * 计算ColPadding
 * @param gutter
 * @param currentSize
 * @returns
 */
export function calcColPadding(gutter: any, currentSize: string) {
  const paddingObj = {}
  const getPaddingStyle = (gutter: number) =>
    Object.assign(paddingObj, {
      paddingLeft: `${gutter / 2}px`,
      paddingRight: `${gutter / 2}px`
    })

  const strategyMap = {
    isNumber: (gutter: number) => {
      if (typeof gutter === 'number') {
        getPaddingStyle(gutter)
      }
    },
    isArray: (gutter: string | any[]) => {
      if (Array.isArray(gutter) && gutter.length) {
        if (typeof gutter[0] === 'number') {
          getPaddingStyle(gutter[0])
        }
        if (typeof gutter[0] === 'object' && gutter[0][currentSize]) {
          getPaddingStyle(gutter[0][currentSize])
        }
      }
    },
    isObject: (gutter: { [x: string]: number }) => {
      if (typeof gutter === 'object' && gutter[currentSize]) {
        getPaddingStyle(gutter[currentSize])
      }
    }
  }

  Object.keys(strategyMap).forEach((item) => {
    // @ts-ignore
    strategyMap[item](gutter)
  })

  return paddingObj
}
