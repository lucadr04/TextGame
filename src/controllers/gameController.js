/* 
  This is the controller that manages the flow inside game/main
*/

import { useGameStore } from '../stores/gameStore.js'
import { useInventoryStore } from '../stores/inventoryStore.js'
import { useAttributesStore } from '../stores/attributesStore.js'
import { useSettingsStore } from '../stores/settingsStore.js'

import { useLayoutStore } from '../stores/layoutStore.js'

import SaveController from '../controllers/saveController.js'
import { textPrint } from '../controllers/printerController.js'

// Function that loads the game data inside the layout
export async function printScene() {
  const game = useGameStore()
  const layout = useLayoutStore()
  const settings = useSettingsStore()
  
  layout.emptyScene()

  // Scene initialization
  if (!game.checkScene()) {
    await game.reloadSceneData();
  }
  
  const currentStepData = game.getSceneData();

  /*layout.updateImagebox()*/
  /*layout.updateOst()*/

  // Fancy text printing
  const fullText = currentStepData.text
  const speed = settings.getTS()
  textPrint(fullText, speed)

  // The choicebox is a complex one to handle, here is all the logic behind it
  // (maybe do a function just for that <3)
  const formattedOptions = formatOptions(currentStepData.options)
  
  layout.updateChoicebox(formattedOptions)
}

// Fuif(i%2 == 0) nction that handles when a choicetext is selected
export async function handleChoicePress(action, target) {
  const game = useGameStore()

  // Chapter jump
  if(action === "jump") {
    game.setCurrentDay(target[2])
    game.setCurrentLocation(target[1])
    game.setCurrentStep(target[0])
    SaveController.save()
    await game.reloadSceneData()
    // apply music here
    await new Promise(resolve => setTimeout(resolve, 700))
  }
  // Step jump
  if(action === "default") {
    game.setCurrentStep(target[0])
    await game.reloadSceneData()
    /* apply music here */
    await new Promise(resolve => setTimeout(resolve, 300))
  }

  // Reload scene
  await printScene()
}

// Function that manages options in regards to attributes and inventory checks
function formatOptions(options) {
  return options
}