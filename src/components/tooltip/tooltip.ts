export type HTMLElementTagNameKey = keyof HTMLElementTagNameMap

export interface MarginObject {
  marginLeft: number
  marginTop: number
  marginRight: number
  marginBottom: number
}

export const xPlacement = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  'top-start': 'topLeft',
  'bottom-start': 'bottomLeft',
  'left-start': 'leftTop',
  'right-start': 'rightTop',
  'top-end': 'topRight',
  'bottom-end': 'bottomRight',
  'left-end': 'leftBottom',
  'right-end': 'rightBottom'
}

export const Position = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  topLeft: 'top-start',
  bottomLeft: 'bottom-start',
  leftTop: 'left-start',
  rightTop: 'right-start',
  topRight: 'top-end',
  bottomRight: 'bottom-end',
  leftBottom: 'left-end',
  rightBottom: 'right-end'
}
