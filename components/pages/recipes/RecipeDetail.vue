<template>
  <div class="recipe-detail">
    <!-- ヘッダー -->
    <div class="header">
      <div class="main-title">{{ recipe.title }}</div>
    </div>

    <!-- <div class="meta">
      <span>🕒 {{ recipe.durationMinutes }}分</span>
      <span>👥 {{ recipe.servings }}人前</span>
    </div> -->

    <p class="description">{{ recipe.description }}</p>

    <!-- タブ -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="selectedTab = tab"
        :class="{ active: selectedTab === tab }"
      >
        {{ tab }}
      </button>
    </div>

    <!-- タブの中身 -->
    <div class="tab-content">
      <!-- 材料 -->
      <div v-if="selectedTab === '材料'" class="card">
        <div class="section-title">
          🥕 材料 
        <!-- <span class="people">2人前</span> -->
        </div>
        <div class="ingredients">
          <div v-for="(item, index) in ingredients" :key="index" class="ingredient-row">
            <label class="ingredient-check">
              <input type="checkbox" v-model="ingredientStates[index]" />
              <span :class="{ checked: ingredientStates[index] }">{{ item }}</span>
            </label>
            <!-- <span class="amount">{{ item.amount }}</span> -->
          </div>
        </div>
      </div>

      <!-- 作り方 -->
      <div v-if="selectedTab === '作り方'" class="card">
        <div class="section-title">🍳 作り方</div>
        <div class="steps-container">
          <div v-for="(step, index) in steps" :key="index" class="step-item">
            <button
              class="circle-button"
              :class="{ done: stepStates[index] }"
              @click="stepStates[index] = !stepStates[index]"
            >
              {{ stepStates[index] ? '✓' : index + 1 }}
            </button>
            <p class="step-text">{{ step }}</p>
          </div>

          <!-- 完成モーダル -->
          <div v-if="showModal" class="modal-overlay">
            <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
              <p id="modal-title">🎉 全ての手順が完了しました！<br>完成しましたか？</p>
              <button @click="showModal = false; showCelebration = true">はい</button>
            </div>
          </div>
          
          <!-- 褒めモーション -->
          <div v-if="showCelebration" class="celebration">
            🎉 よく頑張りました！<br>お疲れさまでした👏🥳
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, toRef } from 'vue'
import type { Recipe } from '@/types/Recipe'

const props = defineProps<{ recipe: Recipe }>()
const recipe = toRef(props, 'recipe')

const tabs = ['材料', '作り方']
const selectedTab = ref('材料')

// ingredients, steps を recipe から取り出す
const ingredients = computed(() => recipe.value.ingredients ?? [])
console.log('ingredients', ingredients.value)
const steps = computed(() => recipe.value.steps ?? [])

const ingredientStates = ref<boolean[]>(ingredients.value.map(() => false))
const stepStates = ref<boolean[]>(steps.value.map(() => false))

const allStepsDone = computed(() => stepStates.value.every(done => done))

const showModal = ref(false)
const showCelebration = ref(false)

watch(allStepsDone, (done) => {
  showModal.value = done
})
</script>


<style scoped>
.recipe-detail {
  max-width: 400px;
  margin: auto;
  font-family: sans-serif;
  background: #fff;
  padding-bottom: 2rem;
}

.header {
  background: #f4a940;
  padding: 1rem;
  color: #fff;
}

.main-title {
  font-size: 20px;
  font-weight: bold;
}

.meta {
  display: flex;
  gap: 1rem;
  margin: 1rem;
  font-size: 14px;
  color: #555;
}

.description {
  font-size: 13px;
  margin: 0 1rem;
  color: #666;
}

.tabs {
  display: flex;
  margin: 1rem;
  background: #fcefdc;
  border-radius: 12px;
  overflow: hidden;
}

.tabs button {
  flex: 1;
  padding: 0.5rem;
  border: none;
  background: transparent;
  font-weight: bold;
  cursor: pointer;
  color: #444;
}

.tabs button.active {
  background: #f6ad55;
  color: #000;
}

.tab-content {
  padding: 0 1rem;
}

.card {
  background: #fff;
  border: 1px solid #f6ad55;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  margin-top: 1rem;
}

.section-title {
  font-weight: bold;
  margin-bottom: 0.8rem;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.people {
  margin-left: auto;
  font-size: 13px;
  color: #999;
}

.ingredients {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ingredient-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.circle-button {
  margin-top: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #f4a940;
  background: #fff;
  color: #f4a940;
  font-weight: bold;
  cursor: pointer;
}

.circle-button.done {
  margin-top: 14px;
  background: #f4a940;
  color: white;
}

.step-text {
  flex: 1;
  font-size: 14px;
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
}

.modal button {
  margin-top: 12px;
  padding: 8px 16px;
  background: #f4a940;
  color: white;
  border: none;
  border-radius: 8px;
}

.celebration {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 20px;
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.ingredient-check {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checked {
  text-decoration: line-through;
  color: #aaa;
}

.amount {
  font-size: 14px;
  color: #444;
}

</style>
