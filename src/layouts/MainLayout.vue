<template>
  <transition name="fade-in" appear>
    <div class="screenbox">
      <div class="navbox" v-if="route.name !== 'game/creation'">
        <Navbar />
      </div>
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
                      {{ choice.meta }}11
                      <div class="choicemetaleft" @click="leftAction(choice.laction, choice.ltarget)">
                        {{ choice.lb }}+
                      </div>
                      <div class="choicemetaright" @click="rightAction(choice.raction, choice.rtarget)">
                        {{ choice.rb }}-
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
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'

import { useLayoutStore } from '../stores/layoutStore'
const layout = useLayoutStore()

import { handleChoicePress } from '../controllers/sceneController.js'
import { handleItemPress } from '../controllers/inventoryController.js'
import { handleAttributePress } from '../controllers/attributesController.js'
import { handleSettingPress } from '../controllers/settingsController.js'


const route = useRoute()

// Manage
function handleAction(action, args) {
  console.log(`Action triggered: ${action} with args: ${args} in `, route.name)
  if (route.name === "Main") {
    handleChoicePress(action, args)
  }
  else if (route.name === "Inventory") {
    handleItemPress(action, args)
  }
  else if (route.name === "Attributes") {
    handleAttributePress(action, args)
  }
  else if (route.name === "Settings") {
    handleSettingPress(action, args)
  } else {
    console.error("Unknown route or action")
  }
}

function leftAction(route, action, args) {
  console.log(`Left action triggered: ${action} with args:`, args);
  // You can add custom logic here for left button actions
  handleAction(route, action, args);
}

function rightAction(route, action, args) {
  console.log(`Right action triggered: ${action} with args:`, args);
  // You can add custom logic here for right button actions
  handleAction(route, action, args);
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
  