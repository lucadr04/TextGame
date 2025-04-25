/*
  This is the game store
  It controls the position inside the game and gives a way to manipulate them
  It also saves the content of the current step
  Here save states will be implemented
*/

import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useGameStore = defineStore('game', () => {
  const sceneData = ref({})
  const currentDay = ref('day1')
  const currentLocation = ref('base')
  const currentStep = ref('step1')
  const flags = reactive({})
  let nickname = 'Hacker'

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

  function getNick() {
    return nickname
  }

  function setNick(newNick) {
    nickname = newNick
  }
  // debug
  function logCurrent() {
    console.log(`day: ${currentDay.value}, location: ${currentLocation.value}, step ${currentStep.value}`)
  }

  function save() {
    return { 
      currentDay: currentDay.value, 
      currentLocation: currentLocation.value, 
      currentStep: currentStep.value,
      nickname: nickname 
    };
  }

  function load(saveState) {
    currentDay.value = saveState.currentDay
    currentLocation.value = saveState.currentLocation
    currentStep.value = saveState.currentStep
    nickname = saveState.nickname
    console.log(nickname)
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
    logCurrent,
    getNick,
    setNick,
    save,
    load
  }
})