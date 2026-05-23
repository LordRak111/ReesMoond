<script setup></script>

<template>
  <div class="container faq">
    <h1>Частые вопросы</h1>
    <details><summary>Как оформить заказ?</summary><p>Добавьте товары в корзину, перейдите к оформлению и заполните данные доставки.</p></details>
    <details><summary>Какие способы оплаты доступны?</summary><p>Банковская карта, наличные при получении, криптовалюты.</p></details>
    <details><summary>Как вернуть товар?</summary><p>Напишите в поддержку в личном кабинете в течение 14 дней после получения.</p></details>
    <details><summary>Доставка по регионам?</summary><p>Доставляем по всей России и странам СНГ. Сроки: 1-7 дней в зависимости от региона.</p></details>
  </div>
</template>

<style scoped>
.faq { padding: 2rem 0; max-width: 800px; margin: 0 auto; }
details { background: var(--surface); padding: 1rem; border-radius: 6px; margin-bottom: 0.5rem; cursor: pointer; }
summary { font-weight: 600; }
p { margin-top: 0.5rem; color: var(--muted); }
</style>