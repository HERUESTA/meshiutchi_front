import { ref } from 'vue';

const recipes = ref([]);

export function useApi() {
  const fetchRecipesByMood = async (mood: string) => {
    try {
      const apiUrl = `https://meshiuchi-back.fly.dev`;
      const response = await fetch(`${apiUrl}/api/v1/mood_recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      recipes.value = data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  };

  return { recipes, fetchRecipesByMood };
}
