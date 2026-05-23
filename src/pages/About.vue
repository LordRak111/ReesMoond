<script setup>
</script>

<template>
  <div class="container about">
    <h1>О нас</h1>
    
    <div class="info-card">
      <p>REESMOOND — это бренд уличной одежды в стиле Drill, созданный для тех, кто ценит качество, стиль и индивидуальность. Мы работаем с 2024 года и предлагаем коллекции, вдохновлённые духом улиц, музыкой и современной культурой.</p>
      <h3>Наши ценности</h3>
      <ul>
        <li>Премиальные материалы и усиленные швы</li>
        <li>Уникальный крой под оверсайз-фит</li>
        <li>Быстрая доставка по РФ и СНГ</li>
        <li>Честная политика возврата</li>
      </ul>
    </div>

    <div class="info-card">
      <h3>📦 Доставка и возврат</h3>
      <div class="delivery-grid">
        <div class="delivery-item">
          <h4>Сроки</h4>
          <p>Москва: 1-2 дня<br>Регионы: 3-7 дней</p>
        </div>
        <div class="delivery-item">
          <h4>Стоимость</h4>
          <p>Бесплатно от 5 000 ₽<br>Стандарт: 350 ₽</p>
        </div>
        <div class="delivery-item">
          <h4>Возврат</h4>
          <p>14 дней на обмен/возврат<br>Без вопросов и комиссий</p>
        </div>
      </div>
    </div>

    <div class="contact-card">
      <h3>📍 Как нас найти</h3>
      <div class="contact-grid">
        <div class="contact-item">
          <h4>Телефон</h4>
          <a href="tel:+79110891645">+7 (911) 089-16-45</a>
        </div>
        <div class="contact-item">
          <h4>Адрес шоурума</h4>
          <p>г. Москва, 3-я улица Ямского поля, д. 28</p>
        </div>
        <div class="contact-item">
          <h4>График работы</h4>
          <p>Пн–Вс: 10:00 – 22:00</p>
        </div>
      </div>
      <div class="map-container">
        <iframe 
          src="https://www.openstreetmap.org/export/embed.html?bbox=37.5820,55.7830,37.5920,55.7870&layer=mapnik&marker=55.7850,37.5870" 
          width="100%" height="380" frameborder="0"
          style="border: 1px solid var(--border); border-radius: var(--radius-lg);">
        </iframe>
        <a href="https://yandex.ru/maps/?text=3-я+улица+Ямского+поля+д.+28+Москва" target="_blank" class="map-link">
          Открыть в Яндекс.Картах →
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about { padding: 2rem 0 4rem; max-width: 1000px; margin: 0 auto; }
.info-card, .contact-card {
  background: var(--surface);
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  margin-bottom: 2rem;
}
p, li { color: var(--text); line-height: 1.8; margin-bottom: 0.8rem; font-size: 1.1rem; }
ul { margin-left: 1.8rem; margin-bottom: 1.5rem; }
h3 { margin-bottom: 1.5rem; font-size: 1.7rem; }

.delivery-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 1rem;
}
.delivery-item {
  background: var(--bg); padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid var(--border);
}
.delivery-item h4 { color: var(--accent); margin-bottom: 0.5rem; font-size: 1.1rem; }

.contact-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;
}
.contact-item {
  background: var(--bg); padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid var(--border);
}
.contact-item h4 { color: var(--accent); margin-bottom: 0.5rem; font-size: 1.05rem; }
.contact-item p, .contact-item a { color: var(--text); font-size: 1.1rem; line-height: 1.5; }
.contact-item a { text-decoration: none; transition: color 0.2s; }
.contact-item a:hover { color: var(--accent); text-decoration: underline; }

.map-container { margin-top: 1.5rem; }
.map-link { display: block; text-align: center; margin-top: 1rem; color: var(--accent); font-weight: 600; transition: opacity 0.2s; }
.map-link:hover { opacity: 0.8; }

@media (max-width: 600px) {
  .info-card, .contact-card { padding: 1.5rem; }
  .delivery-grid, .contact-grid { grid-template-columns: 1fr; }
}
</style>