import { handleChoicePress } from '../logics/handleChoice.js'
import { handleItemPress } from '../controllers/inventoryController.js'
import { handleAttributePress } from '../controllers/attributesController.js'
import { handleSettingPress } from '../controllers/settingsController.js'

export async function handleAction(choice, route, layout) {
  const { action, target } = choice
  console.log(`Action triggered: ${action} with target: ${target} in `, route.name)
  console.log(`Full choice: `, choice)

  // Delegate handling to the right handler
  if (route.name === 'Main') {
    layout.emptyScene()
    handleChoicePress(choice)
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

export async function leftAction(choice, route, layout) {
  choice.action = choice.laction
  choice.target = choice.ltarget
  console.log(`Left action triggered: ${choice.action} with target:`, choice.target);
  console.log(`Full choice: `, choice)
  handleAction(choice, route, layout);
}

export async function rightAction(choice, route, layout) {
  choice.action = choice.raction
  choice.target = choice.rtarget
  console.log(`Right action triggered: ${choice.action} with target:`, choice.target);
  console.log(`Full choice: `, choice)
  handleAction(choice, route, layout);
}