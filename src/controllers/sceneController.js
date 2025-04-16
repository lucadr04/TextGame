/* 
  Here is the controller that manages the flow inside game/main
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
  const { checkScene, reloadSceneData, getSceneData } = game

  // Scene initialization
  if (!checkScene()) {
    await reloadSceneData();
  }
  
  const currentStepData = getSceneData();

  layout.updateTextbox(currentStepData.text)
  /*layout.updateImagebox()*/
  /*layout.updateOst()*/

  // The choicebox is a complex one to handle, here is all the logic behind it
  // (maybe do a function just for that <3)
  const formattedOptions = formatOptions(currentStepData.options)
  
  layout.updateChoice(formattedOptions)
}

// Function that handles when a choicetext is selected
export function handleChoicePress(action, target) {
  const { setCurrentDay } = game
  if(action === "jump") {

  }
  /*updateGameStore()*/
  /*reloadSceneData()*/
  /*printScene()*/
}

// Function that manages options
// Especially in regards to attributes and inventory checks
function formatOptions(options) {
  return options
}