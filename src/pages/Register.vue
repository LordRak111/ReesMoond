<script setup>
import { ref } from 'vue'
import { register } from '../composables/useUsers.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const err = ref('')

function submit() {
  const res = register(username.value, email.value, password.value, confirmPassword.value)
  if (res.ok) { router.push('/login') } else err.value = res.msg
}
</script>

<template>
  <div class="auth">
    <h1>Регистрация</h1>
    <p v-if="err" class="error-msg">{{ err }}</p>
    <input v-model="username" placeholder="Логин (мин. 3 символа)" />
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Пароль (мин. 6)" />
    <input v-model="confirmPassword" type="password" placeholder="Повторите пароль" />
    <button class="btn-primary" @click="submit">Зарегистрироваться</button>
    <router-link to="/login" class="link">Уже есть аккаунт? Войти</router-link>
  </div>
</template>

<style scoped>
.auth { max-width: 400px; margin: 3rem auto; background: var(--surface); padding: 2rem; border-radius: 8px; text-align: center; }
.link { display: block; margin-top: 1rem; color: var(--accent); }
.error-msg { color: var(--danger); background: rgba(255,51,51,0.1); padding: 0.5rem; border-radius: 4px; margin-bottom: 1rem; font-size: 0.9rem; }
</style>