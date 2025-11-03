import { handleChoicePress } from '../controllers/gameController.js'
import { handleItemPress } from '../controllers/inventoryController.js'
import { handleAttributePress } from '../controllers/attributesController.js'
import { handleSettingPress } from '../controllers/settingsController.js'

export async function handleAction(action, target, route, layout) {
  console.log(`Action triggered: ${action} with target: ${target} in `, route.name)

  // Delegate handling to the right handler
  if (route.name === 'Main') {
    layout.emptyScene()
    handleChoicePress(action, target)
  }
  else if (route.name === 'Inventory') {
    handleItemPress(action, target)
  }
  else if (route.name === 'Attributes') {
    handleAttributePress(action, target)
  }
  else if (route.name === 'Settings') {
    handleSettingPress(action, target)
  } else {
    console.error('Unknown route or action')
  }
}

export async function leftAction(action, target, route, layout) {
  console.log(`Left action triggered: ${action} with target:`, target);
  handleAction(action, target, route, layout);
}

export async function rightAction(action, target, route, layout) {
  console.log(`Right action triggered: ${action} with target:`, target);
  handleAction(action, target, route, layout);
}