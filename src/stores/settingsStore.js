/*
  This is the settings store
  It keeps track of the player's settings and gives a way of manipulating them
*/

import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
    const volume = ref(0.8)
    const textSpeed = ref('normal')
    const isMuted = ref(false)
  
    function toggleMute() {
      isMuted.value = !isMuted.value
    }
  
    return {
      volume,
      textSpeed,
      isMuted,
      toggleMute
    }
  })
  