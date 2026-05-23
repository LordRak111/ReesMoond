<script>
import { ref, computed, watch } from 'vue'
import { currentUser } from './useUsers.vue'

const getStorageKey = () => currentUser.value ? `cart_${currentUser.value.username}` : 'cart_guest'

const initialCart = JSON.parse(localStorage.getItem(getStorageKey()) || '[]')

export const cart = ref(initialCart)

watch(
  () => currentUser.value?.username,
  (newUser, oldUser) => {
    // Сохраняем старую корзину перед сменой
    if (oldUser) {
      localStorage.setItem(`cart_${oldUser}`, JSON.stringify(cart.value))
    }
    // Загружаем новую корзину
    const key = newUser ? `cart_${newUser}` : 'cart_guest'
    cart.value = JSON.parse(localStorage.getItem(key) || '[]')
  }
)

watch(
  cart,
  (newVal) => {
    const key = getStorageKey()
    localStorage.setItem(key, JSON.stringify(newVal))
  },
  { deep: true }
)

export const total = computed(() => cart.value.reduce((s, i) => s + (i.price * (1-(i.discount||0)/100) * i.qty), 0))
export const count = computed(() => cart.value.reduce((s, i) => s + i.qty, 0))

export function add(item) {
  if (!item.size) {
    console.warn('Попытка добавить товар без размера')
    return
  }
  const ex = cart.value.find(i => i.id === item.id && i.size === item.size)
  if (ex) ex.qty++
  else cart.value.push({ id: item.id, sku: item.sku, name: item.name, price: item.price, discount: item.discount, image: item.image, size: item.size, qty: 1 })
}

export function remove(id, size) { cart.value = cart.value.filter(i => !(i.id === id && i.size === size)) }
export function updateQty(id, size, q) { const i = cart.value.find(x => x.id === id && x.size === size); if(i) i.qty = Math.max(1, q) }
export function clear() { cart.value = [] }
export function applyPromo(code) { return code.trim().toUpperCase() === 'REES20' ? 0.8 : 1 }
</script>

<template></template>