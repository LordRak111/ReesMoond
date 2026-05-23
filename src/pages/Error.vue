<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="error"><h1>🚫 {{ route.query.r==='access' ? 'Доступ запрещён' : '404' }}</h1><p>{{ route.query.r==='access' ? 'Войдите в аккаунт.' : 'Страница не найдена.' }}</p><router-link to="/" class="btn-outline">На главную</router-link></div>
</template>

<style scoped>
.error { text-align: center; padding: 4rem 1rem; background: var(--surface); margin-top: 3rem; border-radius: 8px; }
h1 { color: var(--danger); font-size: 2.5rem; margin-bottom: 1rem; }
p { margin-bottom: 2rem; color: var(--muted); }
</style>