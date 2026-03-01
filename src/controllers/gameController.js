/* 
  This is the controller that manages the flow inside game/main
*/

import { useGameStore } from '../stores/gameStore.js'
import { useSettingsStore } from '../stores/settingsStore.js'
import { useLayoutStore } from '../stores/layoutStore.js'

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