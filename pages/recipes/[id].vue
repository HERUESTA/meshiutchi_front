<template>
  <RecipeDetail :recipe="recipe" />
</template>

<script lang="ts" setup>
import RecipeDetail from '~/components/pages/recipes/RecipeDetail.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '@/components/pages/useApi'

const route = useRoute()
const recipeId = route.params.id as string
const { recipes } = useApi()

const recipe = computed(() => recipes.value[recipeId])
</script>
