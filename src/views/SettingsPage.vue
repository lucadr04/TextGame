<template></template>

<script setup>
  import { onMounted } from 'vue'
  import { printScene } from '../controllers/settingsController.js'
  
  onMounted(async () => {
    await printScene()
  })
</script>