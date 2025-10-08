export const isEmail = (v: string) => /\S+@\S+\.\S+/.test(v)
export const required = (v: string) => v?.trim().length > 0
export const minLength = (v: string, n: number) => (v || '').length >= n

export type FieldErrors<T> = Partial<Record<keyof T, string>>
