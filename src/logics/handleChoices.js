// choices/ChoiceHandler.js
export class ChoiceHandler {
  constructor(gameStore, saveController) {
    this.game = gameStore
    this.save = saveController
  }

  async handle(action, target) {
    const actions = {
      jump: () => this._handleJump(target),
      default: () => this._handleDefault(target)
    }

    if (actions[action]) {
      await actions[action]()
      return true
    }
    
    console.warn(`Unknown action: ${action}`)
    return false
  }

  async _handleJump([step, location, day]) {
    this.game.setCurrentDay(day)
    this.game.setCurrentLocation(location)
    this.game.setCurrentStep(step)
    
    this.save.save()
    await this.game.reloadSceneData()
    
    // TODO: Apply music here
    await this._wait(700)
  }

  async _handleDefault([step]) {
    this.game.setCurrentStep(step)
    await this.game.reloadSceneData()
    
    // TODO: Apply music here  
    await this._wait(300)
  }

  _wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}