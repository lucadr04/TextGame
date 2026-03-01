// composables/useCharacterCreation.js
import { ref } from 'vue'
import SaveController from '../controllers/saveController.js'
import { handleAttributePress } from '../controllers/attributesController.js'

const maxPoints = 12;

export class CharacterCreationService {
  constructor(game, router) {
    this.game = game
    this.router = router
    
    this.nicknameInput = ref('')
    this.pointsLeft = ref(maxPoints)
  }

  async handleAction(action, target) {
    console.log(`Action triggered: ${action} with target:`, target)
    await handleAttributePress(action, target)
  }

  async leftAction(action, target, check) {
    if (check > 2 && this.pointsLeft.value < maxPoints) {
      this.pointsLeft.value++
      await handleAttributePress(action, target)
    }
  }

  async rightAction(action, target, check) {
    if (check < 8 && this.pointsLeft.value > 0) {
      this.pointsLeft.value--
      await handleAttributePress(action, target)
    }
  }

  async createCharacter() {
    this.game.setNick(this.nicknameInput.value)
    await SaveController.save()
  }

  getReactiveState() {
    return {
      pointsLeft: this.pointsLeft,
      nicknameInput: this.nicknameInput,
    }
  }
}