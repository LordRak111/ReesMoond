<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { products, addProduct, updateProduct, removeProduct, collections } from '../composables/useProducts.vue'
import { addAdmin, currentUser } from '../composables/useUsers.vue'
import u01 from '../assets/images/u01.jpg'
import u02 from '../assets/images/u02.jpeg'
import u03 from '../assets/images/u03.jpeg'
import u04 from '../assets/images/u04.jpeg'
import u05 from '../assets/images/u05.jpeg'
import b01 from '../assets/images/b01.jpg'
import b02 from '../assets/images/b02.jpg'
import b03 from '../assets/images/b03.jpeg'
import b04 from '../assets/images/b04.jpeg'
import b05 from '../assets/images/b05.jpg'
import s01 from '../assets/images/s01.jpeg'
import s02 from '../assets/images/s02.jpg'
import s03 from '../assets/images/s03.jpg'
import s04 from '../assets/images/s04.jpg'
import s05 from '../assets/images/s05.jpg'
import a01 from '../assets/images/a01.jpeg'
import a02 from '../assets/images/a02.jpeg'
import a03 from '../assets/images/a03.jpg'
import a04 from '../assets/images/a04.jpg'
import a05 from '../assets/images/a05.jpg'

const availableImages = [
  { name: 'u01.jpg', path: u01 },
  { name: 'u02.jpeg', path: u02 },
  { name: 'u03.jpeg', path: u03 },
  { name: 'u04.jpeg', path: u04 },
  { name: 'u05.jpeg', path: u05 },
  { name: 'b01.jpg', path: b01 },
  { name: 'b02.jpg', path: b02 },
  { name: 'b03.jpeg', path: b03 },
  { name: 'b04.jpeg', path: b04 },
  { name: 'b05.jpg', path: b05 },
  { name: 's01.jpeg', path: s01 },
  { name: 's02.jpg', path: s02 },
  { name: 's03.jpg', path: s03 },
  { name: 's04.jpg', path: s04 },
  { name: 's05.jpg', path: s05 },
  { name: 'a01.jpeg', path: a01 },
  { name: 'a02.jpeg', path: a02 },
  { name: 'a03.jpg', path: a03 },
  { name: 'a04.jpg', path: a04 },
  { name: 'a05.jpg', path: a05 },
]

const router = useRouter()

onMounted(() => {
  if (!currentUser.value || (currentUser.value.role !== 'admin' && currentUser.value.role !== 'superadmin')) {
    router.replace({ name: '404', query: { r: 'access' } })
  }
})

const newProd = ref({ 
  name: '', price: '', discount: 0, category: '', subcategory: '', desc: '', sku: '', collection: 'NEW DROP', image: '' 
})

const editingId = ref(null)
const editForm = ref({})

const adminForm = ref({ email: '', password: '' })
const adminMsg = ref('')
const adminErrorMsg = ref('')

function handleAdd() {
  if (!newProd.value.name || !newProd.value.price || !newProd.value.category) {
    adminErrorMsg.value = 'Заполните название, цену и выберите категорию'
    setTimeout(() => { adminErrorMsg.value = '' }, 3000)
    return
  }
  

  
  addProduct({
    ...newProd.value,
    price: Number(newProd.value.price),
    discount: Number(newProd.value.discount) || 0, // Гарантируем число
    stock: 10, delivery: '1-3 дня', rating: 0, reviews: [], sizes: ['S','M','L'], specs: {}
  })
  
  newProd.value = { name: '', price: '', discount: 0, category: '', subcategory: '', desc: '', sku: '', collection: 'NEW DROP', image: '' }
  adminErrorMsg.value = ''
}

function startEdit(p) {
  editingId.value = p.id
  editForm.value = { ...p, discount: p.discount || 0 }
}

function saveEdit(id) {
  if (!editForm.value.name || !editForm.value.price || !editForm.value.category) {
    adminErrorMsg.value = 'Заполните название, цену и выберите категорию'
    setTimeout(() => { adminErrorMsg.value = '' }, 3000)
    return
  }
  
  updateProduct(id, { 
    ...editForm.value, 
    price: Number(editForm.value.price), 
    discount: Number(editForm.value.discount) || 0 
  })
  
  editingId.value = null
  adminErrorMsg.value = ''
}

function addNewAdmin() {
  if (!adminForm.value.email.trim() || !adminForm.value.password.trim()) {
    adminMsg.value = 'Заполните все поля'
    return
  }
  const res = addAdmin(adminForm.value.email, adminForm.value.password, currentUser.value.username)
  adminMsg.value = res.msg
  if (res.ok) adminForm.value = { email: '', password: '' }
}
</script>

<template>
  <div class="container admin">
    <h1>Админ-панель</h1>
    
    <p v-if="adminErrorMsg" class="error-msg">{{ adminErrorMsg }}</p>

    <div v-if="currentUser?.role === 'superadmin'" class="card">
      <h3>➕ Добавить админа</h3>
      <p v-if="adminMsg" :class="adminMsg.includes('успешно') ? 'success' : 'error'">{{ adminMsg }}</p>
      <div class="form-row">
        <input v-model="adminForm.email" placeholder="Email нового админа" />
        <input v-model="adminForm.password" type="password" placeholder="Пароль" />
        <button class="btn-primary" @click="addNewAdmin">Создать</button>
      </div>
    </div>

    <div class="card">
      <h3>📦 Добавить товар</h3>
      <div class="form-grid">
        <input v-model="newProd.sku" placeholder="SKU" class="input" />
        <input v-model="newProd.name" placeholder="Название" class="input" />
        
  
        <div class="price-discount-group">
          <input v-model.number="newProd.price" type="number" placeholder="Цена" class="input" />
          <input v-model.number="newProd.discount" type="number" placeholder="Скидка %" class="input discount-input" min="0" max="100" />
        </div>
        
        <select v-model="newProd.category" class="input">
          <option disabled value="">Выберите категорию</option>
          <option v-for="cat in ['Верх', 'Низ', 'Обувь', 'Аксессуары']" :key="cat">{{ cat }}</option>
        </select>
        
        <select v-model="newProd.collection" class="input">
          <option v-for="c in collections" :key="c" v-show="c !== 'Все'">{{ c }}</option>
        </select>

        <input v-model="newProd.subcategory" placeholder="Подкатегория" class="input" />
        <input v-model="newProd.desc" placeholder="Описание" class="input" />
        
        <!-- 🔹 ВЫБОР КАРТИНКИ ИЗ СПИСКА -->
        <select v-model="newProd.image" class="input">
          <option disabled value="">Выберите фото</option>
          <option v-for="img in availableImages" :key="img.path" :value="img.path">
            {{ img.name }}
          </option>
        </select>
      </div>
      <button @click="handleAdd" class="btn-add">Добавить</button>
    </div>

    <div class="card">
      <h3>📋 Каталог ({{ products.length }})</h3>
      <ul class="product-list">
        <li v-for="p in products" :key="p.id" class="list-item" :class="{ editing: editingId === p.id }">
          <template v-if="editingId !== p.id">
            <div class="item-preview">
              <img v-if="p.image" :src="p.image" class="thumb" />
              <span v-else class="thumb-emoji">{{ p.sku }}</span>
              <div class="item-info">
                <strong>{{ p.name }}</strong>
                <span class="badge-coll">{{ p.collection }}</span>
                <span v-if="p.discount" class="badge-disc">-{{ p.discount }}%</span>
                <span>{{ p.category }} • {{ p.price }} ₽</span>
              </div>
            </div>
            <div class="item-actions">
              <button @click="startEdit(p)" class="btn-edit">Изменить</button>
              <button @click="removeProduct(p.id)" class="btn-del">Удалить</button>
            </div>
          </template>
          
          <template v-else>
            <div class="edit-grid">
              <input v-model="editForm.sku" class="input" placeholder="SKU" />
              <input v-model="editForm.name" class="input" placeholder="Название" />
              
    
              <div class="price-discount-group">
                <input v-model.number="editForm.price" type="number" class="input" placeholder="Цена" />
                <input v-model.number="editForm.discount" type="number" class="input discount-input" placeholder="Скидка %" min="0" max="100" />
              </div>
              
              <select v-model="editForm.category" class="input">
                <option disabled value="">Категория</option>
                <option v-for="cat in ['Верх', 'Низ', 'Обувь', 'Аксессуары']" :key="cat">{{ cat }}</option>
              </select>

              <select v-model="editForm.collection" class="input">
                <option v-for="c in collections" :key="c" v-show="c !== 'Все'">{{ c }}</option>
              </select>

              <input v-model="editForm.subcategory" class="input" placeholder="Подкатегория" />
              <input v-model="editForm.desc" class="input" placeholder="Описание" />
              
           
              <select v-model="editForm.image" class="input">
                <option disabled value="">Выберите фото</option>
                <option v-for="img in availableImages" :key="img.path" :value="img.path">
                  {{ img.name }}
                </option>
              </select>
            </div>
            <div class="edit-actions">
              <button @click="saveEdit(p.id)" class="btn-save">Сохранить</button>
              <button @click="editingId = null" class="btn-cancel">Отмена</button>
            </div>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.admin { padding: 2rem 0; }
.card { background: var(--surface); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem; border: 1px solid var(--border); }
.form-row { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.8rem; margin-bottom: 1rem; }

/* Группа цена + скидка */
.price-discount-group {
  display: flex;
  gap: 0.5rem;
}
.discount-input {
  width: 80px;
}

.input { padding: 0.8rem 1rem; border: 1px solid var(--border); border-radius: var(--radius-md); background: var(--bg); color: var(--text); font-size: 1rem; }

.btn-add { width: 100%; padding: 0.9rem; background: #27ae60; color: white; border: none; border-radius: var(--radius-md); cursor: pointer; font-size: 1.05rem; font-weight: 600; }
.product-list { list-style: none; padding: 0; }
.list-item { padding: 1rem; border-bottom: 1px solid var(--border); background: var(--bg); border-radius: var(--radius-md); margin-bottom: 0.8rem; }
.list-item.editing { background: #0f1a1a; border: 1px solid var(--accent); }
.item-preview { display: flex; align-items: center; gap: 1rem; }
.thumb { width: 70px; height: 70px; object-fit: cover; border-radius: var(--radius-md); }
.thumb-emoji { width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; background: var(--surface); border-radius: var(--radius-md); font-size: 1.8rem; }
.item-info { display: flex; flex-direction: column; }
.badge-coll { font-size: 0.7rem; background: var(--accent); color: #000; padding: 2px 6px; border-radius: 4px; width: fit-content; margin-bottom: 4px; font-weight: bold; }
.badge-disc { font-size: 0.7rem; background: var(--danger); color: #fff; padding: 2px 6px; border-radius: 4px; width: fit-content; margin-bottom: 4px; font-weight: bold; }

.item-actions, .edit-actions { display: flex; gap: 0.6rem; margin-top: 0.8rem; }
.btn-edit { background: #f39c12; color: white; border: none; padding: 0.5rem 1rem; border-radius: var(--radius-sm); cursor: pointer; font-weight: 500; }
.btn-del { background: #e74c3c; color: white; border: none; padding: 0.5rem 1rem; border-radius: var(--radius-sm); cursor: pointer; font-weight: 500; }
.btn-save { background: #2ecc71; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: var(--radius-md); cursor: pointer; font-weight: 600; }
.btn-cancel { background: #95a5a6; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: var(--radius-md); cursor: pointer; font-weight: 600; }
.success { color: var(--accent); margin-bottom: 0.5rem; }
.error { color: var(--danger); margin-bottom: 0.5rem; }
.error-msg { color: var(--danger); background: rgba(255, 51, 51, 0.1); padding: 0.8rem; border-radius: var(--radius-md); margin-bottom: 1rem; text-align: center; font-weight: 600; border: 1px solid rgba(255, 51, 51, 0.2); }
</style>