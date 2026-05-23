<script setup>
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section brand-block">
        <p class="copyright">© 2026 ReesMoond</p>
      </div>
      
      <div class="footer-section contacts">
        <h4>Контакты</h4>
        <a href="tel:+79110891645" class="contact-link">📞 +7 (911) 089-16-45</a>
        <p class="contact-link">📍 г. Москва, 3-я улица Ямского поля, д. 28</p>
      </div>

      <div class="footer-section socials">
        <h4>Мы в соцсетях</h4>
        <div class="social-icons">
          <a href="https://t.me/reesmoond" target="_blank" class="social-btn">TG</a>
          <a href="https://wa.me/79110891645" target="_blank" class="social-btn">WA</a>
          <a href="https://vk.com/reesmoond" target="_blank" class="social-btn">VK</a>
        </div>
      </div>

      <div class="footer-section links">
        <h4>Навигация</h4>
        <router-link to="/catalog">Каталог</router-link>
        <router-link to="/about">О нас</router-link>
        <router-link to="/faq">FAQ</router-link>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--surface);
  border-top: 1px solid var(--border);
  padding: 3rem 0;
  margin-top: auto;
}
.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2.5rem;
  align-items: start;
}
.footer-section h4 { font-size: 1.25rem; margin-bottom: 1.2rem; color: var(--text); }
.footer-section p, .footer-section a { color: var(--text-muted); font-size: 1.05rem; line-height: 1.7; margin-bottom: 0.5rem; display: block; }
.footer-section a { text-decoration: none; transition: color 0.2s; }
.footer-section a:hover { color: var(--accent); }
.copyright { opacity: 0.6; font-size: 0.9rem; margin-top: 0.5rem; }
.social-icons { display: flex; gap: 0.8rem; margin-top: 0.3rem; }
.social-btn {
  width: 46px; height: 46px;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg); border: 1px solid var(--border);
  border-radius: 14px; color: var(--text); font-weight: 700; font-size: 0.95rem;
  transition: all 0.25s;
}
.social-btn:hover { background: var(--accent); color: #000; border-color: var(--accent); transform: translateY(-3px); }
@media (max-width: 768px) {
  .footer-content { grid-template-columns: 1fr; text-align: center; }
  .social-icons { justify-content: center; }
}
</style>