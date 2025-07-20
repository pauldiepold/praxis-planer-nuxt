export function formatGermanDate(date: string | Date | null | undefined): string {
  if (!date) return '-'
  
  return new Date(date).toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
} 
