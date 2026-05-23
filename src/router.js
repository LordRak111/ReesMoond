import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../src/pages/Home.vue'), meta: { public: true } },
  { path: '/catalog', name: 'Catalog', component: () => import('../src/pages/Catalog.vue'), meta: { public: true } },
  { path: '/product/:id', name: 'Product', component: () => import('../src/pages/Product.vue'), meta: { public: true } },
  { path: '/cart', name: 'Cart', component: () => import('../src/pages/Cart.vue'), meta: { public: true } },
  { path: '/checkout', name: 'Checkout', component: () => import('../src/pages/Checkout.vue'), meta: { requiresAuth: true } },
  { path: '/profile', name: 'Profile', component: () => import('../src/pages/Profile.vue'), meta: { requiresAuth: true } },
  { path: '/about', name: 'About', component: () => import('../src/pages/About.vue'), meta: { public: true } },
  { path: '/faq', name: 'FAQ', component: () => import('../src/pages/FAQ.vue'), meta: { public: true } },
  { path: '/admin', name: 'Admin', component: () => import('../src/pages/AdminPanel.vue'), meta: { requiresAdmin: true } },
  { path: '/login', name: 'Login', component: () => import('../src/pages/Login.vue'), meta: { public: true } },
  { path: '/register', name: 'Register', component: () => import('../src/pages/Register.vue'), meta: { public: true } },
  { path: '/:pathMatch(.*)*', name: '404', component: () => import('../src/pages/Error.vue'), meta: { public: true } }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, _, next) => {
  const user = JSON.parse(localStorage.getItem('reesmoond_session') || 'null')
  
  if (to.meta.requiresAuth && !user) {
    next({ name: 'Register', query: { redir: to.fullPath } })
  } else if (to.meta.requiresAdmin && (!user || (user.role !== 'admin' && user.role !== 'superadmin'))) {
    next({ name: '404', query: { r: 'access' } })
  } else {
    next()
  }
})

export default router