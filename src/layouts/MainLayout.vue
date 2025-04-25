<!--
  This is the main game layout.
  This is the core of the game.
  It is manipulated through the layout store by the other controllers.
  The only interactive part is the choicebox. It doesn't handle the onclik, but whom to delegate it
  It should be implemented 
-->

<template>
  <transition name="fade-in" appear>
    <div class="screenbox">
      <Navbar />
      <transition name="fade-change" mode="out-in">
        <div :key="route.fullPath">
          <div class="playbox">
            <div class="textbox">
              {{ layout.textbox }}
            </div>
            <div class="bottombox">
              <div class="choicebox">
                <div class="choicerow" v-for="(choice, i) in layout.choices" :key="i">
                  <div class="choicetext" @click="handleAction(choice.action, choice.target)">{{ choice.text }}</div>
                  <div class="choicemeta">
                    <div class="choicemetaleft" @click="leftAction(choice.laction, choice.ltarget)">
                      {{ choice.lb }}
                    </div>
                    <div class="choicemetatext">{{ choice.meta }}</div>
                    <div class="choicemetaright" @click="rightAction(choice.raction, choice.rtarget)">
                      {{ choice.rb }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="imagebox">
                <img :src="layout.image" alt="  Game image" />
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
// Just imports, ignore them
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'

import { useLayoutStore } from '../stores/layoutStore'
const layout = useLayoutStore()

import { handleChoicePress } from '../controllers/gameController.js'
import { handleItemPress } from '../controllers/inventoryController.js'
import { handleAttributePress } from '../controllers/attributesController.js'
import { handleSettingPress } from '../controllers/settingsController.js'

const route = useRoute()

// Manage the click on a choicerow
async function handleAction(action, target) {
  console.log(`Action triggered: ${action} with target: ${target} in `, route.name)

  // Delegate handling to the right handler
  if (route.name === 'Main') {
    layout.emptyScene()
    handleChoicePress(action, target)
  }
  else if (route.name === 'Inventory') {
    handleItemPress(action, target)
  }
  else if (route.name === 'Attributes') {
    handleAttributePress(action, target)
  }
  else if (route.name === 'Settings') {
    handleSettingPress(action, target)
  } else {
    console.error('Unknown route or action')
  }
}

// Manage the click on a choicemeta
async function leftAction(action, target) {
  console.log(`Left action triggered: ${action} with target:`, target);
  handleAction(action, target);
}

async function rightAction(action, target) {
  console.log(`Right action triggered: ${action} with target:`, target);
  handleAction(action, target);
}
</script>

<style>
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