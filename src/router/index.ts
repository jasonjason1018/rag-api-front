import { createRouter, createWebHistory } from 'vue-router'
import ChatView from '../views/ChatView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import { authState } from '../api/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: ChatView, meta: { requiresAuth: true } },
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView },
  ],
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !authState.isLoggedIn) {
    return '/login'
  }
  if (to.path === '/login' && authState.isLoggedIn) {
    return '/'
  }
})

export default router
