export const useEntitiesStore = defineStore('entities', {
  state: () => ({
    schools: [] as School[],
    students: [] as Student[],
    companies: [] as Company[],
    isLoading: {
      schools: false,
      students: false,
      companies: false
    },
    error: {
      schools: null as string | null,
      students: null as string | null,
      companies: null as string | null
    }
  }),

  getters: {
    // Schulen als Select-Optionen
    schoolOptions: (state) => state.schools.map(school => ({
      label: school.name,
      id: school.id
    })),

    // Schülerinnen als Select-Optionen
    studentOptions: (state) => state.students.map(student => ({
      label: student.name,
      id: student.id,
      schoolId: student.schoolId,
      companyId: student.companyId
    })),

    // Betriebe als Select-Optionen
    companyOptions: (state) => state.companies.map(company => ({
      label: company.name,
      id: company.id
    })),

    // Schülerinnen mit Schul- und Betriebsinformationen
    studentsWithDetails: (state) => state.students.map(student => {
      const school = state.schools.find(s => s.id === student.schoolId)
      const company = state.companies.find(c => c.id === student.companyId)
      return {
        ...student,
        schoolName: school?.name || null,
        companyName: company?.name || null
      }
    }),

    // Schülerinnen-Optionen mit Schulinformationen für Dropdowns
    studentOptionsWithSchool: (state) => state.students.map(student => {
      const school = state.schools.find(s => s.id === student.schoolId)
      return {
        id: student.id,
        name: student.name,
        label: school ? `${student.name} - ${school.name}` : student.name,
        school: school?.name || null
      }
    })
  },

  actions: {
    // Schulen laden
    async fetchSchools() {
      this.isLoading.schools = true
      this.error.schools = null
      try {
        this.schools = await $fetch('/api/schools')
      } catch (error) {
        this.error.schools = 'Fehler beim Laden der Schulen'
        console.error('Fehler beim Laden der Schulen:', error)
      } finally {
        this.isLoading.schools = false
      }
    },

    // Schülerinnen laden
    async fetchStudents() {
      this.isLoading.students = true
      this.error.students = null
      try {
        this.students = await $fetch('/api/students')
      } catch (error) {
        this.error.students = 'Fehler beim Laden der Schülerinnen'
        console.error('Fehler beim Laden der Schülerinnen:', error)
      } finally {
        this.isLoading.students = false
      }
    },

    // Betriebe laden
    async fetchCompanies() {
      this.isLoading.companies = true
      this.error.companies = null
      try {
        this.companies = await $fetch('/api/companies')
      } catch (error) {
        this.error.companies = 'Fehler beim Laden der Betriebe'
        console.error('Fehler beim Laden der Betriebe:', error)
      } finally {
        this.isLoading.companies = false
      }
    },

    // Alle Entitäten laden
    async fetchAll() {
      await Promise.all([
        this.fetchSchools(),
        this.fetchStudents(),
        this.fetchCompanies()
      ])
    },

    // Schule hinzufügen
    async addSchool(schoolData: Omit<School, 'id' | 'createdAt' | 'updatedAt'>) {
      try {
        const newSchool = await $fetch('/api/schools', {
          method: 'POST',
          body: schoolData
        })
        this.schools.push(newSchool)
        return newSchool
      } catch (error) {
        console.error('Fehler beim Hinzufügen der Schule:', error)
        throw error
      }
    },

    // Schule aktualisieren
    async updateSchool(id: number, schoolData: Partial<School>) {
      try {
        const updatedSchool = await $fetch(`/api/schools/${id}`, {
          method: 'PATCH',
          body: schoolData
        })
        const index = this.schools.findIndex(s => s.id === id)
        if (index !== -1) {
          this.schools[index] = updatedSchool
        }
        return updatedSchool
      } catch (error) {
        console.error('Fehler beim Aktualisieren der Schule:', error)
        throw error
      }
    },

    // Schule löschen
    async deleteSchool(id: number) {
      try {
        await $fetch(`/api/schools/${id}`, {
          method: 'DELETE'
        })
        this.schools = this.schools.filter(s => s.id !== id)
      } catch (error) {
        console.error('Fehler beim Löschen der Schule:', error)
        throw error
      }
    },

    // Schülerin hinzufügen
    async addStudent(studentData: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) {
      try {
        const newStudent = await $fetch('/api/students', {
          method: 'POST',
          body: studentData
        })
        this.students.push(newStudent)
        return newStudent
      } catch (error) {
        console.error('Fehler beim Hinzufügen der Schülerin:', error)
        throw error
      }
    },

    // Schülerin aktualisieren
    async updateStudent(id: number, studentData: Partial<Student>) {
      try {
        const updatedStudent = await $fetch(`/api/students/${id}`, {
          method: 'PATCH',
          body: studentData
        })
        const index = this.students.findIndex(s => s.id === id)
        if (index !== -1) {
          this.students[index] = updatedStudent
        }
        return updatedStudent
      } catch (error) {
        console.error('Fehler beim Aktualisieren der Schülerin:', error)
        throw error
      }
    },

    // Schülerin löschen
    async deleteStudent(id: number) {
      try {
        await $fetch(`/api/students/${id}`, {
          method: 'DELETE'
        })
        this.students = this.students.filter(s => s.id !== id)
      } catch (error) {
        console.error('Fehler beim Löschen der Schülerin:', error)
        throw error
      }
    },

    // Betrieb hinzufügen
    async addCompany(companyData: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) {
      try {
        const newCompany = await $fetch('/api/companies', {
          method: 'POST',
          body: companyData
        })
        this.companies.push(newCompany)
        return newCompany
      } catch (error) {
        console.error('Fehler beim Hinzufügen des Betriebs:', error)
        throw error
      }
    },

    // Betrieb aktualisieren
    async updateCompany(id: number, companyData: Partial<Company>) {
      try {
        const updatedCompany = await $fetch(`/api/companies/${id}`, {
          method: 'PATCH',
          body: companyData
        })
        const index = this.companies.findIndex(c => c.id === id)
        if (index !== -1) {
          this.companies[index] = updatedCompany
        }
        return updatedCompany
      } catch (error) {
        console.error('Fehler beim Aktualisieren des Betriebs:', error)
        throw error
      }
    },

    // Betrieb löschen
    async deleteCompany(id: number) {
      try {
        await $fetch(`/api/companies/${id}`, {
          method: 'DELETE'
        })
        this.companies = this.companies.filter(c => c.id !== id)
      } catch (error) {
        console.error('Fehler beim Löschen des Betriebs:', error)
        throw error
      }
    },

    // Store zurücksetzen
    reset() {
      this.schools = []
      this.students = []
      this.companies = []
      this.isLoading = {
        schools: false,
        students: false,
        companies: false
      }
      this.error = {
        schools: null,
        students: null,
        companies: null
      }
    }
  }
}) 