import {
  createRouter,
  createWebHistory,
  type RouterScrollBehavior,
} from 'vue-router'

import Home from '../views/Home.vue'
import Episode from '../views/Episode.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/episode/:id', name: 'Episode', component: Episode },
]

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  }

  return {
    top: 0,
    left: 0,
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
})

export default router
