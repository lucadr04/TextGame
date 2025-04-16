<template>
  <div class="disclaimerbox">
    <transition name="fade">
      <p v-if="showText" v-html="message"></p>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const showText = ref(false)
const message = ref(
  `This is a cool game I made myself UwU<br>All rights reserved`
)

const router = useRouter()

onMounted(() => {
  showText.value = true
  setTimeout(() => {
    showText.value = false
  }, 3600)
  setTimeout(() => {
    router.push('/title')
  }, 4800)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.disclaimerbox {
  font-size: 2vw;
  line-height: 2.5vw;
  color: silver;
  margin: 0;
  display: grid;
  grid-template-rows: 60vh 10vh;
  padding-top: 10vh;
}
</style>
