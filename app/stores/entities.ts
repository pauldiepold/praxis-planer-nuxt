import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useEntitiesStore = defineStore('entities', () => {
  // State
  const schools = ref<School[]>([])
  const students = ref<Student[]>([])
  const companies = ref<Company[]>([])
  const isLoading = ref({
    schools: false,
    students: false,
    companies: false,
  })
  const error = ref({
    schools: null as string | null,
    students: null as string | null,
    companies: null as string | null,
  })

  // Getters
  const schoolOptions = computed(() => schools.value.map(school => ({
    label: school.name,
    id: school.id,
  })))

  const studentOptions = computed(() => students.value.map(student => ({
    label: student.name,
    id: student.id,
    schoolId: student.schoolId,
    companyId: student.companyId,
  })))

  const companyOptions = computed(() => companies.value.map(company => ({
    label: company.name,
    id: company.id,
  })))

  const studentsWithDetails = computed(() => students.value.map((student) => {
    const school = schools.value.find(s => s.id === student.schoolId)
    const company = companies.value.find(c => c.id === student.companyId)
    return {
      ...student,
      schoolName: school?.name || null,
      companyName: company?.name || null,
    }
  }))

  const studentOptionsWithSchool = computed(() => students.value.map((student) => {
    const school = schools.value.find(s => s.id === student.schoolId)
    return {
      id: student.id,
      name: student.name,
      label: school ? `${student.name} - ${school.name}` : student.name,
      school: school?.name || null,
    }
  }))

  // Actions
  async function fetchSchools() {
    isLoading.value.schools = true
    error.value.schools = null
    try {
      schools.value = await $fetch<School[]>('/api/schools')
    }
    catch (err) {
      error.value.schools = 'Fehler beim Laden der Schulen'
      console.error('Fehler beim Laden der Schulen:', err)
    }
    finally {
      isLoading.value.schools = false
    }
  }

  async function fetchStudents() {
    isLoading.value.students = true
    error.value.students = null
    try {
      students.value = await $fetch<Student[]>('/api/students')
    }
    catch (err) {
      error.value.students = 'Fehler beim Laden der Schülerinnen'
      console.error('Fehler beim Laden der Schülerinnen:', err)
    }
    finally {
      isLoading.value.students = false
    }
  }

  async function fetchCompanies() {
    isLoading.value.companies = true
    error.value.companies = null
    try {
      companies.value = await $fetch<Company[]>('/api/companies')
    }
    catch (err) {
      error.value.companies = 'Fehler beim Laden der Betriebe'
      console.error('Fehler beim Laden der Betriebe:', err)
    }
    finally {
      isLoading.value.companies = false
    }
  }

  async function fetchAll() {
    await Promise.all([
      fetchSchools(),
      fetchStudents(),
      fetchCompanies(),
    ])
  }

  async function addSchool(schoolData: Omit<School, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const newSchool = await $fetch<School>('/api/schools', {
        method: 'POST',
        body: schoolData,
      })
      schools.value.push(newSchool)
      return newSchool
    }
    catch (err) {
      console.error('Fehler beim Hinzufügen der Schule:', err)
      throw err
    }
  }

  async function updateSchool(id: number, schoolData: Partial<School>) {
    try {
      const updatedSchool = await $fetch<School>(`/api/schools/${id}`, {
        method: 'PATCH',
        body: schoolData,
      })
      const index = schools.value.findIndex(s => s.id === id)
      if (index !== -1) {
        schools.value[index] = updatedSchool
      }
      return updatedSchool
    }
    catch (err) {
      console.error('Fehler beim Aktualisieren der Schule:', err)
      throw err
    }
  }

  async function deleteSchool(id: number) {
    try {
      await $fetch(`/api/schools/${id}`, {
        method: 'DELETE',
      })
      schools.value = schools.value.filter(s => s.id !== id)
    }
    catch (err) {
      console.error('Fehler beim Löschen der Schule:', err)
      throw err
    }
  }

  async function addStudent(studentData: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const newStudent = await $fetch<Student>('/api/students', {
        method: 'POST',
        body: studentData,
      })
      students.value.push(newStudent)
      return newStudent
    }
    catch (err) {
      console.error('Fehler beim Hinzufügen der Schülerin:', err)
      throw err
    }
  }

  async function updateStudent(id: number, studentData: Partial<Student>) {
    try {
      const updatedStudent = await $fetch<Student>(`/api/students/${id}`, {
        method: 'PATCH',
        body: studentData,
      })
      const index = students.value.findIndex(s => s.id === id)
      if (index !== -1) {
        students.value[index] = updatedStudent
      }
      return updatedStudent
    }
    catch (err) {
      console.error('Fehler beim Aktualisieren der Schülerin:', err)
      throw err
    }
  }

  async function deleteStudent(id: number) {
    try {
      await $fetch(`/api/students/${id}`, {
        method: 'DELETE',
      })
      students.value = students.value.filter(s => s.id !== id)
    }
    catch (err) {
      console.error('Fehler beim Löschen der Schülerin:', err)
      throw err
    }
  }

  async function addCompany(companyData: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const newCompany = await $fetch<Company>('/api/companies', {
        method: 'POST',
        body: companyData,
      })
      companies.value.push(newCompany)
      return newCompany
    }
    catch (err) {
      console.error('Fehler beim Hinzufügen des Betriebs:', err)
      throw err
    }
  }

  async function updateCompany(id: number, companyData: Partial<Company>) {
    try {
      const updatedCompany = await $fetch<Company>(`/api/companies/${id}`, {
        method: 'PATCH',
        body: companyData,
      })
      const index = companies.value.findIndex(c => c.id === id)
      if (index !== -1) {
        companies.value[index] = updatedCompany
      }
      return updatedCompany
    }
    catch (err) {
      console.error('Fehler beim Aktualisieren des Betriebs:', err)
      throw err
    }
  }

  async function deleteCompany(id: number) {
    try {
      await $fetch(`/api/companies/${id}`, {
        method: 'DELETE',
      })
      companies.value = companies.value.filter(c => c.id !== id)
    }
    catch (err) {
      console.error('Fehler beim Löschen des Betriebs:', err)
      throw err
    }
  }

  function reset() {
    schools.value = []
    students.value = []
    companies.value = []
    isLoading.value = {
      schools: false,
      students: false,
      companies: false,
    }
    error.value = {
      schools: null,
      students: null,
      companies: null,
    }
  }

  return {
    schools,
    students,
    companies,
    isLoading,
    error,
    schoolOptions,
    studentOptions,
    companyOptions,
    studentsWithDetails,
    studentOptionsWithSchool,
    fetchSchools,
    fetchStudents,
    fetchCompanies,
    fetchAll,
    addSchool,
    updateSchool,
    deleteSchool,
    addStudent,
    updateStudent,
    deleteStudent,
    addCompany,
    updateCompany,
    deleteCompany,
    reset,
  }
})
