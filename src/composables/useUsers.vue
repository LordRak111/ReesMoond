<script>
import { ref } from 'vue'

const STORAGE_KEY = 'reesmoond_users'
const CURRENT_KEY = 'reesmoond_session'
const SUPER_ADMIN = { username: 'supadmin', email: 'supadmin@reesmoond.ru', password: '814329', role: 'superadmin', points: 0, orders: [] }

function getUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const users = raw ? JSON.parse(raw) : []
    if (!users.find(u => u.username === SUPER_ADMIN.username)) {
      users.push({ ...SUPER_ADMIN })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
    }
    return users
  } catch {
    return [{ ...SUPER_ADMIN }]
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

export const currentUser = ref(JSON.parse(localStorage.getItem(CURRENT_KEY) || 'null'))

export function register(username, email, password, confirmPassword) {
  if (!username.trim() || !email.trim() || !password.trim()) return { ok: false, msg: 'Заполните все поля' }
  if (username.length < 3) return { ok: false, msg: 'Логин минимум 3 символа' }
  if (password.length < 6) return { ok: false, msg: 'Пароль минимум 6 символов' }
  if (password !== confirmPassword) return { ok: false, msg: 'Пароли не совпадают' }
  
  const users = getUsers()
  const uName = username.trim().toLowerCase()
  const uEmail = email.trim().toLowerCase()
  
  if (users.find(u => u.username === uName)) return { ok: false, msg: 'Логин уже занят' }
  if (users.find(u => u.email === uEmail)) return { ok: false, msg: 'Email уже зарегистрирован' }
  
  const newUser = { username: uName, email: uEmail, password, role: 'user', points: 0, orders: [] }
  users.push(newUser)
  saveUsers(users)
  return { ok: true, msg: 'Регистрация успешна' }
}

export function login(identifier, password) {
  if (!identifier.trim() || !password.trim()) return { ok: false, msg: 'Заполните все поля' }
  
  const users = getUsers()
  const val = identifier.trim().toLowerCase()
  const user = users.find(u => (u.username === val || u.email === val) && u.password === password)
  
  if (!user) return { ok: false, msg: 'Неверный логин/email или пароль' }
  
  currentUser.value = user
  localStorage.setItem(CURRENT_KEY, JSON.stringify(user))
  return { ok: true }
}


export function addAdmin(newUsername, newEmail, newPassword, creatorUsername) {
  const users = getUsers()
  const creator = users.find(u => u.username === creatorUsername)
  

  if (!creator || (creator.role !== 'superadmin' && creator.role !== 'admin')) {
    return { ok: false, msg: 'Недостаточно прав' }
  }
  
  const uName = newUsername.trim().toLowerCase()
  const uEmail = newEmail.trim().toLowerCase()
  
  if (users.find(u => u.username === uName)) {
    return { ok: false, msg: 'Логин уже существует' }
  }
  
  const newAdmin = { 
    username: uName, 
    email: uEmail, 
    password: newPassword, 
    role: 'admin', 
    points: 0, 
    orders: [] 
  }
  
  users.push(newAdmin)
  saveUsers(users)
  return { ok: true, msg: 'Админ успешно создан' }
}

export function updateProfile(newUsername, newEmail, newPassword) {
  if (!currentUser.value) return { ok: false, msg: 'Пользователь не авторизован' }
  
  const users = getUsers()
  const idx = users.findIndex(u => u.username === currentUser.value.username)
  if (idx === -1) return { ok: false, msg: 'Пользователь не найден' }
  
  if (newUsername && newUsername.trim() && newUsername.trim() !== currentUser.value.username) {
    if (users.some(u => u.username === newUsername.trim().toLowerCase())) {
      return { ok: false, msg: 'Логин уже занят' }
    }
    currentUser.value.username = newUsername.trim().toLowerCase()
  }
  if (newEmail && newEmail.trim() && newEmail.trim() !== currentUser.value.email) {
    if (users.some(u => u.email === newEmail.trim().toLowerCase())) {
      return { ok: false, msg: 'Email уже занят' }
    }
    currentUser.value.email = newEmail.trim().toLowerCase()
  }
  if (newPassword && newPassword.trim() && newPassword.length >= 6) {
    currentUser.value.password = newPassword
  }
  
  users[idx] = { ...currentUser.value }
  saveUsers(users)
  localStorage.setItem(CURRENT_KEY, JSON.stringify(currentUser.value))
  return { ok: true, msg: 'Данные обновлены' }
}

export function addOrder(order) {
  if (!currentUser.value) return
  currentUser.value.orders = currentUser.value.orders || []
  currentUser.value.orders.unshift(order)
  currentUser.value.points = (currentUser.value.points || 0) + Math.floor(order.total / 100)
  const users = getUsers()
  const idx = users.findIndex(u => u.username === currentUser.value.username)
  if (idx !== -1) {
    users[idx] = { ...currentUser.value }
    saveUsers(users)
    localStorage.setItem(CURRENT_KEY, JSON.stringify(currentUser.value))
  }
}

export function logout() {
  currentUser.value = null
  localStorage.removeItem(CURRENT_KEY)
}
</script>
<template></template>