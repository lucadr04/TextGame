// src/utils/sfxcontroller.js
import { useSettingsStore } from '../stores/settingsStore.js'
import { ref } from 'vue'

const SfxController = (() => {
  let settings
  const typeInterval = ref(null)

  // 1sfx pool
  const SOUND_FILES = {
    txt3: '../sfx/txt3.wav'
  }
  const POOL_SIZE = 10
  const pools = {}

  // pre‐create HTMLAudioElements
  function init() {
    settings = useSettingsStore()
    Object.entries(SOUND_FILES).forEach(([key, url]) => {
      pools[key] = []
      for (let i = 0; i < POOL_SIZE; i++) {
        const a = new Audio(url)
        a.preload = 'auto'
        pools[key].push(a)
      }
    })
  }

  // Play a sound by key
  const indices = {} 
  function play(key) {
    console.log(key)
    const pool = pools[key]

    const idx = indices[key] = (indices[key] + 1) % POOL_SIZE || 0
    const audio = pool[idx]
    audio.currentTime = 0
    audio.volume = settings.getSfx()
    audio.play().catch(() => {/* ignore play errors */})
  }

  return { 
    init, 
    play,
    typeInterval
  }
})()

export default SfxController
