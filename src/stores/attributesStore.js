/*
  This is the attributes store
  It keeps track of the player's attributes and gives a way of manipulating them
*/

import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'

export const useAttributesStore = defineStore('attributes', () => {
    const MAX = 10
    const attributes = reactive({
      sanity: 2,
      toughness: 2,
      resolve: 2,
      charisma: 2,
      hope: 2,
      luck: 2
    })
    const descriptions = ref({})
    const currDescription = ref('')

    function getcreationAttributes() {
      return computed(() => {
        return Object.entries(attributes).map(([key, value]) => ({
          text: key,
          get meta() {
            return attributes[key]
          },
          action: 'default',
          target: key,
          lb: '-',
          laction: 'dec',
          ltarget: key,
          rb: '+',
          raction: 'inc',
          rtarget: key
        }))
      })
    }
  
    function increaseAttribute(attr, amount) {
      if (attributes[attr] !== undefined) {
        attributes[attr] += amount
      }
    }
  
    function checkAttribute(attr) {
      return attributes[attr]
    }

    function getFormattedAttributes() {
      return Object.entries(attributes).map(([text, meta]) => ({ text, meta, action:'default', target:text }))
    }

    function checkDesc() { 
      return !!descriptions.value && Object.keys(descriptions.value).length > 0;
    }

    async function loadDesc() {
      try {
        const module = await import(`../assets/attributes.json`)
        console.log('Loaded Attributes Data')
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
      return { object: attributes }
    } 

    function load(saveState) {
      Object.assign(attributes, saveState.object)
    }
  
    return {
      getcreationAttributes,
      increaseAttribute,
      checkAttribute,
      getFormattedAttributes,
      getCurrDesc,
      loadCurrDesc,
      checkDesc,
      loadDesc,
      save,
      load
    }
  })
  