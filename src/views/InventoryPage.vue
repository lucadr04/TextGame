<template></template>

<script setup>
  import { onMounted } from 'vue'
  import { printScene } from '../controllers/inventoryController.js'
  
  onMounted(async () => {
    await printScene()
  })
</script>