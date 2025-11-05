<!--
  This is the character creation layout.
  This gets accessed only once, if a save-file is not found ingame
-->

<template>
  <transition name="fade-in" appear>
    <div class="screenbox">
      <div class="quickSpacing"></div>
      <transition name="fade-change" mode="out-in">
        <div :key="route.fullPath">
          <div class="playbox">
            <div class="textbox">
              {{ layout.textbox }}
            </div>
            <div class="bottombox">
              <div class="choicebox">
                <div class="choicerow">
                  <div class="choicetext">
                    <input type="text" class="write" placeholder="Enter your nickname" v-model="nicknameInput">
                  </div>
                  <div class="choicemeta">
                    <div class="choicetext" v-if="pointsLeft === 0 && nicknameInput" @click="finalize()"> Ready </div>
                  </div>
                </div>
                <div class="choicerow" v-for="(choice, i) in attributes" :key="i">
                  <div class="choicetext" @click="creator.handleAction(choice.action, choice.target)">{{ choice.text }}</div>
                  <div class="choicemeta">
                    <div class="choicemetaleft" @click="creator.leftAction(choice.laction, choice.ltarget, choice.meta)">
                      {{ choice.lb }}
                    </div>
                    <div class="choicemetatext">{{ choice.meta }}</div>
                    <div class="choicemetaright" @click="creator.rightAction(choice.raction, choice.rtarget, choice.meta)">
                      {{ choice.rb }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="imagebox">
                Points Left: {{ pointsLeft }}
              </div>
            </div>
          </div>
          <router-view />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
// Imports
import { useRoute, useRouter } from 'vue-router'
import { useAttributesStore } from '../stores/attributesStore.js'
import { useGameStore } from '../stores/gameStore.js'
import { useLayoutStore } from '../stores/layoutStore.js'
import { CharacterCreationService } from '../controllers/creationController.js'

// Setup
const route = useRoute()
const router = useRouter()
const attributes = useAttributesStore().getcreationAttributes()
const game = useGameStore()
const layout = useLayoutStore()
layout.updateTextbox('Create your character')

const creator = new CharacterCreationService(
  game, 
  router, 
)

const { 
  nicknameInput, 
  pointsLeft,   
} = creator.getReactiveState()

async function finalize() {
  await creator.createCharacter()
  router.push('/game/main')
}

</script>

<style>
.quickSpacing {
  padding: 5vh;
}

.fade-in-enter-active {
  transition: opacity 1s ease;
}

.fade-in-enter-from {
  opacity: 0;
}

.fade-change-enter-active,
.fade-change-leave-active {
  transition: opacity 0.3s ease;
}

.fade-change-enter-from,
.fade-change-leave-to {
  opacity: 0.33;
}
</style>