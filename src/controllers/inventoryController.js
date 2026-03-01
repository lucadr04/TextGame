/* 
  This is the controller that manages the flow inside game/inventory
  Todo: Implement a way to use items from the inventory
*/

import { useInventoryStore } from '../stores/inventoryStore.js'
import { useLayoutStore } from '../stores/layoutStore.js'

export async function printScene() {
  const inventory = useInventoryStore()
  const layout = useLayoutStore()

  if (!inventory.checkDesc()) {
    await inventory.loadDesc();
  }

  layout.emptyScene()

  // Scene initialization  
  layout.updateChoicebox(inventory.getFormattedInventory())
  layout.updateTextbox('')
}

export async function handleItemPress(action, target) {
  const inventory = useInventoryStore()
  const layout = useLayoutStore()
  if(action == "default") {
    inventory.loadCurrDesc(target)
    layout.updateTextbox(inventory.getCurrDesc())
  }
}