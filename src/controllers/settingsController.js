/*
  This is the controller that manages game/settings
*/

import { useSettingsStore } from '../stores/settingsStore.js'
import { useLayoutStore } from '../stores/layoutStore.js'
import SaveController from '../controllers/saveController.js'

export async function printScene() {
  const settings = useSettingsStore()
  const layout = useLayoutStore()

  layout.emptyScene()

  // Scene initialization  
  layout.updateChoicebox(settings.mappedChoices)
  layout.updateTextbox('')
}

export async function handleSettingPress(action, target) {
  const settings = useSettingsStore()
  const layout = useLayoutStore()
  console.log(settings.mappedChoices[1].meta)
  if(action == 'inc') {
    switch (target) {
      case 'sfx':
        settings.incSfx()
        break;
      case 'bgm':
        settings.incBgm()
        break;
      case 'ts':
        settings.incTS()
        break;
      default:
        break;
    }
  } else if(action == 'dec') {
    switch (target) {
      case 'sfx':
        settings.decSfx()
        break;
      case 'bgm':
        settings.decBgm()
        break;
      case 'ts':
        settings.decTS()
        break;
      default:
        break;
    }
  } else if(action == 'delete save') {
    if (confirm('Are you really really sure?')) {
      SaveController.delete();
      location.reload(); 
    }
  }
}