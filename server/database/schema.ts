import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const schools = sqliteTable('schools', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  contactPerson: text('contact_person'),
  phone: text('phone'),
  email: text('email'),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull()
})

export const companies = sqliteTable('companies', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  contactPerson: text('contact_person'),
  phone: text('phone'),
  email: text('email'),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull()
})

export const students = sqliteTable('students', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  schoolId: integer('school_id').references(() => schools.id),
  companyId: integer('company_id').references(() => companies.id),
  phone: text('phone'),
  email: text('email'),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull()
})

export const weeks = sqliteTable('weeks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  weekStartDate: integer('week_start_date', { mode: 'timestamp' }).notNull(),
  status: text('status', { enum: ['free', 'booked', 'vacation'] }).notNull().default('free'),
  studentId: integer('student_id').references(() => students.id),
  notes: text('notes'),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull()
})
