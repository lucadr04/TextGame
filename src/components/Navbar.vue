<template>
  <!-- Here is the navbar displayed at the top of the main screen -->
  <nav class="navbar">
    <div>
      <router-link to="/game/main" class="navdiv">Game</router-link>
      <router-link to="/game/inventory" class="navdiv">Inventory</router-link>
      <router-link to="/game/attributes" class="navdiv">Attributes</router-link>
      <router-link to="/game/history" class="navdiv">History</router-link>
    </div>
    <router-link to="/game/settings" class="navdiv-right">Settings</router-link>
  </nav>
</template>

<style>
.navbar {
  display: flex;
  width: 100%;
  align-items: center;
}

.navdiv {
  padding: 1vh 1vw;
}

.navdiv-right {
  padding: 1vh 1vw;
  margin-left: auto;
}

.router-link-exact-active {
  border: 0.3vh solid silver;
}
</style>
