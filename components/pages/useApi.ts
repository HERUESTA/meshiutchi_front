import { ref } from 'vue'

const recipes = ref<any[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

export const useApi = () => {
  const fetchRecipesByMood = async (mood: string) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`https://meshiuchi-back.fly.dev/api/v1/mood_recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood }),
      })

      if (!response.ok) {
        throw new Error('APIリクエストに失敗しました')
      }

      const data = await response.json()
      recipes.value = data.recipes
    } catch (err: any) {
      error.value = err.message || 'エラーが発生しました'
    } finally {
      isLoading.value = false
    }
  }

  return {
    recipes,
    isLoading,
    error,
    fetchRecipesByMood,
  }
}
