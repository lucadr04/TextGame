/* 
  This is the controller that manages the flow inside game/attributes
*/

import { useAttributesStore } from '../stores/attributesStore.js'
import { useLayoutStore } from '../stores/layoutStore.js'

export async function printScene() {
  const attributes = useAttributesStore()
  const layout = useLayoutStore()

  if (!attributes.checkDesc()) {
    await attributes.loadDesc();
  }

  layout.emptyScene()

  // Scene initialization  
  layout.updateChoicebox(attributes.getFormattedAttributes())
  layout.updateTextbox('')
}

export async function handleAttributePress(action, target) {
  const attributes = useAttributesStore()
  const layout = useLayoutStore()
  if(action == "default") {
    attributes.loadCurrDesc(target)
    layout.updateTextbox(attributes.getCurrDesc())
  }
}