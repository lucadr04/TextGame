/* 
  This is the controller that manages the flow inside game/main
*/

import { useGameStore } from '../stores/gameStore.js'
import { useInventoryStore } from '../stores/inventoryStore.js'
import { useAttributesStore } from '../stores/attributesStore.js'
import { useSettingsStore } from '../stores/settingsStore.js'

import { useLayoutStore } from '../stores/layoutStore.js'

import SfxController from './sfxController.js'
import SaveController from './saveController.js'

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
  fancyTextPrinting(fullText, speed)

  // The choicebox is a complex one to handle, here is all the logic behind it
  // (maybe do a function just for that <3)
  const formattedOptions = formatOptions(currentStepData.options)
  
  layout.updateChoicebox(formattedOptions)
}

// Fuif(i%2 == 0) nction that handles when a choicetext is selected
export async function handleChoicePress(action, target) {
  const game = useGameStore()

  // Jump for when the day and/or location changes
  if(action === "jump") {
    game.setCurrentDay(target[2])
    game.setCurrentLocation(target[1])
    game.setCurrentStep(target[0])
    SaveController.save()
    await game.reloadSceneData()
    // apply music here
    await new Promise(resolve => setTimeout(resolve, 700))
  }
  // Jump for when only the step changes
  if(action === "default") {
    game.setCurrentStep(target[0])
    await game.reloadSceneData()
    /* apply music here */
    await new Promise(resolve => setTimeout(resolve, 300))
  }

  // Save game

  
  // Reload scene
  await printScene()
}

// Function that manages options in regards to attributes and inventory checks
function formatOptions(options) {
  return options
}

// Function to print text with sfx and a set speed
// Note: £ can't be used in 'normal text'. Luckily it is not a big loss
function fancyTextPrinting(fullText, speed) {
  const layout = useLayoutStore()
  let i = 0
  let stopped = false

  function typeNextChar() {
    if (stopped || i >= fullText.length) return

    let char = fullText[i]
    if(char === '£') {
      let sfx = ''
      i++;
      while(fullText[i] != $)
        sfx += fullText[i]
      SfxController.play(sfx)
      return setTimeout(typeNextChar, speed)
    }

    layout.addToTextbox(char)

    if (![' ', ',', '.', '!', '?'].includes(char)) {
      SfxController.play('txt3')
    }

    i++

    // Variable delay to slow down after punctuation
    let delay = speed
    if ([','].includes(char)) {
      delay = speed * 3 // adjust multiplier as needed
    } else if (['.', '!', '?'].includes(char)) {
      delay = speed * 7 // adjust multiplier as needed
    } 

    SfxController.typeTimeout = setTimeout(typeNextChar, delay)
  }

  typeNextChar()

  // Click to skip
  const stopOnClick = () => {
    stopped = true
    layout.updateTextbox(fullText)
    clearTimeout(SfxController.typeTimeout)
    document.removeEventListener('click', stopOnClick)
  }

  document.addEventListener('click', stopOnClick)
}
