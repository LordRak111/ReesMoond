<script setup>
import { ref } from 'vue'
import { currentUser } from '../components/useUsers.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userData = ref(JSON.parse(localStorage.getItem('currentUser') || '{"email": "Гость", "role": "user"}'))

function logout() {
  localStorage.removeItem('currentUser')
  currentUser.value = null
  router.push({name:'Login'})
}
</script>

<template>
  <div class="profile-box">
    <h1>🎅🏿 Профиль пользователя</h1>
    <div class="profile-card">
      <div class="avatar">{{ userData?.email?.[0]?.toUpperCase() || 'Г' }}</div>
      <p><strong>Email:</strong> {{ userData?.email || 'Не авторизован' }}</p>
      <p><strong>Роль:</strong> {{ userData?.role === 'admin' ? '♿ Администратор' : '🎅🏿 Пользователь' }}</p>
    </div>
    <button @click="logout" class="btn-logout">🚪 Выйти из аккаунта</button>
  </div>
</template>

<style scoped>
.profile-box {
  max-width: 600px;
  margin: 2rem auto;
  text-align: center;
}

.profile-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 60px;
  height: 60px;
  background: #3498db;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 1rem;
  font-weight: bold;
}

.rights-list {
  text-align: left;
  margin: 1rem 0 1.5rem 2rem;
  line-height: 1.6;
}

.btn-logout {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.btn-logout:hover {
  background: #c0392b;
}
</style>