export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
export const required = (v: string) => v?.trim().length > 0
export const minLength = (v: string, n: number) => (v || '').length >= n

export type FieldErrors<T> = Partial<Record<keyof T, string>>
