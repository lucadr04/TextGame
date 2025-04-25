/*
  This is the settings store
  It keeps track of the player's settings and gives a way of manipulating them
*/

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const sfxVolume = ref(80)
  const bgmVolume = ref(80)
  const textSpeed = ref(2)
  const mappedChoices = computed(() => [
    {text: 'bgm volume', meta: bgmVolume, lb: '-', laction: 'dec', ltarget: 'bgm', rb: '+', raction: 'inc', rtarget: 'bgm'},
    {text: 'sfx volume', meta: sfxVolume, lb: '-', laction: 'dec', ltarget: 'sfx', rb: '+', raction: 'inc', rtarget: 'sfx'},
    {text: 'text speed', meta: textSpeed, lb: '-', laction: 'dec', ltarget: 'ts', rb: '+', raction: 'inc', rtargxtet: 'ts'},
    {text: 'delete game data', meta: '', action: 'delete save'}
  ])

  function incSfx() {
    if(sfxVolume.value < 100)
      sfxVolume.value += 5
  }

  function decSfx() {
    if(sfxVolume.value > 0)
      sfxVolume.value -= 5
  }

  function incBgm() {
    if(bgmVolume.value < 100)
      bgmVolume.value += 5
  }

  function decBgm() {
    if(bgmVolume.value > 0)
      bgmVolume.value -= 5
  }

  function getSfx() {
    return sfxVolume.value / 100
  }

  function getBgm() {
    return bgmVolume.value / 100
  }

  function incTS() {
    if(textSpeed.value < 3)
      textSpeed.value += 1
  }

  function decTS() {
    if(textSpeed.value > 1)
      textSpeed.value -= 1
  }

  function getTS() {
    return (100 - (textSpeed.value * 25))
  }

  function save() {
    return { sfxVolume: sfxVolume.value, bgmVolume: bgmVolume.value, textSpeed: textSpeed.value }
  }

  function load(saveState) {
    sfxVolume.value = saveState.sfxVolume
    bgmVolume.value = saveState.bgmVolume
    textSpeed.value = saveState.textSpeed
  }

  return {
    mappedChoices,
    incBgm,
    incSfx,
    decBgm,
    decSfx,
    getBgm,
    getSfx,
    incTS,
    decTS,
    getTS,
    save,
    load
  }
})
  