/*
    Here is the game state, and every method to edit it

*/

import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useGameStore = defineStore('game', () => {
  const currentScene = ref('start')
  const currentDay = ref('day1')
  const attributes = reactive({
    toughness: 2,
    resolve: 2, 
    charisma: 2,
    hope: 2,
    luck: 2
  })
  const inventory = ref([]) 
  const flags = reactive({})

  const companions = reactive([])

  class Companion {
    constructor(data) {
      this.name = data.name
      this.description = data.description
      this.friendship = data.friendship
    }
  }

  function addItem(item) {
    if (!inventory.value.includes(item)) {
      inventory.value.push(item)
    }
  }

  function checkItem(item) {
    if (inventory.value.includes(item)) {
      return true;
    }
    return false;
  }

  function removeItem(item) {
    const index = inventory.value.indexOf(item)
    if (index !== -1) {
        inventory.value.splice(index, 1)
    }
  }

  function setFlag(flagName, value = true) {
    flags[flagName] = value
  }

  function checkFlag(flagName) {
    return !!flags[flagName]
  }

  function checkAttribute(attr) {
    return attributes[attr]
  }

  function updateAttribute(attr, amount) {
    if (attributes[attr] !== undefined) {
      attributes[attr] += amount
    }
  }

  return {
    currentScene,
    currentDay,
    attributes,
    inventory,
    flags,
    companions,
    addItem,
    checkItem,
    removeItem,
    setFlag,
    checkFlag,
    checkAttribute,
    updateAttribute
  }
})
