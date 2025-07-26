import { useDrizzle, tables } from '../../utils/drizzle'
import { eq, sql } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const db = useDrizzle()
  const year = Number(getQuery(event).year) || new Date().getFullYear()

  // Debug: Alle Wochen ohne Filter loggen
  const _allWeeks = await db.select().from(tables.weeks).all()

  // Wochen für das Jahr inkl. Schülerin-Name und Schule (LIKE-Filter)
  const weeks = await db
    .select({
      id: tables.weeks.id,
      weekStartDate: tables.weeks.weekStartDate,
      status: tables.weeks.status,
      studentId: tables.weeks.studentId,
      studentName: tables.students.name,
      schoolName: tables.schools.name,
      notes: tables.weeks.notes,
    })
    .from(tables.weeks)
    .leftJoin(tables.students, eq(tables.weeks.studentId, tables.students.id))
    .leftJoin(tables.schools, eq(tables.students.schoolId, tables.schools.id))
    .where(sql`${tables.weeks.weekStartDate} LIKE ${year + '-%'}`)
    .orderBy(tables.weeks.weekStartDate)
    .all()

  return weeks
}) 