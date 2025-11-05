<!--
  This is the main game layout.
  This is the core of the game.
  It is manipulated through the layout store by the other controllers.
  The only interactive part is the choicebox. It doesn't handle the onclik, but whom to delegate it
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
                  <div class="choicetext" @click="handleActionLocal(choice)">
                    {{ choice.text }} <span class="choicesubtext"> {{ choice.subtext }} </span>
                  </div>
                  <div class="choicemeta">
                    <div class="choicemetaleft" @click="leftActionLocal(choice)">
                      {{ choice.lb }}
                    </div>
                    <div class="choicemetatext">{{ choice.meta }}</div>
                    <div class="choicemetaright" @click="rightActionLocal(choice)">
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
  <SaveIcon ref="saveIcon"/>
</template>

<script setup>
// Imports
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import SaveIcon from '../components/SaveIcon.vue'
import { useLayoutStore } from '../stores/layoutStore.js'
import { handleAction, leftAction, rightAction } from '../logics/handleAction.js'

// Setup
const layout = useLayoutStore()
const saveIcon = ref(null)
const route = useRoute()

// Redirected action handlers
const handleActionLocal = (choice) => handleAction(choice, route, layout)
const leftActionLocal = (choice) => leftAction(choice, route, layout)
const rightActionLocal = (choice) => rightAction(choice, route, layout)
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