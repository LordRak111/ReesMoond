<script setup>
import { computed } from 'vue'
import { 
  paginatedProducts, 
  totalPages, 
  filters 
} from '../composables/useProducts.vue'


const currentPage = computed({
  get: () => filters.value.page,
  set: (val) => { filters.value.page = val }
})
</script>

<template>
  <div class="container catalog">
    
    <div class="grid">
      <router-link 
        v-for="p in paginatedProducts" 
        :key="p.id" 
        :to="`/product/${p.id}`" 
        class="card"
      >
        <div class="img-box">
          <img :src="p.image" loading="lazy" alt="Product Image" />
          <span v-if="p.discount" class="tag">-{{ p.discount }}%</span>
          <span v-if="p.collection" class="coll-tag">{{ p.collection }}</span>
        </div>
        <div class="info">
          <h3>{{ p.name }}</h3>
          <p class="price">
            <span v-if="p.discount" class="old">{{ p.price }}₽</span> 
            {{ (p.price * (100 - p.discount) / 100).toFixed(0) }} ₽
          </p>
          <div class="meta">
            <span>⭐ {{ p.rating }}</span> 
            <span>{{ p.stock > 0 ? 'В наличии' : 'Под заказ' }}</span>
          </div>
        </div>
      </router-link>
    </div>

    <div class="pagination" v-if="totalPages > 1">
      <button @click="currentPage = 1" :disabled="currentPage === 1">«</button>
      <button 
        v-for="n in totalPages" 
        :key="n" 
        @click="currentPage = n" 
        :class="{ active: currentPage === n }"
      >
        {{ n }}
      </button>
      <button @click="currentPage = totalPages" :disabled="currentPage === totalPages">»</button>
    </div>
    
    <div v-if="paginatedProducts.length === 0" class="empty-state">
      <p>Товары не найдены 😔<br><small>Попробуйте изменить параметры поиска в шапке</small></p>
    </div>
  </div>
</template>

<style scoped>
.catalog { padding: 2rem 0; min-height: 60vh; }

.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 320px)); gap: 2.2rem; justify-content: center; max-width: 1100px; margin: 0 auto; }
.card { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; overflow: hidden; transition: transform 0.25s, box-shadow 0.25s; width: 100%; text-decoration: none; color: inherit; }
.card:hover { transform: translateY(-6px); box-shadow: 0 8px 24px rgba(0,0,0,0.4); border-color: var(--accent); }

.img-box { height: 340px; position: relative; }
.img-box img { width: 100%; height: 100%; object-fit: cover; }
.tag { position: absolute; top: 1rem; right: 1rem; background: var(--danger); color: #fff; padding: 4px 10px; font-weight: 800; font-size: 0.85rem; border-radius: 99px; z-index: 2; }
.coll-tag { position: absolute; top: 1rem; left: 1rem; background: var(--accent); color: #000; padding: 4px 8px; font-weight: 800; font-size: 0.75rem; border-radius: 4px; z-index: 2; text-transform: uppercase; }

.info { padding: 1.5rem; }
h3 { font-size: 1.2rem; margin-bottom: 0.5rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.price { font-weight: 800; color: var(--accent); font-size: 1.3rem; }
.old { text-decoration: line-through; color: var(--text-muted); font-weight: 400; margin-right: 0.5rem; font-size: 0.95em; }
.meta { font-size: 0.95rem; color: var(--text-muted); margin-top: 0.6rem; display: flex; justify-content: space-between; }

.pagination { display: flex; justify-content: center; gap: 0.6rem; margin-top: 3rem; }
.pagination button { background: var(--surface); border: 1px solid var(--border); padding: 0.8rem 1.2rem; border-radius: 14px; font-size: 1rem; cursor: pointer; color: var(--text); }
.pagination button.active { background: var(--accent); color: #000; border-color: var(--accent); font-weight: bold; }
.pagination button:disabled { opacity: 0.3; cursor: not-allowed; }

.empty-state { text-align: center; padding: 3rem; color: var(--text-muted); font-size: 1.2rem; }

@media (max-width: 768px) {
  .grid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; max-width: 100%; }
}
</style>