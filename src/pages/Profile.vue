<script setup>
import { ref } from 'vue'
import { currentUser, updateProfile } from '../composables/useUsers.vue'

const u = currentUser
const form = ref({ username: u.value?.username || '', email: u.value?.email || '', password: '' })
const msg = ref({ text: '', type: '' })


const showReturnModal = ref(false)
const returnOrder = ref(null)
const returnReason = ref('')
const returnError = ref('')

function openReturn(o) {
  returnOrder.value = o
  returnReason.value = ''
  returnError.value = '' 
  showReturnModal.value = true
}

function submitReturn() {
  if (!returnReason.value.trim()) {
    returnError.value = 'Укажите причину возврата' 
    return
  }
  

  const orderIndex = u.value.orders.findIndex(o => o.id === returnOrder.value.id)
  if (orderIndex !== -1) {
    u.value.orders[orderIndex].status = 'В процессе возврата'
    u.value.orders[orderIndex].returnReason = returnReason.value
    
    updateProfile(u.value.username, u.value.email, '') 
    
    msg.value = { text: `Заявка на возврат заказа #${returnOrder.value.id} отправлена. Подтверждение выслано на ${u.value.email}`, type: 'success' }
    showReturnModal.value = false
    returnError.value = ''
  }
}

function saveProfile() {
  if (!form.value.username.trim() || !form.value.email.trim()) {
    msg.value = { text: 'Логин и Email обязательны', type: 'error' }
    return
  }
  const res = updateProfile(form.value.username, form.value.email, form.value.password)
  if (res.ok) {
    msg.value = { text: res.msg, type: 'success' }
    form.value.password = ''
  } else {
    msg.value = { text: res.msg, type: 'error' }
  }
}
</script>

<template>
  <div class="container profile" v-if="u">
    <h1>Личный кабинет</h1>
    <p v-if="msg.text" :class="msg.type">{{ msg.text }}</p>
    
    <div class="grid">
      <div class="card">
        <h3>Редактировать аккаунт</h3>
        <div class="form-group"><label>Логин</label><input v-model="form.username" /></div>
        <div class="form-group"><label>Email</label><input v-model="form.email" type="email" /></div>
        <div class="form-group"><label>Новый пароль</label><input v-model="form.password" type="password" /></div>
        <button class="btn-primary" @click="saveProfile">Сохранить</button>
      </div>
      
      <div class="card">
        <h3>Купленные товары</h3>
        <ul class="orders">
          <li v-for="o in u.orders" :key="o.id" class="order">
            <div class="order-header">
              <b>#{{ o.id }}</b> • {{ o.date }} • {{ o.total }} ₽
              <span class="st" :class="o.status === 'В процессе возврата' ? 'returning' : 'paid'">{{ o.status }}</span>
            </div>
            <div class="tr">Трек: {{ o.track }}</div>
            <button v-if="o.status === 'Оплачен'" class="btn-sm return-btn" @click="openReturn(o)">↩️ Оформить возврат</button>
            <div v-if="o.returnReason" class="return-info">Причина: {{ o.returnReason }}</div>
          </li>
          <li v-if="!u.orders.length" class="empty">Покупок пока нет</li>
        </ul>
      </div>
    </div>

   
    <div v-if="showReturnModal" class="modal-overlay">
      <div class="modal">
        <h3>Оформление возврата #{{ returnOrder?.id }}</h3>
        
      
        <p v-if="returnError" class="modal-error">{{ returnError }}</p>
        
        <p>Укажите причину возврата:</p>
        <textarea v-model="returnReason" placeholder="Например: Не подошел размер..." rows="3"></textarea>
        <div class="modal-actions">
          <button class="btn-outline" @click="showReturnModal = false">Отмена</button>
          <button class="btn-primary" @click="submitReturn">Отправить заявку</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile { padding: 2rem 0; }
.success { color: var(--accent); background: rgba(0,255,136,0.1); padding: 0.5rem; border-radius: 4px; margin-bottom: 1rem; text-align: center; border: 1px solid var(--accent); }
.error { color: var(--danger); background: rgba(255,51,51,0.1); padding: 0.5rem; border-radius: 4px; margin-bottom: 1rem; text-align: center; border: 1px solid var(--danger); }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
.card { background: var(--surface); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border); }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; margin-bottom: 0.3rem; font-size: 0.9rem; color: var(--muted); }
.orders { list-style: none; padding: 0; margin-top: 1rem; }
.order { display: flex; flex-direction: column; gap: 0.3rem; padding: 0.8rem; border-bottom: 1px solid var(--border); background: var(--bg); border-radius: 6px; margin-bottom: 0.5rem; }
.order-header { display: flex; justify-content: space-between; align-items: center; }
.st { font-weight: bold; text-transform: uppercase; font-size: 0.8rem; padding: 2px 6px; border-radius: 4px; }
.st.paid { color: var(--accent); background: rgba(0,255,136,0.1); }
.st.returning { color: #ffcc00; background: rgba(255, 204, 0, 0.1); border: 1px solid #ffcc00; } /* Желтый цвет */
.tr { font-size: 0.8rem; color: var(--muted); }
.btn-sm { background: var(--border); color: var(--text); border: none; padding: 0.3rem 0.6rem; border-radius: 4px; width: fit-content; cursor: pointer; font-size: 0.8rem; margin-top: 0.3rem; }
.btn-sm:hover { background: var(--accent); color: #000; }
.return-info { font-size: 0.85rem; color: var(--text-muted); margin-top: 0.3rem; font-style: italic; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 100; }
.modal { background: var(--surface); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border); width: 90%; max-width: 400px; }
.modal h3 { margin-bottom: 1rem; }
.modal textarea { width: 100%; margin-bottom: 1rem; background: var(--bg); border: 1px solid var(--border); color: var(--text); padding: 0.8rem; border-radius: var(--radius-md); }
.modal-actions { display: flex; justify-content: flex-end; gap: 0.5rem; }
.modal-error {
  color: var(--danger);
  background: rgba(255, 51, 51, 0.1);
  padding: 0.6rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 600;
  border: 1px solid rgba(255, 51, 51, 0.2);
}
</style>