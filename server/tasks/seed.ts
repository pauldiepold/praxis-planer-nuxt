import { db, schema } from 'hub:db'

export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Run database seed task for nursing planner'
  },
  async run() {
    console.log('Running DB seed task for nursing planner...')

    try {
      // First, let's check if tables exist
      console.log('Checking if tables exist...')

      // Try to select from tables to see if they exist
      try {
        await db.select().from(schema.schools).limit(1)
        console.log('Schools table exists')
      }
      catch (error) {
        console.error('Schools table does not exist or error:', error)
        throw new Error('Schools table not found. Please run migrations first.')
      }

      // Clear all tables first (in reverse order of dependencies)
      console.log('Clearing existing data from all tables...')
      
      try {
        // Clear weeks table first (depends on students)
        await db.delete(schema.weeks)
        console.log('Cleared weeks table')
      }
      catch {
        console.log('Weeks table was empty or does not exist')
      }

      try {
        // Clear students table (depends on schools and companies)
        await db.delete(schema.students)
        console.log('Cleared students table')
      }
      catch {
        console.log('Students table was empty or does not exist')
      }

      try {
        // Clear companies table
        await db.delete(schema.companies)
        console.log('Cleared companies table')
      }
      catch {
        console.log('Companies table was empty or does not exist')
      }

      try {
        // Clear schools table
        await db.delete(schema.schools)
        console.log('Cleared schools table')
      }
      catch {
        console.log('Schools table was empty or does not exist')
      }

      console.log('All tables cleared successfully')

      // Seed Schools (Pflegeschulen)
      const now = new Date()
      const schools = [
        {
          name: 'Berufsfachschule für Krankenpflege München',
          contactPerson: 'Frau Dr. Schmidt',
          phone: '089 12345678',
          email: 'info@krankenpflegeschule-muenchen.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Krankenpflegeschule am Klinikum Augsburg',
          contactPerson: 'Herr Müller',
          phone: '0821 98765432',
          email: 'kontakt@kps-augsburg.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Berufsfachschule für Gesundheits- und Krankenpflege Nürnberg',
          contactPerson: 'Frau Weber',
          phone: '0911 55556666',
          email: 'weber@kps-nuernberg.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Krankenpflegeschule der Caritas',
          contactPerson: 'Frau Fischer',
          phone: '089 87654321',
          email: 'fischer@caritas-kps.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Berufsfachschule für Krankenpflege am Rotkreuzklinikum',
          contactPerson: 'Herr Wagner',
          phone: '089 11112222',
          email: 'wagner@rk-kps.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Krankenpflegeschule der Diakonie',
          contactPerson: 'Frau Meyer',
          phone: '089 33334444',
          email: 'meyer@diakonie-kps.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Berufsfachschule für Gesundheits- und Kinderkrankenpflege',
          contactPerson: 'Frau Schulz',
          phone: '089 55556666',
          email: 'schulz@kinderkps.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Krankenpflegeschule am Universitätsklinikum',
          contactPerson: 'Dr. Hoffmann',
          phone: '089 77778888',
          email: 'hoffmann@uk-kps.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Berufsfachschule für Altenpflege München',
          contactPerson: 'Frau Klein',
          phone: '089 99990000',
          email: 'klein@altenpflege-muenchen.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Krankenpflegeschule der Barmherzigen Brüder',
          contactPerson: 'Herr Bauer',
          phone: '089 12345678',
          email: 'bauer@bb-kps.de',
          createdAt: now,
          updatedAt: now
        }
      ]

      console.log('Inserting schools...')
      const insertedSchools = await db.insert(schema.schools).values(schools).returning()
      console.log(`Successfully inserted ${insertedSchools.length} schools`)

      // Seed Companies (Betriebe)
      const companies = [
        {
          name: 'Kinderarztpraxis Dr. Müller & Kollegen',
          contactPerson: 'Dr. Anna Müller',
          phone: '089 12345678',
          email: 'info@kinderarzt-muenchen.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Praxis für Kinder- und Jugendmedizin Dr. Schmidt',
          contactPerson: 'Dr. Thomas Schmidt',
          phone: '089 87654321',
          email: 'schmidt@kinderarzt.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Kinderarztpraxis am Marienplatz',
          contactPerson: 'Dr. Maria Weber',
          phone: '089 11112222',
          email: 'weber@kinderarzt-marienplatz.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Praxis für Kinderheilkunde Dr. Fischer',
          contactPerson: 'Dr. Peter Fischer',
          phone: '089 33334444',
          email: 'fischer@kinderheilkunde.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Kinderarztpraxis Schwabing',
          contactPerson: 'Dr. Lisa Wagner',
          phone: '089 55556666',
          email: 'wagner@kinderarzt-schwabing.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Praxis für Kinder- und Jugendmedizin am Englischen Garten',
          contactPerson: 'Dr. Michael Meyer',
          phone: '089 77778888',
          email: 'meyer@kinderarzt-englischer-garten.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Kinderarztpraxis Dr. Schulz',
          contactPerson: 'Dr. Sarah Schulz',
          phone: '089 99990000',
          email: 'schulz@kinderarzt.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Praxis für Kinderheilkunde in Haidhausen',
          contactPerson: 'Dr. Andreas Hoffmann',
          phone: '089 12345678',
          email: 'hoffmann@kinderarzt-haidhausen.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Kinderarztpraxis Dr. Klein',
          contactPerson: 'Dr. Julia Klein',
          phone: '089 87654321',
          email: 'klein@kinderarzt.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Praxis für Kinder- und Jugendmedizin am Viktualienmarkt',
          contactPerson: 'Dr. Christian Bauer',
          phone: '089 11112222',
          email: 'bauer@kinderarzt-viktualienmarkt.de',
          createdAt: now,
          updatedAt: now
        }
      ]

      console.log('Inserting companies...')
      const insertedCompanies = await db.insert(schema.companies).values(companies).returning()
      console.log(`Successfully inserted ${insertedCompanies.length} companies`)

      // Seed Students (Schülerinnen) with references to schools and companies
      const students = [
        {
          name: 'Anna Schmidt',
          schoolId: insertedSchools[0].id,
          companyId: insertedCompanies[0].id,
          phone: '0170 1234567',
          email: 'anna.schmidt@email.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Lisa Müller',
          schoolId: insertedSchools[1].id,
          companyId: insertedCompanies[1].id,
          phone: '0170 2345678',
          email: 'lisa.mueller@email.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Sarah Weber',
          schoolId: insertedSchools[2].id,
          companyId: insertedCompanies[2].id,
          phone: '0170 3456789',
          email: 'sarah.weber@email.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Maria Fischer',
          schoolId: insertedSchools[3].id,
          companyId: insertedCompanies[3].id,
          phone: '0170 4567890',
          email: 'maria.fischer@email.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Julia Wagner',
          schoolId: insertedSchools[4].id,
          companyId: insertedCompanies[4].id,
          phone: '0170 5678901',
          email: 'julia.wagner@email.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Nina Meyer',
          schoolId: insertedSchools[5].id,
          companyId: insertedCompanies[5].id,
          phone: '0170 6789012',
          email: 'nina.meyer@email.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Sophie Schulz',
          schoolId: insertedSchools[6].id,
          companyId: insertedCompanies[6].id,
          phone: '0170 7890123',
          email: 'sophie.schulz@email.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Laura Hoffmann',
          schoolId: insertedSchools[7].id,
          companyId: insertedCompanies[7].id,
          phone: '0170 8901234',
          email: 'laura.hoffmann@email.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Emma Klein',
          schoolId: insertedSchools[8].id,
          companyId: insertedCompanies[8].id,
          phone: '0170 9012345',
          email: 'emma.klein@email.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Lea Bauer',
          schoolId: insertedSchools[9].id,
          companyId: insertedCompanies[9].id,
          phone: '0170 0123456',
          email: 'lea.bauer@email.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Hannah Schmidt',
          schoolId: insertedSchools[0].id,
          companyId: insertedCompanies[1].id,
          phone: '0170 1234568',
          email: 'hannah.schmidt@email.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Mia Müller',
          schoolId: insertedSchools[1].id,
          companyId: insertedCompanies[2].id,
          phone: '0170 2345679',
          email: 'mia.mueller@email.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Lena Weber',
          schoolId: insertedSchools[2].id,
          companyId: insertedCompanies[3].id,
          phone: '0170 3456780',
          email: 'lena.weber@email.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Clara Fischer',
          schoolId: insertedSchools[3].id,
          companyId: insertedCompanies[4].id,
          phone: '0170 4567891',
          email: 'clara.fischer@email.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Ella Wagner',
          schoolId: insertedSchools[4].id,
          companyId: insertedCompanies[5].id,
          phone: '0170 5678902',
          email: 'ella.wagner@email.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Maya Meyer',
          schoolId: insertedSchools[5].id,
          companyId: insertedCompanies[6].id,
          phone: '0170 6789013',
          email: 'maya.meyer@email.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Zoe Schulz',
          schoolId: insertedSchools[6].id,
          companyId: insertedCompanies[7].id,
          phone: '0170 7890124',
          email: 'zoe.schulz@email.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Luna Hoffmann',
          schoolId: insertedSchools[7].id,
          companyId: insertedCompanies[8].id,
          phone: '0170 8901235',
          email: 'luna.hoffmann@email.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Ava Klein',
          schoolId: insertedSchools[8].id,
          companyId: insertedCompanies[9].id,
          phone: '0170 9012346',
          email: 'ava.klein@email.de',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Isabella Bauer',
          schoolId: insertedSchools[9].id,
          companyId: insertedCompanies[0].id,
          phone: '0170 0123457',
          email: 'isabella.bauer@email.de',
          createdAt: now,
          updatedAt: now
        }
      ]

      console.log('Inserting students...')

      // Insert students one by one to identify the problem
      const insertedStudents = []
      for (let i = 0; i < students.length; i++) {
        try {
          console.log(`Inserting student ${i + 1}/${students.length}: ${students[i].name}`)
          const student = await db.insert(schema.students).values(students[i]).returning().get()
          insertedStudents.push(student)
          console.log(`Successfully inserted: ${student.name}`)
        }
        catch (error) {
          console.error(`Failed to insert student ${students[i].name}:`, error)
          console.error('Student data:', students[i])
          throw error
        }
      }

      console.log(`Successfully inserted ${insertedStudents.length} students`)

      // Nach dem Anlegen der anderen Entitäten: Wochen anlegen

      return {
        result: 'success',
        summary: {
          schools: insertedSchools.length,
          companies: insertedCompanies.length,
          students: insertedStudents.length
        }
      }
    }
    catch (error) {
      console.error('Seeding failed:', error)
      throw error
    }
  }
})
