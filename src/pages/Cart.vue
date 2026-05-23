<script setup>
import { cart, total, remove, updateQty, clear, applyPromo } from '../composables/useCart.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const promo = ref('')
const disc = ref(1)
const promoError = ref('') 

const final = computed(() => (total.value * disc.value).toFixed(0))

function apply() { 
  const d = applyPromo(promo.value)
  if (d < 1) {
    disc.value = d
    promoError.value = '' 
  } else {
    promoError.value = 'Неверный промокод' 
    setTimeout(() => { promoError.value = '' }, 3000) 
  }
}
</script>

<template>
  <div class="container cart">
    <h1>🛒 Корзина</h1>
    
    <div v-if="!cart.length" class="empty">
      <p>Корзина пуста</p>
      <router-link to="/catalog" class="btn-outline">В каталог</router-link>
    </div>
    
    <template v-else>
      <div class="promo-block">
        <div class="promo">
          <input v-model="promo" placeholder="Промокод (REES20)" />
          <button @click="apply" class="btn-primary">ПРИМЕНИТЬ</button>
        </div>
        <p v-if="promoError" class="promo-error">{{ promoError }}</p>
      </div>

      <div class="items">
        <div v-for="i in cart" :key="i.id+i.size" class="row">
          <img :src="i.image" :alt="i.name" />
          <div class="inf">
            <h4>{{ i.name }}</h4>
            <p>Размер: {{ i.size }} | SKU: {{ i.sku }}</p>
          </div>
          <div class="qty">
            <button @click="updateQty(i.id, i.size, i.qty-1)">-</button>
            <input type="number" v-model.number="i.qty" @change="updateQty(i.id, i.size, i.qty)"/>
            <button @click="updateQty(i.id, i.size, i.qty+1)">+</button>
          </div>
          <div class="price">{{ (i.price * i.qty).toFixed(0) }} ₽</div>
          <button class="del" @click="remove(i.id, i.size)">✕</button>
        </div>
      </div>
      
      <div class="sum">
        <p>Итого: <b>{{ final }} ₽</b> <span v-if="disc<1" class="badge">-20%</span></p>
        <div class="btns">
          <button class="btn-primary" @click="router.push('/checkout')">ОФОРМИТЬ</button>
          <button class="btn-outline" @click="clear">ОЧИСТИТЬ</button>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.cart { padding: 2.5rem 0; }

.promo-block { margin-bottom: 1.5rem; max-width: 450px; }
.promo { display: flex; gap: 0.8rem; }
.promo input { border-radius: 14px; font-size: 1rem; flex: 1; }


.promo-error {
  color: var(--danger);
  font-size: 0.9rem;
  margin-top: 0.5rem;
  font-weight: 600;
}
.empty { 
  text-align: center; 
  padding: 4rem 2rem; 
  color: var(--text-muted); 
  font-size: 1.1rem; 
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem; /* Отступ между текстом и кнопкой */
  background: var(--surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  max-width: 600px;
  margin: 2rem auto;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}

.empty p {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.empty .btn-outline {
  margin-top: 0.5rem;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
}
.row { display: flex; align-items: center; gap: 1.5rem; padding: 1.2rem; background: var(--surface); border-bottom: 1px solid var(--border); border-radius: 16px; margin-bottom: 0.8rem; }
.row img { width: 80px; height: 80px; object-fit: cover; border-radius: 14px; }
.inf { flex: 1; }
.inf h4 { font-size: 1.1rem; margin-bottom: 0.3rem; }
.qty { display: flex; align-items: center; gap: 0.5rem; }
.qty input { width: 50px; text-align: center; padding: 0.6rem; border-radius: 12px; font-size: 1.1rem; }
.del { color: var(--danger); font-size: 1.4rem; padding: 0.5rem; border-radius: 50%; transition: background 0.2s; }
.del:hover { background: rgba(255,51,51,0.1); }
.sum { text-align: right; margin-top: 1.5rem; }
.sum p { font-size: 1.3rem; margin-bottom: 1rem; }
.btns { display: flex; gap: 0.8rem; justify-content: flex-end; }
</style>