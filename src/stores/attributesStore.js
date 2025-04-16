import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useAttributesStore = defineStore('attributes', () => {
    const attributes = reactive({
      toughness: 2,
      resolve: 2,
      charisma: 2,
      hope: 2,
      luck: 2
    })
  
    function updateAttribute(attr, amount) {
      if (attributes[attr] !== undefined) {
        attributes[attr] += amount
      }
    }
  
    function checkAttribute(attr) {
      return attributes[attr]
    }
  
    return {
      attributes,
      updateAttribute,
      checkAttribute
    }
  })
  