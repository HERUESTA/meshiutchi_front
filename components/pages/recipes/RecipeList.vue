<template>
  <div class="container">
    <div class="title-row">
      <h1 class="title">おすすめのレシピ</h1>
    </div>
    <div class="recipe-list">
      <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card">
        <h2 class="recipe-title">{{ recipe.title }}</h2>
        <p class="recipe-description">{{ recipe.description }}</p>
        <div class="recipe-meta">
          <div class="meta-item">🕒 {{ recipe.durationrationMinutes }}分</div>
          <div class="meta-item">👥 {{ recipe.servings }}人前</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const recipes = ref([
  { id: 1, title: 'レシピ1', description: '説明1', durationrationMinutes: 30, servings: 2 },
  { id: 2, title: 'レシピ2', description: '説明2', durationrationMinutes: 45, servings: 3 },
  { id: 3, title: 'レシピ3', description: '説明3', durationrationMinutes: 60, servings: 4 },
  { id: 4, title: 'レシピ4', description: '説明4', durationrationMinutes: 15, servings: 1 },
  { id: 5, title: 'レシピ5', description: '説明5', durationrationMinutes: 20, servings: 4 },
]);
</script>

<style scoped>
.container {
  min-height: 100vh;
  padding: 2rem 1rem;
  max-width: 400px;
  margin: auto;
  font-family: sans-serif;
}

.title-row {
  display: flex;
  align-items: center;
  padding: 16px;
}

.back-arrow {
  font-size: 20px;
  margin-right: 8px;
  cursor: pointer;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.recipe-list {
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.recipe-card {
  border: 1px solid #f4a940;
  border-radius: 12px;
  padding: 16px;
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.recipe-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 4px;
}

.recipe-description {
  font-size: 14px;
  color: #666;
  margin: 0 0 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recipe-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #888;
}
</style>