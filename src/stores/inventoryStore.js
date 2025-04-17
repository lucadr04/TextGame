/*
  This is the inventory store
  It keeps track of the player's items and gives a way of manipulating them
*/

import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useInventoryStore = defineStore('inventory', () => {
    const inventory = ref([])
  
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
  
    return {
      inventory,
      addItem,
      removeItem,
      checkItem
    }
  })
  