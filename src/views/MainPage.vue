<template></template>

<script setup>
  import { onMounted } from 'vue'
  import { printScene } from '../controllers/sceneController.js'
  
  onMounted(async () => {
    await printScene()
  })
</script>