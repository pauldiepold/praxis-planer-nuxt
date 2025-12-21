import { eq, sql } from 'drizzle-orm'
import { db, schema } from 'hub:db'

export default eventHandler(async (event) => {
  const year = Number(getQuery(event).year) || new Date().getFullYear()

  // Wochen für das Jahr inkl. Schülerin-Name und Schule (LIKE-Filter)
  return await db
    .select({
      id: schema.weeks.id,
      weekStartDate: schema.weeks.weekStartDate,
      status: schema.weeks.status,
      studentId: schema.weeks.studentId,
      studentName: schema.students.name,
      schoolName: schema.schools.name,
      notes: schema.weeks.notes,
    })
    .from(schema.weeks)
    .leftJoin(schema.students, eq(schema.weeks.studentId, schema.students.id))
    .leftJoin(schema.schools, eq(schema.students.schoolId, schema.schools.id))
    .where(sql`${schema.weeks.weekStartDate} LIKE ${year + '-%'}`)
    .orderBy(schema.weeks.weekStartDate)
    .all()
}) 