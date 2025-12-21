export const useEntities = () => {
  const store = useEntitiesStore()

  // Computed properties für bessere Performance
  const schools = computed(() => store.schools)
  const students = computed(() => store.students)
  const companies = computed(() => store.companies)
  
  const isLoading = computed(() => store.isLoading)
  const error = computed(() => store.error)

  // Select-Optionen
  const schoolOptions = computed(() => store.schoolOptions)
  const studentOptions = computed(() => store.studentOptions)
  const companyOptions = computed(() => store.companyOptions)
  const studentOptionsWithSchool = computed(() => store.studentOptionsWithSchool)

  // Schülerinnen mit Details
  const studentsWithDetails = computed(() => store.studentsWithDetails)

  // Hilfsfunktionen
  const getSchoolById = (id: number | null) => {
    if (!id) return null
    return schools.value.find(s => s.id === id)
  }

  const getStudentById = (id: number | null) => {
    if (!id) return null
    return students.value.find(s => s.id === id)
  }

  const getCompanyById = (id: number | null) => {
    if (!id) return null
    return companies.value.find(c => c.id === id)
  }

  const getSchoolName = (id: number | null) => {
    const school = getSchoolById(id)
    return school?.name || null
  }

  const getStudentName = (id: number | null) => {
    const student = getStudentById(id)
    return student?.name || null
  }

  const getCompanyName = (id: number | null) => {
    const company = getCompanyById(id)
    return company?.name || null
  }

  // CRUD-Operationen
  const addSchool = async (schoolData: Omit<School, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await store.addSchool(schoolData)
  }

  const updateSchool = async (id: number, schoolData: Partial<School>) => {
    return await store.updateSchool(id, schoolData)
  }

  const deleteSchool = async (id: number) => {
    return await store.deleteSchool(id)
  }

  const addStudent = async (studentData: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await store.addStudent(studentData)
  }

  const updateStudent = async (id: number, studentData: Partial<Student>) => {
    return await store.updateStudent(id, studentData)
  }

  const deleteStudent = async (id: number) => {
    return await store.deleteStudent(id)
  }

  const addCompany = async (companyData: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await store.addCompany(companyData)
  }

  const updateCompany = async (id: number, companyData: Partial<Company>) => {
    return await store.updateCompany(id, companyData)
  }

  const deleteCompany = async (id: number) => {
    return await store.deleteCompany(id)
  }

  // Laden der Daten
  const fetchAll = async () => {
    return await store.fetchAll()
  }

  const fetchSchools = async () => {
    return await store.fetchSchools()
  }

  const fetchStudents = async () => {
    return await store.fetchStudents()
  }

  const fetchCompanies = async () => {
    return await store.fetchCompanies()
  }

  // Store zurücksetzen
  const reset = () => {
    store.reset()
  }

  return {
    // Store-Referenz
    store,
    
    // Daten
    schools,
    students,
    companies,
    isLoading,
    error,
    
    // Optionen
    schoolOptions,
    studentOptions,
    companyOptions,
    studentOptionsWithSchool,
    studentsWithDetails,
    
    // Hilfsfunktionen
    getSchoolById,
    getStudentById,
    getCompanyById,
    getSchoolName,
    getStudentName,
    getCompanyName,
    
    // CRUD-Operationen
    addSchool,
    updateSchool,
    deleteSchool,
    addStudent,
    updateStudent,
    deleteStudent,
    addCompany,
    updateCompany,
    deleteCompany,
    
    // Laden
    fetchAll,
    fetchSchools,
    fetchStudents,
    fetchCompanies,
    
    // Reset
    reset
  }
} 