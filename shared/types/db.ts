import type { schools, companies, students, weeks } from 'hub:db:schema'

// Export Drizzle inferred types
export type School = typeof schools.$inferSelect
export type Company = typeof companies.$inferSelect
export type Student = typeof students.$inferSelect
export type Week = typeof weeks.$inferSelect

// Also export input types for mutations
export type SchoolInsert = typeof schools.$inferInsert
export type CompanyInsert = typeof companies.$inferInsert
export type StudentInsert = typeof students.$inferInsert
export type WeekInsert = typeof weeks.$inferInsert