import { useGameStore } from '../stores/gameStore.js'
import { useInventoryStore } from '../stores/inventoryStore.js'
import { useAttributesStore } from '../stores/attributesStore.js'
import { useSettingsStore } from '../stores/settingsStore.js'

import { useLayoutStore } from '../stores/layoutStore.js'

import SfxController from '../controllers/sfxController.js'
import SaveController from '../controllers/saveController.js'

// Function that manages options in regards to attributes and inventory checks
export function handleOptions(options) {
  const formattedOptions = formatOptions(options)
  layout.updateChoicebox(formattedOptions)
}

// Function that formats options based on requirements
function formatOptions(options) {
  return options
}

/*
import { useGameStore } from '../stores/gameStore.js'
import { useInventoryStore } from '../stores/inventoryStore.js'
import { useAttributesStore } from '../stores/attributesStore.js'
import { useSettingsStore } from '../stores/settingsStore.js'
import { useLayoutStore } from '../stores/layoutStore.js'

import SfxController from '../controllers/sfxController.js'
import SaveController from '../controllers/saveController.js'

// Function that manages options in regards to attributes and inventory checks
export function handleChoices(options, layout) {
  const formattedOptions = formatOptions(options)
  layout.updateChoicebox(formattedOptions)
}

// Function that formats options based on requirements
function formatOptions(options) {
  const inventory = useInventoryStore()
  const attributes = useAttributesStore()
  const game = useGameStore()
  
  return options.filter(option => {
    // Check requirements
    if (option.requires) {
      if (option.requires.item && !inventory.hasItem(option.requires.item)) {
        return false
      }
      if (option.requires.attribute) {
        const [attrName, minValue] = option.requires.attribute
        if (attributes.getAttribute(attrName) < minValue) {
          return false
        }
      }
      if (option.requires.flag && !game.checkFlag(option.requires.flag)) {
        return false
      }
    }
    return true
  }).map(option => ({
    ...option,
    disabled: option.requires && !checkRequirements(option.requires), // For visual disabled state
    tooltip: getRequirementTooltip(option.requires) // Show why option is unavailable
  }))
}

function checkRequirements(requires) {
  const inventory = useInventoryStore()
  const attributes = useAttributesStore()
  const game = useGameStore()
  
  if (requires.item && !inventory.hasItem(requires.item)) return false
  if (requires.attribute) {
    const [attrName, minValue] = requires.attribute
    if (attributes.getAttribute(attrName) < minValue) return false
  }
  if (requires.flag && !game.checkFlag(requires.flag)) return false
  return true
}

function getRequirementTooltip(requires) {
  if (!requires) return ''
  
  const tooltips = []
  const inventory = useInventoryStore()
  const attributes = useAttributesStore()
  
  if (requires.item && !inventory.hasItem(requires.item)) {
    tooltips.push(`Requires: ${requires.item}`)
  }
  if (requires.attribute) {
    const [attrName, minValue] = requires.attribute
    const currentValue = attributes.getAttribute(attrName)
    if (currentValue < minValue) {
      tooltips.push(`Requires ${attrName} ≥ ${minValue} (current: ${currentValue})`)
    }
  }
  return tooltips.join(', ')
}
*/