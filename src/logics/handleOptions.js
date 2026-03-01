import { useGameStore } from '../stores/gameStore.js'
import { useInventoryStore } from '../stores/inventoryStore.js'
import { useAttributesStore } from '../stores/attributesStore.js'

import { useLayoutStore } from '../stores/layoutStore.js'

// Function that manages options in regards to attributes and inventory checks
export function handleOptions(options) {
  const layout = useLayoutStore()
  console.log("available options:", options)
  const filteredOptions = filterOptions(options)
  layout.updateChoicebox(filteredOptions)
}

// Function that formats options based on requirements
function filterOptions(options) {
  const attributes = useAttributesStore()
  const inventory = useInventoryStore()
  const game = useGameStore()

  return options.filter(option => {
    // Check attributes
    if (option.attributes) {
      for (const req of option.attributes) {
        const playerValue = attributes.checkAttribute(req.attribute)

        if (req.type === '>=' && playerValue < req.value) return false
        if (req.type === '<' && playerValue >= req.value) return false
      }
    }

    // Check items
    if (option.items) {
      for (const itemReq of option.items) {
        const playerItemCount = inventory.checkItem(itemReq.item) 

        if (itemReq.remove === true && playerItemCount < itemReq.quantity) return false
        if (itemReq.remove === false && playerItemCount >= itemReq.quantity) return false
      }
    }

    // Check flags
    if (option.flags) {
      for (const flagReq of option.flags) {
        const currentFlagValue = game.checkFlag(flagReq.flag)
        if (currentFlagValue !== flagReq.value) return false
      }
    }

    // If all conditions passed
    return true
  })
}