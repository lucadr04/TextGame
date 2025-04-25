import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/router.js'

import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)


if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
  window.location.href = '/';
}


/*
  Here i should handle the savestates!
*/ 

/* 
  Here i should handle the music!
*/
import SfxController from './controllers/sfxController.js'
SfxController.init()

app.mount('#app')
