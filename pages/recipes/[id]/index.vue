<template>
  <RecipeDetail :id="recipeId" />
</template>

<script lang="ts" setup>
import RecipeDetail from '~/components/pages/recipes/RecipeDetail.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const recipeId = route.params.id
</script>