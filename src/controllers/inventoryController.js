/* 
  This is the controller that manages the flow inside game/inventory
  To implement is a way to use some items. 
  Maybe when you are at loss of sanity or HP, you drink a potion and boom
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