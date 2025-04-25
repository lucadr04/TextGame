/*
  This is the layout store
  It keeps track of what is displayed in the main layout and gives a way of manipulating it
*/

import { defineStore } from 'pinia'
import { ref } from 'vue'

// Funzione per modificare il contenuto del layout di gioco
export const useLayoutStore = defineStore('layout', () => {
  const textbox = ref('Initial text in the textbox')
  const choices = ref([
    { text: 'Choice 1', meta: 'Meta 1' },
    { text: 'Choice 2', meta: 'Meta 2' },
  ])
  const image = ref('path/to/image.png') 

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

  return {
    textbox,
    choices,
    image,
    updateTextbox,
    addToTextbox,
    updateChoicebox,
    updateImagebox,
    emptyScene,
  }
})