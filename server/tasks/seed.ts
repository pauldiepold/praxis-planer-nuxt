import { db, schema } from 'hub:db'

export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Run database seed task for nursing planner',
  },
  async run() {
    console.log('Running DB seed task for nursing planner...')

    try {
      console.log('Clearing existing data...')
      // Reihenfolge beachten wegen Foreign Key Constraints
      try {
        await db.delete(schema.weeks)
      }
      catch { console.log('Weeks table empty') }
      try {
        await db.delete(schema.students)
      }
      catch { console.log('Students table empty') }
      try {
        await db.delete(schema.companies)
      }
      catch { console.log('Companies table empty') }
      try {
        await db.delete(schema.schools)
      }
      catch { console.log('Schools table empty') }

      const now = new Date()

      // 1. Schools
      const schools = [
        { name: 'Berufsfachschule für Krankenpflege München', contactPerson: 'Frau Dr. Schmidt', phone: '089 12345678', email: 'info@krankenpflegeschule-muenchen.de', createdAt: now, updatedAt: now },
        { name: 'Krankenpflegeschule am Klinikum Augsburg', contactPerson: 'Herr Müller', phone: '0821 98765432', email: 'kontakt@kps-augsburg.de', createdAt: now, updatedAt: now },
        { name: 'Berufsfachschule für Gesundheits- und Krankenpflege Nürnberg', contactPerson: 'Frau Weber', phone: '0911 55556666', email: 'weber@kps-nuernberg.de', createdAt: now, updatedAt: now },
        { name: 'Krankenpflegeschule der Caritas', contactPerson: 'Frau Fischer', phone: '089 87654321', email: 'fischer@caritas-kps.de', createdAt: now, updatedAt: now },
        { name: 'Berufsfachschule für Krankenpflege am Rotkreuzklinikum', contactPerson: 'Herr Wagner', phone: '089 11112222', email: 'wagner@rk-kps.de', createdAt: now, updatedAt: now },
        { name: 'Krankenpflegeschule der Diakonie', contactPerson: 'Frau Meyer', phone: '089 33334444', email: 'meyer@diakonie-kps.de', createdAt: now, updatedAt: now },
        { name: 'Berufsfachschule für Gesundheits- und Kinderkrankenpflege', contactPerson: 'Frau Schulz', phone: '089 55556666', email: 'schulz@kinderkps.de', createdAt: now, updatedAt: now },
        { name: 'Krankenpflegeschule am Universitätsklinikum', contactPerson: 'Dr. Hoffmann', phone: '089 77778888', email: 'hoffmann@uk-kps.de', createdAt: now, updatedAt: now },
        { name: 'Berufsfachschule für Altenpflege München', contactPerson: 'Frau Klein', phone: '089 99990000', email: 'klein@altenpflege-muenchen.de', createdAt: now, updatedAt: now },
        { name: 'Krankenpflegeschule der Barmherzigen Brüder', contactPerson: 'Herr Bauer', phone: '089 12345678', email: 'bauer@bb-kps.de', createdAt: now, updatedAt: now },
      ]

      const insertedSchools = await db.insert(schema.schools).values(schools).returning()

      // 2. Companies
      const companies = [
        { name: 'Kinderarztpraxis Dr. Müller & Kollegen', contactPerson: 'Dr. Anna Müller', phone: '089 12345678', email: 'info@kinderarzt-muenchen.de', createdAt: now, updatedAt: now },
        { name: 'Praxis für Kinder- und Jugendmedizin Dr. Schmidt', contactPerson: 'Dr. Thomas Schmidt', phone: '089 87654321', email: 'schmidt@kinderarzt.de', createdAt: now, updatedAt: now },
        { name: 'Kinderarztpraxis am Marienplatz', contactPerson: 'Dr. Maria Weber', phone: '089 11112222', email: 'weber@kinderarzt-marienplatz.de', createdAt: now, updatedAt: now },
        { name: 'Praxis für Kinderheilkunde Dr. Fischer', contactPerson: 'Dr. Peter Fischer', phone: '089 33334444', email: 'fischer@kinderheilkunde.de', createdAt: now, updatedAt: now },
        { name: 'Kinderarztpraxis Schwabing', contactPerson: 'Dr. Lisa Wagner', phone: '089 55556666', email: 'wagner@kinderarzt-schwabing.de', createdAt: now, updatedAt: now },
        { name: 'Praxis für Kinder- und Jugendmedizin am Englischen Garten', contactPerson: 'Dr. Michael Meyer', phone: '089 77778888', email: 'meyer@kinderarzt-englischer-garten.de', createdAt: now, updatedAt: now },
        { name: 'Kinderarztpraxis Dr. Schulz', contactPerson: 'Dr. Sarah Schulz', phone: '089 99990000', email: 'schulz@kinderarzt.de', createdAt: now, updatedAt: now },
        { name: 'Praxis für Kinderheilkunde in Haidhausen', contactPerson: 'Dr. Andreas Hoffmann', phone: '089 12345678', email: 'hoffmann@kinderarzt-haidhausen.de', createdAt: now, updatedAt: now },
        { name: 'Kinderarztpraxis Dr. Klein', contactPerson: 'Dr. Julia Klein', phone: '089 87654321', email: 'klein@kinderarzt.de', createdAt: now, updatedAt: now },
        { name: 'Praxis für Kinder- und Jugendmedizin am Viktualienmarkt', contactPerson: 'Dr. Christian Bauer', phone: '089 11112222', email: 'bauer@kinderarzt-viktualienmarkt.de', createdAt: now, updatedAt: now },
      ]

      const insertedCompanies = await db.insert(schema.companies).values(companies).returning()

      // Sicherheitscheck für TypeScript & Runtime
      if (insertedSchools.length === 0 || insertedCompanies.length === 0) {
        throw new Error('Schools or Companies could not be inserted.')
      }

      // Helper für sichere ID-Zuweisung
      const getSchoolId = (idx: number) => insertedSchools[idx % insertedSchools.length]!.id
      const getCompanyId = (idx: number) => insertedCompanies[idx % insertedCompanies.length]!.id

      // 3. Students
      const studentsData = [
        { name: 'Anna Schmidt', schoolId: getSchoolId(0), companyId: getCompanyId(0), phone: '0170 1234567', email: 'anna.schmidt@email.de', createdAt: now, updatedAt: now },
        { name: 'Lisa Müller', schoolId: getSchoolId(1), companyId: getCompanyId(1), phone: '0170 2345678', email: 'lisa.mueller@email.de', createdAt: now, updatedAt: now },
        { name: 'Sarah Weber', schoolId: getSchoolId(2), companyId: getCompanyId(2), phone: '0170 3456789', email: 'sarah.weber@email.de', createdAt: now, updatedAt: now },
        { name: 'Maria Fischer', schoolId: getSchoolId(3), companyId: getCompanyId(3), phone: '0170 4567890', email: 'maria.fischer@email.de', createdAt: now, updatedAt: now },
        { name: 'Julia Wagner', schoolId: getSchoolId(4), companyId: getCompanyId(4), phone: '0170 5678901', email: 'julia.wagner@email.de', createdAt: now, updatedAt: now },
        { name: 'Nina Meyer', schoolId: getSchoolId(5), companyId: getCompanyId(5), phone: '0170 6789012', email: 'nina.meyer@email.de', createdAt: now, updatedAt: now },
        { name: 'Sophie Schulz', schoolId: getSchoolId(6), companyId: getCompanyId(6), phone: '0170 7890123', email: 'sophie.schulz@email.de', createdAt: now, updatedAt: now },
        { name: 'Laura Hoffmann', schoolId: getSchoolId(7), companyId: getCompanyId(7), phone: '0170 8901234', email: 'laura.hoffmann@email.de', createdAt: now, updatedAt: now },
        { name: 'Emma Klein', schoolId: getSchoolId(8), companyId: getCompanyId(8), phone: '0170 9012345', email: 'emma.klein@email.de', createdAt: now, updatedAt: now },
        { name: 'Lea Bauer', schoolId: getSchoolId(9), companyId: getCompanyId(9), phone: '0170 0123456', email: 'lea.bauer@email.de', createdAt: now, updatedAt: now },
        { name: 'Hannah Schmidt', schoolId: getSchoolId(0), companyId: getCompanyId(1), phone: '0170 1234568', email: 'hannah.schmidt@email.de', createdAt: now, updatedAt: now },
        { name: 'Mia Müller', schoolId: getSchoolId(1), companyId: getCompanyId(2), phone: '0170 2345679', email: 'mia.mueller@email.de', createdAt: now, updatedAt: now },
        { name: 'Lena Weber', schoolId: getSchoolId(2), companyId: getCompanyId(3), phone: '0170 3456780', email: 'lena.weber@email.de', createdAt: now, updatedAt: now },
        { name: 'Clara Fischer', schoolId: getSchoolId(3), companyId: getCompanyId(4), phone: '0170 4567891', email: 'clara.fischer@email.de', createdAt: now, updatedAt: now },
        { name: 'Ella Wagner', schoolId: getSchoolId(4), companyId: getCompanyId(5), phone: '0170 5678902', email: 'ella.wagner@email.de', createdAt: now, updatedAt: now },
        { name: 'Maya Meyer', schoolId: getSchoolId(5), companyId: getCompanyId(6), phone: '0170 6789013', email: 'maya.meyer@email.de', createdAt: now, updatedAt: now },
        { name: 'Zoe Schulz', schoolId: getSchoolId(6), companyId: getCompanyId(7), phone: '0170 7890124', email: 'zoe.schulz@email.de', createdAt: now, updatedAt: now },
        { name: 'Luna Hoffmann', schoolId: getSchoolId(7), companyId: getCompanyId(8), phone: '0170 8901235', email: 'luna.hoffmann@email.de', createdAt: now, updatedAt: now },
        { name: 'Ava Klein', schoolId: getSchoolId(8), companyId: getCompanyId(9), phone: '0170 9012346', email: 'ava.klein@email.de', createdAt: now, updatedAt: now },
        { name: 'Isabella Bauer', schoolId: getSchoolId(9), companyId: getCompanyId(0), phone: '0170 0123457', email: 'isabella.bauer@email.de', createdAt: now, updatedAt: now },
      ]

      console.log('Inserting students one by one...')
      const insertedStudents = []
      for (const sData of studentsData) {
        const student = await db.insert(schema.students).values(sData).returning().get()
        if (student) {
          insertedStudents.push(student)
          console.log(`Inserted: ${student.name}`)
        }
      }

      console.log('Seed finished successfully')

      return {
        result: 'success',
        summary: {
          schools: insertedSchools.length,
          companies: insertedCompanies.length,
          students: insertedStudents.length,
        },
      }
    }
    catch (error) {
      console.error('Seeding failed:', error)
      throw error
    }
  },
})
