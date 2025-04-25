/*
  This is the inventory store
  It keeps track of the player's items and gives a way of manipulating them
  Note. Items don't really have an ID... honestly, different items have different names soo...
*/

import { defineStore } from 'pinia'
import { ref, reactive, setDevtoolsHook } from 'vue'

export const useInventoryStore = defineStore('inventory', () => {
  const inventory = reactive({
    nutella: 1,
    tea: 1,
    bread: 1,
  })
  const descriptions = ref({})
  const currDescription = ref('')

  function addItem(item) {
    if (!inventory.value.includes(item)) {
      inventory.value.push(item)
    }
  }

  function removeItem(item) {
    const index = inventory.value.indexOf(item)
    if (index !== -1) {
      inventory.value.splice(index, 1)
    }
  }

  function checkItem(item) {
    return inventory.value.includes(item)
  }

  function getFormattedInventory() {
    return Object.entries(inventory).map(([text, meta]) => ({ text, meta, action:'default', target:text }))
  }

  function checkDesc() { 
    return !!descriptions.value && Object.keys(descriptions.value).length > 0;
  }

  async function loadDesc() {
    try {
      const module = await import(`../assets/inventory.json`)
      console.log('Loaded Inventory Data')
      descriptions.value = module.default
    } catch (error) {
      console.error('Failed to load scene data:', error)
    }
  }

  function getCurrDesc() {
    return currDescription.value
  }

  function loadCurrDesc(item) {
    currDescription.value = descriptions.value[item]
  }

  function save() {
    return { object: inventory }
  } 

  function load(saveState) {
    Object.assign(inventory, saveState.object)
  }

  return {
    inventory,
    addItem,
    removeItem,
    checkItem,
    getFormattedInventory,
    getCurrDesc,
    loadCurrDesc,
    checkDesc,
    loadDesc,
    save,
    load
  }
})
  