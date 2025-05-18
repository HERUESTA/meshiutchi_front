<template>
  <div class="container">
    <div class="title-row">
      <h1 class="title">おすすめのレシピ</h1>
    </div>
    <div class="recipe-list">
      <NuxtLink
        v-for="(recipe, index) in recipes"
        :key="index"
        :to="`/recipes/${index}`"
        class="recipe-card"
      >
        <h2 class="recipe-title">{{ recipe.title }}</h2>
        <p class="recipe-description">{{ recipe.description }}</p>
        <!-- <div class="recipe-meta">
          <div class="meta-item">🕒 {{ recipe.durationMinutes }}分</div>
          <div class="meta-item">👥 {{ recipe.servings }}人前</div>
        </div> -->
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '@/components/pages/useApi'
import { useRouter } from 'vue-router'
const router = useRouter()

const { recipes } = useApi()
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
  cursor: pointer;
}

.recipe-card:hover {
  transform: scale(1.02);
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