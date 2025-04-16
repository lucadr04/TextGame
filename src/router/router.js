import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '../layouts/MainLayout.vue'

import AttributesPage from '../views/AttributesPage.vue'
import MainPage from '../views/MainPage.vue'
import InventoryPage from '../views/InventoryPage.vue'
import HistoryPage from '../views/HistoryPage.vue'
import SettingsPage from '../views/SettingsPage.vue'

import DisclaimerPage from '../views/DisclaimerPage.vue'
import TitlePage from '../views/TitlePage.vue'

const routes = [
  {
    path: '/',
    name: 'Disclaimer',
    component: DisclaimerPage,
  },
  {
    path: '/title',
    name: 'Title',
    component: TitlePage,
  },
  {
    path: '/game',
    component: MainLayout,
    children: [
      { path: 'main', name: 'Main', component: MainPage },
      { path: 'inventory', name: 'Inventory', component: InventoryPage },
      { path: 'attributes', name: 'Attributes', component: AttributesPage },
      { path: 'history', name: 'History', component: HistoryPage },
      { path: 'settings', name: 'Settings', component: SettingsPage },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router