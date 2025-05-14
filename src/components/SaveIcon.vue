<template>
    <transition name="fade">
      <img 
        v-if="layout.saveIcon" 
        src="/save.png" 
        alt="Saving..." 
        class="save-icon" 
      />
    </transition>
  </template>
  
  <script setup>
  import { useLayoutStore } from '../stores/layoutStore'

  const layout = useLayoutStore()
  </script>
  
  <style scoped>
  .save-icon {
    position: fixed;
    bottom: 3vh;
    right: 2vw;
    width: 3vw;
    height: 3vw;
    object-fit: contain;
    opacity: 0.8;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>