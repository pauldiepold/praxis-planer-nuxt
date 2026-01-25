import { eq, sql } from 'drizzle-orm'
import { db, schema } from 'hub:db'

export default eventHandler(async (event) => {
  const year = Number(getQuery(event).year) || new Date().getFullYear()

  // Wochen für das Jahr inkl. Schülerin-Name und Schule (LIKE-Filter)
  // schoolName: direkt zugeordnete Schule (bei 'reserved')
  // Bei 'booked' wird die Schule des Students im Frontend aus dem Store geholt
  const weeks = await db
    .select({
      id: schema.weeks.id,
      weekStartDate: schema.weeks.weekStartDate,
      status: schema.weeks.status,
      studentId: schema.weeks.studentId,
      studentName: schema.students.name,
      schoolId: schema.weeks.schoolId,
      schoolName: schema.schools.name,
      notes: schema.weeks.notes,
    })
    .from(schema.weeks)
    .leftJoin(schema.students, eq(schema.weeks.studentId, schema.students.id))
    .leftJoin(schema.schools, eq(schema.weeks.schoolId, schema.schools.id))
    .where(sql`${schema.weeks.weekStartDate} LIKE ${year + '-%'}`)
    .orderBy(schema.weeks.weekStartDate)
    .all()

  // Für 'booked' Wochen: Schule des Students nachladen
  const weeksWithStudentSchool = await Promise.all(weeks.map(async (week) => {
    if (week.status === 'booked' && week.studentId) {
      const studentWithSchool = await db
        .select({
          schoolName: schema.schools.name,
        })
        .from(schema.students)
        .leftJoin(schema.schools, eq(schema.students.schoolId, schema.schools.id))
        .where(eq(schema.students.id, week.studentId))
        .get()

      return {
        ...week,
        schoolName: studentWithSchool?.schoolName || null,
      }
    }
    return week
  }))

  return weeksWithStudentSchool
})
