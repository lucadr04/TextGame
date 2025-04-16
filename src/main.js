import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/router.js'

import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

/*
if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
  window.location.href = '/';
}
*/

app.mount('#app')
