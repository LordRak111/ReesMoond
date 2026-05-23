<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import slide1 from '../assets/images/slide3.jpg'
import slide2 from '../assets/images/slide2.jpg'
import slide3 from '../assets/images/slide1.jpg'

const router = useRouter()

const slides = [
  { id: 1, img: slide1, title: 'URBAN ARMOR ', link: '/catalog?collection=DRILL SEASON' },
  { id: 2, img: slide2, title: 'NEW DROP', link: '/catalog?collection=NEW DROP' },
  { id: 3, img: slide3, title: 'DRILL SEASON', link: '/catalog?collection=URBAN ARMOR' }
]

const cur = ref(0)

let timer = setInterval(() => { 
  cur.value = (cur.value + 1) % slides.length 
}, 5000)

function goToSlide(index) {
  cur.value = index
  clearInterval(timer)
  timer = setInterval(() => { 
    cur.value = (cur.value + 1) % slides.length 
  }, 5000)
}

function go(link) { 
  router.push(link) 
}
</script>

<template>
  <div class="banner">
    <transition-group name="fade" tag="div">
      <div 
        v-for="(slide, index) in slides" 
        :key="slide.id"
        v-show="index === cur"
        class="slide" 
        :style="{ backgroundImage: `url(${slide.img})` }"
      >
        <div class="overlay">
          <h1>{{ slide.title }}</h1>
        </div>
      </div>
    </transition-group>

    <div class="dots">
      <span 
        v-for="(_, i) in slides" 
        :key="i" 
        :class="{ active: i === cur }" 
        @click="goToSlide(i)"
      ></span>
    </div>
  </div>
</template>

<style scoped>
.banner { 
  position: relative; 
  height: 70vh; 
  min-height: 500px; 
  background: #000; 
  overflow: hidden;
}
.slide { 
  position: absolute; 
  inset: 0; 
  background-size: cover; 
  background-position: center; 
}
.fade-enter-active, .fade-leave-active { transition: opacity 1s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.overlay { 
  position: absolute; 
  inset: 0; 
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: flex-end; 
  padding-bottom: 5rem; 
  pointer-events: none; 
}
.overlay .btn-primary {
  pointer-events: auto;
}

h1 { 
  font-size: clamp(3rem, 8vw, 6rem); 
  font-weight: 900; 
  color: #fff; 
  text-align: center; 
  margin-bottom: 1.5rem; 
  letter-spacing: 4px; 
  text-shadow: 0 4px 10px rgba(0,0,0,0.5);
}
.dots { 
  position: absolute; 
  bottom: 2rem; 
  left: 50%; 
  transform: translateX(-50%); 
  display: flex; 
  gap: 1rem; 
  z-index: 10; 
}
.dots span { 
  width: 14px; 
  height: 14px; 
  background: rgba(255,255,255,0.3); 
  border-radius: 50%; 
  cursor: pointer; 
  transition: all 0.3s; 
  pointer-events: auto; /* Точки тоже должны быть кликабельны */
}
.dots span.active { 
  background: var(--accent); 
  transform: scale(1.2); 
  box-shadow: 0 0 10px var(--accent); 
}
</style>