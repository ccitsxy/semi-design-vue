import type { ComputedRef, InjectionKey } from 'vue'

export type HtmlType = 'button' | 'reset' | 'submit'
export type Size = 'default' | 'small' | 'large'
export type Theme = 'solid' | 'borderless' | 'light'
export type Type = 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger'

interface buttonGroupContext {
  disabled: ComputedRef<boolean>
  size: ComputedRef<Size>
  type: ComputedRef<Type>
}

export const buttonGroupContextKey = Symbol() as InjectionKey<buttonGroupContext>
