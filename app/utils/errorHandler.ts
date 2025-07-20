interface ToastData {
  title: string
  description?: string
  color: 'error' | 'success' | 'warning' | 'info'
  icon: string
}

export function handleApiError(error: unknown, defaultMessage: string): ToastData[] {
  console.error('API Error:', error)
  
  if (error && typeof error === 'object' && 'data' in error && error.data && typeof error.data === 'object') {
    if ('errors' in error.data) {
      // Serverseitige Validierungsfehler
      const errors = error.data.errors as Array<{ field: string; message: string }>
      return errors.map(err => ({
        title: `Validierungsfehler: ${err.field}`,
        description: err.message,
        color: 'error' as const,
        icon: 'i-lucide-alert-circle'
      }))
    } else if ('message' in error.data) {
      // Allgemeine serverseitige Fehler
      return [{
        title: defaultMessage,
        description: String(error.data.message),
        color: 'error' as const,
        icon: 'i-lucide-alert-circle'
      }]
    }
  }
  
  // Unbekannte Fehler
  return [{
    title: defaultMessage,
    description: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
    color: 'error' as const,
    icon: 'i-lucide-alert-circle'
  }]
}
