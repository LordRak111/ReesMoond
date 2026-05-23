<script>
import { ref, computed, watch } from 'vue'
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

const STORAGE_KEY = 'reesmoond_products_data'
const ITEMS_PER_PAGE = 6

const COLLECTIONS = ['NEW DROP', 'URBAN ARMOR', 'DRILL SEASON']

function getRandomCollection() {
  return COLLECTIONS[Math.floor(Math.random() * COLLECTIONS.length)]
}

const defaultProducts = [
  // ВЕРХ (5)
  { id: 1, sku: 'DR-U01', name: 'Oversize Hoodie BLACKOUT', price: 5500, discount: 15, category: 'Верх', subcategory: 'Худи', collection: 'DRILL SEASON', desc: 'Плотный хлопок.', img: '🖤', image: b05, specs: { material: '80% хлопок' }, sizes: ['S','M','L','XL'], stock: 12, delivery: '1-3 дня', rating: 4.8, reviews: [], variants: ['Чёрный'], related: [2,6] },
  { id: 2, sku: 'DR-U02', name: 'Graphic Tee VOID', price: 2800, discount: 0, category: 'Верх', subcategory: 'Футболки', collection: 'NEW DROP', desc: 'Принт.', img: '👕', image: b03, specs: { material: '100% хлопок' }, sizes: ['S','M','L'], stock: 25, delivery: '1-2 дня', rating: 4.6, reviews: [], variants: ['Белый'], related: [1,3] },
  { id: 3, sku: 'DR-U03', name: 'Puffer Jacket ICE', price: 9800, discount: 10, category: 'Верх', subcategory: 'Куртки', collection: 'URBAN ARMOR', desc: 'Мембрана.', img: '🧥', image: b04, specs: { material: 'Нейлон' }, sizes: ['M','L'], stock: 8, delivery: '2-4 дня', rating: 4.9, reviews: [], variants: ['Чёрный'], related: [1,4] },
  { id: 4, sku: 'DR-U04', name: 'Longsleeve ECHO', price: 3200, discount: 5, category: 'Верх', subcategory: 'Лонгсливы', collection: 'DRILL SEASON', desc: 'Удлинённый силуэт.', img: '👤', image: b01, specs: { material: 'Хлопок' }, sizes: ['S','M','L'], stock: 18, delivery: '1-3 дня', rating: 4.5, reviews: [], variants: ['Серый'], related: [2,5] },
  { id: 5, sku: 'DR-U05', name: 'Vest TACTICAL', price: 4100, discount: 0, category: 'Верх', subcategory: 'Жилеты', collection: 'URBAN ARMOR', desc: 'Много карманов.', img: '🦺', image: b02, specs: { material: 'Кордура' }, sizes: ['M','L'], stock: 10, delivery: '2-3 дня', rating: 4.7, reviews: [], variants: ['Хаки'], related: [3,6] },

  // НИЗ (5)
  { id: 6, sku: 'DR-B01', name: 'Cargo Pants INDUSTRIAL', price: 6200, discount: 0, category: 'Низ', subcategory: 'Карго', collection: 'DRILL SEASON', desc: 'Широкий крой.', img: '👖', image: u05, specs: { material: 'Нейлон' }, sizes: ['30','32'], stock: 15, delivery: '2-4 дня', rating: 4.5, reviews: [], variants: ['Олива'], related: [1,7] },
  { id: 7, sku: 'DR-B02', name: 'Joggers DRIFT', price: 3800, discount: 10, category: 'Низ', subcategory: 'Джоггеры', collection: 'NEW DROP', desc: 'Эластичные манжеты.', img: '🏃', image: u02, specs: { material: 'Футер' }, sizes: ['S','M'], stock: 20, delivery: '1-2 дня', rating: 4.8, reviews: [], variants: ['Серый'], related: [2,8] },
  { id: 8, sku: 'DR-B03', name: 'Shorts CONCRETE', price: 2900, discount: 0, category: 'Низ', subcategory: 'Шорты', collection: 'URBAN ARMOR', desc: 'Сетчатая подкладка.', img: '🩳', image: u04, specs: { material: 'Полиэстер' }, sizes: ['S','M'], stock: 12, delivery: '1-3 дня', rating: 4.4, reviews: [], variants: ['Песочный'], related: [7,9] },
  { id: 9, sku: 'DR-B04', name: 'Wide Pants FLUX', price: 5100, discount: 5, category: 'Низ', subcategory: 'Широкие', collection: 'NEW DROP', desc: 'Плиссировка.', img: '👗', image: u03, specs: { material: 'Вискоза' }, sizes: ['S','M'], stock: 9, delivery: '2-4 дня', rating: 4.6, reviews: [], variants: ['Белый'], related: [8,10] },
  { id: 10, sku: 'DR-B05', name: 'Tech Trousers CORE', price: 6800, discount: 15, category: 'Низ', subcategory: 'Техно', collection: 'URBAN ARMOR', desc: 'Влагозащита.', img: '🛠️', image: u01, specs: { material: 'Рип-стоп' }, sizes: ['30','32'], stock: 7, delivery: '3-5 дней', rating: 4.9, reviews: [], variants: ['Графит'], related: [6,9] },

  // ОБУВЬ (5)
  { id: 11, sku: 'DR-S01', name: 'Tech Runner V2', price: 9800, discount: 10, category: 'Обувь', subcategory: 'Кроссовки', collection: 'NEW DROP', desc: 'Boost.', img: '👟', image: s02, specs: { material: 'Текстиль' }, sizes: ['40','41'], stock: 0, delivery: '5-7 дней', rating: 4.9, reviews: [], variants: ['Неон'], related: [12,13] },
  { id: 12, sku: 'DR-S02', name: 'Combat Boots RIGID', price: 11500, discount: 0, category: 'Обувь', subcategory: 'Ботинки', collection: 'URBAN ARMOR', desc: 'Кожа.', img: '🥾', image: s03, specs: { material: 'Кожа' }, sizes: ['41','42'], stock: 6, delivery: '3-5 дней', rating: 4.7, reviews: [], variants: ['Коричневый'], related: [11,14] },
  { id: 13, sku: 'DR-S03', name: 'Slides DRAIN', price: 2200, discount: 5, category: 'Обувь', subcategory: 'Сланцы', collection: 'DRILL SEASON', desc: 'EVA.', img: '🩴', image: s01, specs: { material: 'EVA' }, sizes: ['40-41'], stock: 30, delivery: '1-2 дня', rating: 4.3, reviews: [], variants: ['Белый'], related: [11,15] },
  { id: 14, sku: 'DR-S04', name: 'High-Tops STRIDE', price: 8900, discount: 0, category: 'Обувь', subcategory: 'Кеды', collection: 'NEW DROP', desc: 'Канвас.', img: '👞', image: s05, specs: { material: 'Канвас' }, sizes: ['39','40'], stock: 11, delivery: '2-4 дня', rating: 4.8, reviews: [], variants: ['Красный'], related: [12,15] },
  { id: 15, sku: 'DR-S05', name: 'Trail Walkers GRIP', price: 10200, discount: 10, category: 'Обувь', subcategory: 'Треккинговые', collection: 'URBAN ARMOR', desc: 'Мембрана.', img: '🏔️', image: s04, specs: { material: 'Нубук' }, sizes: ['41','42'], stock: 8, delivery: '3-5 дней', rating: 4.6, reviews: [], variants: ['Хаки'], related: [13,14] },

  // АКСЕССУАРЫ (5)
  { id: 16, sku: 'DR-A01', name: 'Snapback SHADOW', price: 1800, discount: 0, category: 'Аксессуары', subcategory: 'Кепки', collection: 'DRILL SEASON', desc: 'Плоский козырёк.', img: '🧢', image: a04, specs: { material: 'Хлопок' }, sizes: ['ONE SIZE'], stock: 40, delivery: '1-2 дня', rating: 4.4, reviews: [], variants: ['Белый'], related: [17,18] },
  { id: 17, sku: 'DR-A02', name: 'Beanie FROST', price: 1500, discount: 10, category: 'Аксессуары', subcategory: 'Шапки', collection: 'URBAN ARMOR', desc: 'Вязка.', img: '🧶', image: a02, specs: { material: 'Акрил' }, sizes: ['ONE SIZE'], stock: 25, delivery: '1-3 дня', rating: 4.5, reviews: [], variants: ['Серый'], related: [16,19] },
  { id: 18, sku: 'DR-A03', name: 'Crossbody TACTIC', price: 2400, discount: 0, category: 'Аксессуары', subcategory: 'Сумки', collection: 'NEW DROP', desc: 'Компактная.', img: '🎒', image: a01, specs: { material: 'Нейлон' }, sizes: ['ONE SIZE'], stock: 15, delivery: '2-3 дня', rating: 4.7, reviews: [], variants: ['Олива'], related: [16,20] },
  { id: 19, sku: 'DR-A04', name: 'Chain LINK', price: 3100, discount: 5, category: 'Аксессуары', subcategory: 'Украшения', collection: 'DRILL SEASON', desc: 'Сталь.', img: '⛓️', image: a05, specs: { material: 'Сталь' }, sizes: ['50cm'], stock: 10, delivery: '1-2 дня', rating: 4.8, reviews: [], variants: ['Чёрное'], related: [17,20] },
  { id: 20, sku: 'DR-A05', name: 'Gloves GRIP', price: 1900, discount: 0, category: 'Аксессуары', subcategory: 'Перчатки', collection: 'URBAN ARMOR', desc: 'Сенсорные.', img: '🧤', image: a03, specs: { material: 'Кожа' }, sizes: ['S','M'], stock: 20, delivery: '2-3 дня', rating: 4.5, reviews: [], variants: ['Серый'], related: [18,19] }
]

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    let products = raw ? JSON.parse(raw) : defaultProducts
    
  
    products.forEach(p => {
      if (!p.collection) p.collection = getRandomCollection()
    })
    
    return products
  } catch {
    return defaultProducts.map(p => ({ ...p, collection: getRandomCollection() }))
  }
}

export const products = ref(load())
export const filters = ref({ query: '', category: 'Все', sub: 'Все', sort: 'default', page: 1, collection: 'Все' })
export const collections = ['Все', ...COLLECTIONS]

watch(products, v => localStorage.setItem(STORAGE_KEY, JSON.stringify(v)), { deep: true })

export const categories = computed(() => ['Все', ...new Set(products.value.map(p => p.category))])

export const subcategories = computed(() => {
  if (filters.value.category === 'Все') return ['Все']
  return ['Все', ...new Set(products.value.filter(p => p.category === filters.value.category).map(p => p.subcategory))]
})

export const filteredProducts = computed(() => {
  let res = [...products.value]
  
  
  if (filters.value.category !== 'Все') res = res.filter(p => p.category === filters.value.category)
  if (filters.value.sub !== 'Все') res = res.filter(p => p.subcategory === filters.value.sub)
  if (filters.value.collection !== 'Все') res = res.filter(p => p.collection === filters.value.collection)
  
  if (filters.value.query.trim()) {
    const q = filters.value.query.toLowerCase().trim()
    res = res.filter(p => {
     
      if (p.name && p.name.toLowerCase().includes(q)) return true
   
      if (p.sku && p.sku.toLowerCase().includes(q)) return true
      
      if (p.desc && p.desc.toLowerCase().includes(q)) return true
      
      if (p.specs && p.specs.material && p.specs.material.toLowerCase().includes(q)) return true
      
      return false
    })
  }
  
  
  const s = filters.value.sort
  if (s === 'price-asc') res.sort((a,b) => a.price - b.price)
  else if (s === 'price-desc') res.sort((a,b) => b.price - a.price)
  else if (s === 'rating') res.sort((a,b) => b.rating - a.rating)
  else if (s === 'new') res.sort((a,b) => b.id - a.id)
  
  return res
})

export const paginatedProducts = computed(() => {
  const start = (filters.value.page - 1) * ITEMS_PER_PAGE
  return filteredProducts.value.slice(start, start + ITEMS_PER_PAGE)
})

export const totalPages = computed(() => Math.ceil(filteredProducts.value.length / ITEMS_PER_PAGE))

export function getProductById(id) { return products.value.find(p => p.id == id) }
export function updateProduct(id, data) {
  const i = products.value.findIndex(p => p.id == id)
  if (i !== -1) products.value[i] = { ...products.value[i], ...data }
}
export function addProduct(product) { products.value.push({ id: Date.now(), img: '📦', image: '', reviews: [], ...product }) }
export function removeProduct(id) { products.value = products.value.filter(p => p.id !== id) }
export function addReview(productId, review) {
  const p = getProductById(productId)
  if (p && review.text.trim()) {
    p.reviews.push({ id: Date.now(), date: new Date().toLocaleDateString(), ...review })
    p.rating = parseFloat((p.reviews.reduce((s,r) => s+r.stars, 0) / p.reviews.length).toFixed(1))
  }
}
</script>

<template></template>