<script setup>
import { ref } from 'vue'
import { login } from '../composables/useUsers.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const identifier = ref('')
const password = ref('')
const err = ref('')

function submit() {
  const res = login(identifier.value, password.value)
  if (res.ok) { 
    router.push('/catalog')
    identifier.value = ''
    password.value = ''
    err.value = ''
  } else err.value = res.msg
}
</script>

<template>
  <div class="auth">
    <h1>Вход</h1>
    <p v-if="err" class="error-msg">{{ err }}</p>
    <input v-model="identifier" placeholder="Логин или Email" />
    <input v-model="password" type="password" placeholder="Пароль" />
    <button class="btn-primary" @click="submit">Войти</button>
    <router-link to="/register" class="link">Нет аккаунта? Регистрация</router-link>
  </div>
</template>

<style scoped>
.auth { max-width: 400px; margin: 3rem auto; background: var(--surface); padding: 2rem; border-radius: 8px; text-align: center; }
.link { display: block; margin-top: 1rem; color: var(--accent); }
.error-msg { color: var(--danger); background: rgba(255,51,51,0.1); padding: 0.5rem; border-radius: 4px; margin-bottom: 1rem; font-size: 0.9rem; }
</style>