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

  function updateChoice(newChoices) {
    choices.value = newChoices
  }

  function updateImage(newImage) {
    image.value = newImage
  }

  return {
    textbox,
    choices,
    image,
    updateTextbox,
    updateChoice,
    updateImage
  }
})