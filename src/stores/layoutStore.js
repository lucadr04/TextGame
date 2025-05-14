/*
  This is the layout store
  It keeps track of what is displayed in the main layout and gives a way of manipulating it
*/

import { defineStore } from 'pinia'
import { ref } from 'vue'

// Funzione per modificare il contenuto del layout di gioco
export const useLayoutStore = defineStore('layout', () => {
  const textbox = ref('Loading...')
  const choices = ref([])
  const image = ref('path/to/image.png')
  const saveIcon = ref(false) 

  function updateTextbox(newText) {
    textbox.value = newText
  }

  function addToTextbox(newChar) {
    textbox.value += newChar
  }

  function updateChoicebox(newChoices) {
    choices.value = newChoices
  }

  function updateImagebox(newImage) {
    image.value = newImage
  }

  function emptyScene() {
    textbox.value = ''
    choices.value = ''
    image.value = ''
  }

  function triggerSaveIcon() {
    saveIcon.value = true
    setTimeout(() => {
      saveIcon.value = false
    }, 2000) // 1 second visible
  }

  return {
    textbox,
    choices,
    image,
    saveIcon,
    updateTextbox,
    addToTextbox,
    updateChoicebox,
    updateImagebox,
    emptyScene,
    triggerSaveIcon,
  }
})