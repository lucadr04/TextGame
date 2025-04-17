<template></template>

<script setup>
  import { onMounted } from 'vue'
  import { printScene } from '../controllers/gameController.js'
  
  onMounted(async () => {
    await printScene()
  })
</script>