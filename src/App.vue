<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div id="app">
    <Header />
    <main class="main"><router-view /></main>
    <Footer />
  </div>
</template>

<style>
body { margin: 0; background: var(--bg); color: var(--text); font-family: var(--font); }
#app { display: flex; flex-direction: column; min-height: 100vh; }
.main { flex: 1; padding: 1rem; }
.accent { color: var(--accent); }
</style>
