<template>
  <div class="titlebox">
    <!-- Logo -->
    <transition name="fade" appear>
      <div class="logobox" v-if="visible">
        <h1 class="logo-text">CYBERQUEST</h1>
        <p class="tagline">An Interactive Fiction Adventure</p>
      </div>
    </transition>

    <!-- Start Button -->
    <transition name="fade" appear>
      <div class="startbox" v-if="visible" @click="handleStart" tabindex="0">
        Start
      </div>
    </transition>

    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const visible = ref(true)
const router = useRouter()

function handleStart() {
  visible.value = false

  setTimeout(() => {
    router.push('/game/main')
  }, 1800)
}
</script>

<style scoped>
.titlebox {
  color: silver;
  margin: 0;
  display: grid;
  grid-template-rows: 60vh 10vh;
  padding-top: 10vh;
  justify-items: center;
  align-items: center;
  font-family: 'VT323', monospace;
}

.logobox {
  border: 0.3vh solid silver;
  padding: 2vh 2vw;
  text-align: center;
  animation: glow 4s infinite alternate;
}

.logo-text {
  font-size: 6vw;
  margin: 0;
  letter-spacing: 0.2vw;
  padding: 5vh 5vw;
}

.tagline {
  font-size: 2vw;
  margin-top: 1vh;
}

.startbox {
  border: 0.3vh solid silver;
  padding: 1vh 2vw;
  font-size: 2vw;
  cursor: pointer;
  transition: background-color 0.3s;
}

.startbox:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

@keyframes glow {
  0% { text-shadow: 0 0 0px silver; }
  40% { text-shadow: 0 0 30px white; }
  60% { text-shadow: 0 0 30px white; }
  100% { text-shadow: 0 0 20px silver; }
}

/* Fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s ease, transform 2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
