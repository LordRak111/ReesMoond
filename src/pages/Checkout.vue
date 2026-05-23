<script setup>
import { ref, computed } from 'vue'
import { cart, total, clear, applyPromo } from '../composables/useCart.vue'
import { addOrder } from '../composables/useUsers.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({ name: '', email: '', phone: '', address: '', method: 'card' })
const err = ref('')
const successMsg = ref('') 

const disc = computed(() => { const p = localStorage.getItem('reesmoond_promo') || ''; return applyPromo(p) })
const final = computed(() => (total.value * disc.value).toFixed(0))

function validate() {
  if (!form.value.name.trim()) return 'Введите ФИО'
  if (!/^\S+@\S+\.\S+$/.test(form.value.email)) return 'Введите корректный email'
  if (!form.value.phone.trim()) return 'Введите телефон'
  if (!form.value.address.trim()) return 'Введите адрес доставки'
  if (!cart.value.length) return 'Корзина пуста'
  
 
  for (let item of cart.value) {
    if (!item.size) return `У товара "${item.name}" не выбран размер`
  }
  
  return null
}

function pay() {
  const e = validate()
  if (e) {
    err.value = e
    successMsg.value = '' 
    return
  }
  
  err.value = ''
  
 
  addOrder({ 
    id: Date.now(), 
    items: [...cart.value], 
    total: final.value, 
    status: 'Оплачен', 
    date: new Date().toLocaleDateString(), 
    track: 'TRK'+Math.random().toString(36).slice(2,8).toUpperCase() 
  })
  
  clear()
  
 
  successMsg.value = '✅ Заказ успешно оформлен! Чек отправлен на ваш email.'
  
  
  setTimeout(() => {
    router.push('/profile')
  }, 2000)
}
</script>

<template>
  <div class="container checkout">
    <h1>💳 Оформление</h1>
    

    <p v-if="err" class="error-msg">{{ err }}</p>
    
   
    <p v-if="successMsg" class="success-msg">{{ successMsg }}</p>
    
    <div class="form" v-if="!successMsg">
      <label>ФИО</label><input v-model="form.name" />
      <label>Email</label><input v-model="form.email" type="email" />
      <label>Телефон</label><input v-model="form.phone" />
      <label>Адрес</label><textarea v-model="form.address" rows="2"></textarea>
      
      <label>Оплата</label>
      <div class="methods">
        <button v-for="m in ['card','cash','crypto']" :key="m" @click="form.method=m" :class="{on: form.method===m}">
          {{ m==='card'?'💳 Карта': m==='cash'?'💵 Наличные':'₿ Крипто' }}
        </button>
      </div>
      
      <button class="btn-primary" @click="pay">ОПЛАТИТЬ {{ final }} ₽</button>
    </div>
    
  
    <div v-else class="success-action">
      <button class="btn-outline" @click="router.push('/profile')">Перейти в профиль</button>
    </div>
  </div>
</template>

<style scoped>
.checkout { padding: 2rem 0; max-width: 500px; }
.form { display: grid; gap: 0.6rem; }
.methods { display: flex; gap: 0.5rem; }
.methods button { flex: 1; padding: 0.7rem; background: var(--surface); border: 1px solid var(--border); border-radius: 4px; color: var(--text); cursor: pointer; transition: all 0.2s; }
.methods button.on { background: var(--accent); color: #000; border-color: var(--accent); font-weight: bold; }
.error-msg { 
  color: var(--danger); 
  background: rgba(255, 51, 51, 0.1); 
  padding: 0.8rem; 
  border-radius: 8px; 
  margin-bottom: 1rem; 
  text-align: center; 
  font-weight: 600;
  border: 1px solid rgba(255, 51, 51, 0.2);
}
.success-msg { 
  color: var(--accent); 
  background: rgba(0, 255, 136, 0.1); 
  padding: 0.8rem; 
  border-radius: 8px; 
  margin-bottom: 1rem; 
  text-align: center; 
  font-weight: 600;
  border: 1px solid rgba(0, 255, 136, 0.2);
}
.success-action {
  text-align: center;
  margin-top: 2rem;
}
</style>