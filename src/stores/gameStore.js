import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useGameStore = defineStore('game', () => {
  const sceneData = ref({})
  const currentDay = ref('day1')
  const currentLocation = ref('base')
  const currentStep = ref('step1')
  const flags = reactive({})

  // Funzione per caricare il json corretto
  async function reloadSceneData() {
    try {
      const module = await import(`../chapters/${currentDay.value}/${currentLocation.value}.json`)
      console.log('Loaded Scene Data')
      sceneData.value = module.default
    } catch (error) {
      console.error('Failed to load scene data:', error)
    }
  }

  // Funzione per ottenere i dati della scena
  function getSceneData() {
    const stepData = sceneData.value[currentStep.value]
    if (!stepData) {
      console.error(`No data found for step: ${currentStep.value}`) 
      return null 
    }
    return stepData 
  }

  // Funzione che controlla se la scena sia vuota (serve la prima volta che si accede)
  function checkScene() { 
    return !!sceneData.value && Object.keys(sceneData.value).length > 0;
  }

  // Funzioni che cambiano le variabili di gioco
  function setCurrentDay(day) {
    currentDay.value = day
  }
  function setCurrentLocation(location) {
    currentLocation.value = location
  }
  function setCurrentStep(step) {
    currentStep.value = step
  }

  function setFlag(name, value = true) {
    flags[name] = value
  }

  function checkFlag(name) {
    return !!flags[name]
  }

  return {
    reloadSceneData,
    getSceneData,
    setFlag,
    checkFlag,
    checkScene,
    setCurrentDay,
    setCurrentLocation,
    setCurrentStep,
  }
})