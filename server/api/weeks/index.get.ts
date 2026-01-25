import { eq, sql } from 'drizzle-orm'
import { db, schema } from 'hub:db'

export default eventHandler(async (event) => {
  const year = Number(getQuery(event).year) || new Date().getFullYear()

  // Wochen für das Jahr inkl. Schülerin-Name, Schule und Betrieb (LIKE-Filter)
  return await db
    .select({
      id: schema.weeks.id,
      weekStartDate: schema.weeks.weekStartDate,
      status: schema.weeks.status,
      studentId: schema.weeks.studentId,
      studentName: schema.students.name,
      schoolName: schema.schools.name,
      companyId: schema.weeks.companyId,
      companyName: schema.companies.name,
      notes: schema.weeks.notes,
    })
    .from(schema.weeks)
    .leftJoin(schema.students, eq(schema.weeks.studentId, schema.students.id))
    .leftJoin(schema.schools, eq(schema.students.schoolId, schema.schools.id))
    .leftJoin(schema.companies, eq(schema.weeks.companyId, schema.companies.id))
    .where(sql`${schema.weeks.weekStartDate} LIKE ${year + '-%'}`)
    .orderBy(schema.weeks.weekStartDate)
    .all()
})
