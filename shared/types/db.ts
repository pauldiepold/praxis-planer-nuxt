import type { schema } from 'hub:db'

// Export Drizzle inferred types
export type School = typeof schema.schools.$inferSelect
export type Company = typeof schema.companies.$inferSelect
export type Student = typeof schema.students.$inferSelect
export type Week = typeof schema.weeks.$inferSelect

// Also export input types for mutations
export type SchoolInsert = typeof schema.schools.$inferInsert
export type CompanyInsert = typeof schema.companies.$inferInsert
export type StudentInsert = typeof schema.students.$inferInsert
export type WeekInsert = typeof schema.weeks.$inferInsert
