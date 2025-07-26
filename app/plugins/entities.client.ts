export default defineNuxtPlugin(async () => {
  const entitiesStore = useEntitiesStore()
  
  // Lade alle Entitäten beim App-Start
  await entitiesStore.fetchAll()
}) 