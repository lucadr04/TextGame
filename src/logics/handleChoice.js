export async function handleChoicePress(action, target, optionData = {}) {
  const game = useGameStore()
  let wait = 300

  // Handle inventory changes if specified
  if (optionData.inventory) {
    const inventory = useInventoryStore()
    if (optionData.inventory.add) {
      inventory.addItem(optionData.inventory.add)
    }
    if (optionData.inventory.remove) {
      inventory.removeItem(optionData.inventory.remove)
    }
  }

  // Handle attribute changes if specified
  if (optionData.attributes) {
    const attributes = useAttributesStore()
    Object.entries(optionData.attributes).forEach(([attr, change]) => {
      attributes.modifyAttribute(attr, change)
    })
  }

  // Handle flags if specified
  if (optionData.flags) {
    optionData.flags.forEach(flag => {
      game.setFlag(flag, true)
    })
  }

  // Handle navigation
  if(action === "jump") {
    game.setCurrentDay(target[2])
    game.setCurrentLocation(target[1])
    game.setCurrentStep(target[0])
    wait = 800
  } else if(action === "default") {
    game.setCurrentStep(target[0])
  }

  // Save game state
  SaveController.save()

  await game.reloadSceneData()
  await new Promise(resolve => setTimeout(resolve, wait))

  // Reload scene
  await printScene()
}