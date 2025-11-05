import { useGameStore } from '../stores/gameStore.js'
import { useInventoryStore } from '../stores/inventoryStore.js'
import { useAttributesStore } from '../stores/attributesStore.js'
import SaveController from '../controllers/saveController.js'
import { printScene } from '../controllers/gameController.js'

export async function handleChoicePress(choice) {
  const game = useGameStore()
  let wait = 300

  console.log(`Handling choice: `, choice)
  const { action, target, effects } = choice

  if (effects) {
    if (effects.edititem) {
      const inventory = useInventoryStore()
      for (const item of effects.edititem) {
        if (item.remove) {
          inventory.removeItem(item.item, item.quantity)
        } else {
          inventory.addItem(item.item, item.quantity)
        }
      }
    }
    if (effects.editattribute) {
      const attributes = useAttributesStore()
      for (const attr of effects.editattribute) {
        if (attr.remove) {
          attributes.modifyAttribute(attr.attribute, -attr.quantity)
        } else {
          attributes.modifyAttribute(attr.attribute, attr.quantity)
        }
      }
    }
    if (effects.editflags) {
      for (const flag of effects.editflags) {
        game.setFlag(flag, value)
      }
    }
  }

  // Handle navigation
  if(action === "jump") {
    game.setCurrentDay(target[2])
    game.setCurrentLocation(target[1])
    game.setCurrentStep(target[0])
    wait = 800
  } else if(action === "default") {
    game.setCurrentStep(target[0])
  }

  // Save game state
  SaveController.save()

  await game.reloadSceneData()
  await new Promise(resolve => setTimeout(resolve, wait))

  // Reload scene
  await printScene()
}