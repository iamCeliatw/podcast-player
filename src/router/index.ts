import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Episode from '../views/Episode.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/episode/:id', name: 'Episode', component: Episode },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
