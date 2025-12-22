export function resetForm<T extends Record<string, unknown>>(form: T, defaultValues: Partial<T>) {
  Object.assign(form, defaultValues)
}
