<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { getProductById, addReview } from '../composables/useProducts.vue'
import { add } from '../composables/useCart.vue'
import { currentUser } from '../composables/useUsers.vue'

const route = useRoute(), router = useRouter()
const product = computed(() => getProductById(route.params.id))
const selSize = ref('')
const revText = ref('')
const revStars = ref(5)
const errorMsg = ref('')

function toCart() {
  // 1. Проверка авторизации
  if (!currentUser.value) {
    router.push({ name: 'Register', query: { redir: route.fullPath } })
    return
  }


  if (!selSize.value) {
    errorMsg.value = 'Пожалуйста, выберите размер перед добавлением в корзину'
    setTimeout(() => { errorMsg.value = '' }, 3000)
    return
  }

  // 3. Добавление в корзину
  add({ ...product.value, size: selSize.value })
  

  errorMsg.value = ''
}

function sendReview() {
  if (!currentUser.value) {
     router.push({ name: 'Register', query: { redir: route.fullPath } })
     return
  }
  if (revText.value.trim()) {
    addReview(product.value.id, {
      user: currentUser.value.email,
      text: revText.value.trim(),
      stars: revStars.value,
      date: new Date().toLocaleDateString()
    })
    revText.value = ''
  }
}
</script>

<template>
  <div v-if="product" class="container product">
    <nav class="bread">
      <router-link to="/">Главная</router-link> / 
      <router-link to="/catalog">Каталог</router-link> / 
      {{ product.name }}
    </nav>
    
    <div class="main">
      <img :src="product.image" :alt="product.name" />
      <div class="info">
        <h1>{{ product.name }} <span class="sku">{{ product.sku }}</span></h1>
        
        <!-- Тег коллекции -->
        <div class="collection-tag" v-if="product.collection">
          {{ product.collection }}
        </div>

        <p class="desc">{{ product.desc }}</p>
        
        <div class="specs" v-for="(v,k) in product.specs" :key="k">
          <b>{{ k }}:</b> {{ v }}
        </div>
        
        <div class="opt">
          <label>Размер:</label>
          <div class="sizes">
            <button 
              v-for="s in product.sizes" 
              :key="s" 
              @click="selSize = s" 
              :class="{ on: selSize === s }" 
              :disabled="product.stock <= 0"
            >
              {{ s }}
            </button>
          </div>
          <!-- Подсказка, если размер не выбран -->
          <p v-if="!selSize && product.stock > 0" class="size-hint">⚠️ Выберите размер</p>
        </div>
        
        <div class="status">Наличие: <b>{{ product.stock > 0 ? product.stock + ' шт.' : 'Нет на складе' }}</b></div>
        <div class="status">🚚 Доставка: {{ product.delivery }}</div>
        
        <!-- 🔹 Отображение ошибки над кнопкой -->
        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
        
        <button 
          class="btn-primary" 
          @click="toCart" 
          :disabled="!selSize || product.stock <= 0"
        >
          В КОРЗИНУ
        </button>
      </div>
    </div>

    <div class="reviews">
      <h3>Отзывы</h3>
      <div v-if="product.reviews?.length" class="list">
        <div v-for="r in product.reviews" :key="r.date" class="item">
          <div class="head">
            <span>{{ r.user }}</span>
            <b>⭐{{ r.stars }}</b>
            <small>{{ r.date }}</small>
          </div>
          <p>{{ r.text }}</p>
        </div>
      </div>
      <p v-else class="empty">Пока нет отзывов</p>
      
      <div class="form">
        <textarea v-model="revText" placeholder="Ваш отзыв..." rows="2"></textarea>
        <div class="stars">
          <span 
            v-for="n in 5" 
            :key="n" 
            @click="revStars = n" 
            :class="{ on: n <= revStars }"
          >★</span>
        </div>
        <button class="btn-outline" @click="sendReview">Отправить</button>
      </div>
    </div>
  </div>
  <div v-else class="container empty">Товар не найден</div>
</template>

<style scoped>
.product { padding: 2rem 0; }
.bread { color: var(--text-muted); margin-bottom: 1rem; font-size: 0.9rem; }
.main { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
.main img { width: 100%; border-radius: 24px; object-fit: cover; max-height: 650px; box-shadow: 0 4px 16px rgba(0,0,0,0.3); }
.sku { font-size: 0.8rem; color: var(--text-muted); font-weight: 400; margin-left: 0.5rem; }
.collection-tag {
  display: inline-block;
  background: var(--accent);
  color: #000;
  font-weight: 800;
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}
.specs, .opt, .status { margin: 1rem 0; line-height: 1.7; font-size: 1.1rem; }
.sizes { display: flex; gap: 0.8rem; margin-top: 0.5rem; }
.sizes button { padding: 0.7rem 1.2rem; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; cursor: pointer; font-size: 1rem; transition: all 0.2s; }
.sizes button.on { background: var(--accent); color: #000; border-color: var(--accent); transform: scale(1.05); }
.sizes button:disabled { opacity: 0.3; cursor: not-allowed; }

.size-hint { color: var(--danger); font-size: 0.9rem; margin-top: 0.5rem; font-weight: 600; }
.error-msg {
  color: var(--danger);
  background: rgba(255, 51, 51, 0.1);
  padding: 0.6rem;
  border-radius: 8px;
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
  text-align: center;
  font-weight: 600;
  border: 1px solid rgba(255, 51, 51, 0.2);
}
.reviews, .info { background: var(--surface); padding: 2rem; border-radius: 20px; border: 1px solid var(--border); }
.reviews { margin-top: 2rem; }
.item { border-bottom: 1px solid var(--border); padding: 1rem 0; }
.head { display: flex; justify-content: space-between; margin-bottom: 0.5rem; align-items: center; }
.form textarea { width: 100%; margin-bottom: 0.8rem; background: var(--bg); color: var(--text); border: 1px solid var(--border); padding: 1rem; border-radius: 14px; font-size: 1rem; resize: vertical; }
.stars { margin: 0.8rem 0; cursor: pointer; }
.stars span { font-size: 1.8rem; color: var(--text-muted); }
.stars span.on { color: var(--accent); }
.empty { text-align: center; padding: 4rem 2rem; color: var(--text-muted); font-size: 1.1rem; }

@media(max-width: 768px) { .main { grid-template-columns: 1fr; gap: 2rem; } }
</style>