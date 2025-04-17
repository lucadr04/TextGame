/* 
  This is the controller that manages the flow inside game/main
*/

import { useGameStore } from '../stores/gameStore.js'
import { useInventoryStore } from '../stores/inventoryStore.js'
import { useAttributesStore } from '../stores/attributesStore.js'
import { useSettingsStore } from '../stores/settingsStore.js'

import { useLayoutStore } from '../stores/layoutStore.js'

// Function that loads the game data inside the layout
export async function printScene() {
  const game = useGameStore()
  const layout = useLayoutStore()

  layout.emptyScene()

  // Scene initialization
  if (!game.checkScene()) {
    await game.reloadSceneData();
  }
  
  const currentStepData = game.getSceneData();

  layout.updateTextbox(currentStepData.text)
  /*layout.updateImagebox()*/
  /*layout.updateOst()*/

  // The choicebox is a complex one to handle, here is all the logic behind it
  // (maybe do a function just for that <3)
  const formattedOptions = formatOptions(currentStepData.options)
  
  layout.updateChoicebox(formattedOptions)
}

// Function that handles when a choicetext is selected
export async function handleChoicePress(action, target) {
  const game = useGameStore()

  // Jump for when the day and/or location changes
  if(action === "jump") {
    game.setCurrentDay(target[2])
    game.setCurrentLocation(target[1])
    game.setCurrentStep(target[0])
    await game.reloadSceneData()
    // apply music here
    await new Promise(resolve => setTimeout(resolve, 700))
  }
  // Jump for when only the step changes
  if(action === "default") {
    game.setCurrentStep(target[0])
    await game.reloadSceneData()
    // apply music here
    await new Promise(resolve => setTimeout(resolve, 300))
  }
  
  // Reload scene
  await printScene()
}

// Function that manages options in regards to attributes and inventory checks
function formatOptions(options) {
  return options
}