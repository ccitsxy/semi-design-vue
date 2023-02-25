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

export function useRowSize() {
  const size = ref(calcSize(typeof window === 'undefined' ? 0 : window.innerWidth))
  const updateSize = () => {
    size.value = calcSize(typeof window === 'undefined' ? 0 : window.innerWidth)
  }
  onMounted(() => {
    addEventListener('resize', updateSize)
  })
  onUnmounted(() => {
    removeEventListener('resize', updateSize)
  })

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
      if (typeof gutter === 'number') {
        getPaddingXStyle(gutter)
      }
    },
    isArray: (gutter: string | any[]) => {
      if (Array.isArray(gutter) && gutter.length) {
        strategyMap.isNumber(gutter[0])

        if (typeof gutter[1] === 'number') {
          getPaddingYStyle(gutter[1])
        }

        if (typeof gutter[0] === 'object' && !(typeof gutter[0][currentSize] === 'undefined')) {
          getPaddingXStyle(gutter[0][currentSize])
        }

        if (typeof gutter[1] === 'object' && !(typeof gutter[1][currentSize] === 'undefined')) {
          getPaddingYStyle(gutter[1][currentSize])
        }
      }
    },
    isObject: (gutter: string | any[]) => {
      if (typeof gutter === 'object' && gutter[currentSize]) {
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
    if (typeof e === 'number') {
      classes.push(`semi-col-${size}-${e}`)
    } else if (typeof e === 'object') {
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
      if (typeof gutter === 'number') {
        getPaddingXStyle(gutter)
      }
    },
    isArray: (gutter: string | any[]) => {
      if (Array.isArray(gutter) && gutter.length) {
        strategyMap.isNumber(gutter[0])

        if (typeof gutter[1] === 'number') {
          getPaddingYStyle(gutter[1])
        }

        if (typeof gutter[0] === 'object' && !(typeof gutter[0][currentSize] === 'undefined')) {
          getPaddingXStyle(gutter[0][currentSize])
        }

        if (typeof gutter[1] === 'object' && !(typeof gutter[1][currentSize] === 'undefined')) {
          getPaddingYStyle(gutter[1][currentSize])
        }
      }
    },
    isObject: (gutter: string | any[]) => {
      if (typeof gutter === 'object' && gutter[currentSize]) {
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
