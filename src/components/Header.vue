<script setup>
import { ref, watch } from 'vue'
import { filters, categories, subcategories } from '../composables/useProducts.vue'
import { count } from '../composables/useCart.vue'
import { currentUser, logout } from '../composables/useUsers.vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const searchQuery = ref(filters.value.query)
const selectedCategory = ref(filters.value.category)
const selectedSubcategory = ref(filters.value.sub)


watch(searchQuery, val => { filters.value.query = val })
watch(selectedCategory, val => { 
  filters.value.category = val 
  filters.value.page = 1 
})
watch(selectedSubcategory, val => { 
  filters.value.sub = val 
  filters.value.page = 1 
})

watch(
  () => [filters.value.query, filters.value.category, filters.value.sub],
  ([q, c, s]) => {
    if (searchQuery.value !== q) searchQuery.value = q
    if (selectedCategory.value !== c) selectedCategory.value = c
    if (selectedSubcategory.value !== s) selectedSubcategory.value = s
  }
)

const user = ref(currentUser.value)

watch(() => route.fullPath, () => {
  user.value = currentUser.value
})

function goCart() { router.push('/cart') }
function toggleAuth() {
  if (user.value) { 
    logout()
    user.value = null 
    location.reload() 
  }
  else router.push('/login')
}
</script>

<template>
  <header class="header">
    <router-link to="/" class="logo-link">
      <img src="https://placehold.co/190x50/000/fff?text=REESMOOND" alt="REESMOOND Logo" class="header-logo" />
    </router-link>

    <div class="search-wrap">
      <!-- 🔹 ПРИВЯЗКА К ЛОКАЛЬНЫМ REFS -->
      <select v-model="selectedCategory">
        <option v-for="c in categories" :key="c">{{ c }}</option>
      </select>
      <select v-model="selectedSubcategory">
        <option v-for="s in subcategories" :key="s">{{ s }}</option>
      </select>
      <input 
        v-model="searchQuery" 
        placeholder="Поиск..." 
        @keyup.enter="router.push('/catalog')" 
      />
      <button class="btn-primary" @click="router.push('/catalog')">НАЙТИ</button>
    </div>

    <nav class="nav-links">
      <router-link to="/catalog" class="nav-link">Каталог</router-link>
      <router-link to="/about" class="nav-link">О нас</router-link>
      <router-link to="/faq" class="nav-link">FAQ</router-link>
      <router-link to="/cart" class="nav-link">Корзина <span v-if="count" class="badge">{{ count }}</span></router-link>
      
      <template v-if="user">
        <router-link to="/profile" class="nav-link">Профиль</router-link>
        <router-link v-if="user.role === 'admin' || user.role === 'superadmin'" to="/admin" class="nav-link">Админ</router-link>
        <button class="nav-btn" @click="toggleAuth">Выйти</button>
      </template>
      <template v-else>
        <router-link to="/login" class="nav-link">Войти</router-link>
        <router-link to="/register" class="nav-link">Регистрация</router-link>
      </template>
    </nav>
  </header>
</template>

<style scoped>
.header { display: flex; align-items: center; justify-content: space-between; padding: 1.5rem 2.5rem; background: var(--surface); border-bottom: 1px solid var(--border); border-bottom-left-radius: 24px; border-bottom-right-radius: 24px; flex-wrap: wrap; gap: 1.2rem; }
.logo-link { display: block; text-decoration: none; }
.header-logo { height: 48px; width: auto; transition: opacity 0.3s, transform 0.3s; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3)); }
.logo-link:hover .header-logo { opacity: 0.85; transform: scale(1.03); }
.search-wrap { flex: 1; display: flex; gap: 0.8rem; min-width: 320px; }
.search-wrap select { width: auto; min-width: 140px; padding: 0.9rem 1rem; border-radius: 14px; font-size: 1rem; }
.nav-links { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
.nav-link { 
  color: var(--text); 
  text-decoration: none; 
  font-weight: 600; 
  font-size: 1.1rem; 
  padding: 0.7rem 1.1rem; 
  border-radius: 12px; 
  transition: all 0.2s; 
}
.nav-link:hover { 
  background: var(--surface-hover); 
  color: var(--accent); 
}
.nav-link.router-link-active, 
.nav-link.router-link-exact-active {
  color: var(--accent) !important; /* Фирменный зелёный */
  background: rgba(0, 255, 136, 0.1); /* Лёгкий зелёный фон */
  border: 1px solid var(--accent); /* Тонкая зелёная рамка */
}
.nav-link.active-manual {
  color: var(--accent) !important;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid var(--accent);
}
.nav-btn { background: transparent; border: 1px solid var(--border); color: var(--text); padding: 0.7rem 1.2rem; border-radius: 12px; cursor: pointer; font-size: 1rem; }
.nav-btn:hover { border-color: var(--accent); color: var(--accent); }
.badge { position: absolute; top: -4px; right: -4px; font-size: 0.75rem; padding: 3px 6px; }
</style>