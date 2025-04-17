<template></template>

<script setup>
  import { onMounted } from 'vue'
  import { printScene } from '../controllers/attributesController.js'
  
  onMounted(async () => {
    await printScene()
  })
</script>