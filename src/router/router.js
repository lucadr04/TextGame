/*
  This is a simple router
*/

import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '../layouts/MainLayout.vue'
import DisclaimerPage from '../layouts/DisclaimerPage.vue'
import TitlePage from '../layouts/TitlePage.vue'
import CreationPage from '../layouts/CreationPage.vue'

import AttributesPage from '../views/AttributesPage.vue'
import MainPage from '../views/MainPage.vue'
import InventoryPage from '../views/InventoryPage.vue'
import HistoryPage from '../views/HistoryPage.vue'
import SettingsPage from '../views/SettingsPage.vue'

import { settingsSaveController } from '../controllers/saveController'

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
    path: '/creation',
    name: 'Creation',
    component: CreationPage
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

router.beforeEach((to, from, next) => {
  if (from.name === 'Settings') {
    settingsSaveController.save()
  }
  next();
});

export default router