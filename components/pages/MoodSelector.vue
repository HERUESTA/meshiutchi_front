<template>
  <div class="mood-selector">
    <h2 class="title">今日の元気度合いは？</h2>
    <p class="subtitle">あなたの気分に合わせたレシピを提案します</p>
    <div v-if="emoji" class="emoji">{{ emoji }}</div>
    
    <div class="mood-buttons">
      <button
        v-for="mood in moods"
        :key="mood.id"
        @click="selectMood(mood.label)"
        class="mood-button"
        :class="{ selected: selectedMood === mood.label }"
      >
        {{ mood.label }}
      </button>
    </div>

    <button class="confirm-button" @click="confirmMood">決定</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/components/pages/useApi'

const moods = ref([
  { id: 1, label: '元気' },
  { id: 2, label: 'まあまあ元気' },
  { id: 3, label: '普通' },
  { id: 4, label: 'まあまあ疲れた' },
  { id: 5, label: '疲れた' }
])

const selectedMood = ref<string | null>(null)
const emoji = ref<string | null>(null)
const router = useRouter()

const { fetchRecipesByMood, error, isLoading } = useApi()

const getEmojiForMood = (mood: string): string => {
  switch (mood) {
    case '元気':
      return '💪😆'
    case 'まあまあ元気':
      return '😊'
    case '普通':
      return '😐'
    case 'まあまあ疲れた':
      return '😓'
    case '疲れた':
      return '🥱'
    default:
      return ''
  }
}

const selectMood = (mood: string) => {
  selectedMood.value = mood
  emoji.value = getEmojiForMood(mood)
}

const confirmMood = async () => {
  if (!selectedMood.value) {
    alert('気分を選択してください')
    return
  }

  await fetchRecipesByMood(selectedMood.value)

  if (error.value) {
    alert(error.value)
    return
  }

  // 成功時に /recipes ページに遷移
  router.push('/recipes')
}
</script>

<style scoped>
.mood-selector {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 2rem 1rem;
  max-width: 400px;
  margin: auto;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.subtitle {
  margin-bottom: 1.5rem;
  color: #555;
}

.emoji {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.mood-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.mood-button {
  padding: 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid #f0a04b;
  background-color: white;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.mood-button.selected {
  background-color: #ffe0b2;
  font-weight: bold;
}

.confirm-button {
  padding: 0.75rem 2rem;
  background-color: #7be36d;
  color: #000;
  font-weight: bold;
  font-size: 1.1rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.confirm-button:hover {
  background-color: #6dd25d;
}
</style>