// controllers/SaveController.js
import { ref } from 'vue'
const SAVE_KEY = 'myGameSaveYay'
const SETTINGS_SAVE_KEY = 'myGameSettingsYay'

import { useGameStore } from '../stores/gameStore'
import { useSettingsStore } from '../stores/settingsStore'
import { useInventoryStore } from '../stores/inventoryStore'
import { useAttributesStore } from '../stores/attributesStore'
import { useLayoutStore } from '../stores/layoutStore'

const SaveController = {
  save() {
    const gameState = getData()
    const layout = useLayoutStore()
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(gameState))
      console.log('✅ Game saved.')
      layout.triggerSaveIcon()
    } catch (e) {
      console.error('❌ Error saving game:', e)
    }
  },

  load() {
    try {
      const data = localStorage.getItem(SAVE_KEY)
      if (!data) {
        console.warn('⚠️ No saved data found.')
        return null
      }
      setData(JSON.parse(data))
    } catch (e) {
      console.error('❌ Error loading game:', e)
      return null
    }
  },

  delete() {
    try {
      localStorage.removeItem(SAVE_KEY)
      console.log('🗑️ Save deleted.')
    } catch (e) {
      console.error('❌ Error deleting save:', e)
    }
  }
}

const settingsSaveController = {
  save() {
    const settings = useSettingsStore()
    const settingsState = settings.save();
    try {
      localStorage.setItem(SETTINGS_SAVE_KEY, JSON.stringify(settingsState))
      console.log('✅ Settings saved.')
    } catch (e) {
      console.error('❌ Error saving settings:', e)
    }
  },

  load() {
    const settings = useSettingsStore()
    try {
      const data = localStorage.getItem(SETTINGS_SAVE_KEY)
      if (!data) {
        console.warn('⚠️ No saved settings found.')
        return null
      }
      settings.load(JSON.parse(data))
    } catch (e) {
      console.error('❌ Error loading settings:', e)
      return null
    }
  },
}

function getData() {
  const game = useGameStore()
  const inventory = useInventoryStore()
  const attributes = useAttributesStore()

  const saveData = {
    game: game.save(),
    inventory: inventory.save(),
    attributes: attributes.save()
  }

  return saveData
}

function setData(saveState) {
  console.log(saveState)
  const game = useGameStore()
  const inventory = useInventoryStore()
  const attributes = useAttributesStore()

  game.load(saveState.game)
  inventory.load(saveState.inventory)
  attributes.load(saveState.attributes)
  settingsSaveController.load()
}

export default SaveController
export { settingsSaveController }