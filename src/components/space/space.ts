import type { CSSProperties } from 'vue'

export type Align = 'start' | 'center' | 'end' | 'baseline'
export type Spacing = 'loose' | 'medium' | 'tight' | number

export const calSpacingStyleAndClass = (spacing: Spacing | Spacing[]) => {
  const spacingStyle: CSSProperties = {}

  let spacingHorizontalType = ''
  let spacingVerticalType = ''

  if (typeof spacing === 'string') {
    spacingHorizontalType = spacing
    spacingVerticalType = spacing
  } else if (typeof spacing === 'number') {
    spacingStyle.rowGap = `${spacing}px`
    spacingStyle.columnGap = `${spacing}px`
  } else if (Array.isArray(spacing)) {
    if (typeof spacing[0] === 'string') {
      spacingHorizontalType = spacing[0]
    } else if (typeof spacing[0] === 'number') {
      spacingStyle.columnGap = `${spacing[0]}px`
    }
    if (typeof spacing[1] === 'string') {
      spacingVerticalType = spacing[1]
    } else if (typeof spacing[1] === 'number') {
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
