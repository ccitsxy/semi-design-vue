import type { CSSProperties } from 'vue'
import { isString, isNumber } from '@/utils'

export type Align = 'start' | 'center' | 'end' | 'baseline'
export type Spacing = 'loose' | 'medium' | 'tight' | number

export const calSpacingStyleAndClass = (spacing: Spacing | Spacing[]) => {
  const spacingStyle: CSSProperties = {}

  let spacingHorizontalType = ''
  let spacingVerticalType = ''

  if (isString(spacing)) {
    spacingHorizontalType = spacing
    spacingVerticalType = spacing
  } else if (isNumber(spacing)) {
    spacingStyle.rowGap = `${spacing}px`
    spacingStyle.columnGap = `${spacing}px`
  } else if (Array.isArray(spacing)) {
    if (isString(spacing[0])) {
      spacingHorizontalType = spacing[0]
    } else if (isNumber(spacing[0])) {
      spacingStyle.columnGap = `${spacing[0]}px`
    }
    if (isString(spacing[1])) {
      spacingVerticalType = spacing[1]
    } else if (isNumber(spacing[1])) {
      spacingStyle.rowGap = `${spacing[1]}px`
    }
  }

  const spacingClass = [
    spacingHorizontalType === 'tight' ? 'semi-space-tight-horizontal' : '',
    spacingVerticalType === 'tight' ? 'semi-space-tight-vertical' : '',
    spacingHorizontalType === 'medium' ? 'semi-space-medium-horizontal' : '',
    spacingVerticalType === 'medium' ? 'semi-space-medium-vertical' : '',
    spacingHorizontalType === 'loose' ? 'semi-space-loose-horizontal' : '',
    spacingVerticalType === 'loose' ? 'semi-space-loose-vertical' : ''
  ]

  return {
    spacingStyle,
    spacingClass
  }
}
