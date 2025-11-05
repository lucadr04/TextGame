/* 
  This is the controller that manages the flow inside game/main
*/

import { useGameStore } from '../stores/gameStore.js'
import { useSettingsStore } from '../stores/settingsStore.js'
import { useLayoutStore } from '../stores/layoutStore.js'

import SaveController from '../controllers/saveController.js'

import { textPrinter } from '../controllers/textController.js'
import { handleOptions } from '../logics/handleOptions.js'

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
  
  // Get current data
  const currentStepData = game.getSceneData();

  /*layout.updateImagebox()*/
  /*layout.updateOst()*/

  // Print text
  textPrinter(currentStepData.text, settings.getTS())

  // Handle options filter and display
  handleOptions(currentStepData.options, layout)
}

export async function handleChoicePress(action, target) {
  const game = useGameStore()
  let wait = 300

  // Jump for when the day and/or location changes
  if(action === "jump") {
    game.setCurrentDay(target[2])
    game.setCurrentLocation(target[1])
    game.setCurrentStep(target[0])
    SaveController.save()
    wait = 800
  }
  // Jump for when only the step changes
  else if(action === "default") {
    game.setCurrentStep(target[0])
  }

  await game.reloadSceneData()
    /* apply music here */
    await new Promise(resolve => setTimeout(resolve, wait))


  
  // Reload scene
  await printScene()
}