export default [
  {
    path: '/recipes',
    component: () => import('@/components/pages/recipes/RecipeList.vue'),
  },
  {
    path: '/recipes/:title',
    component: () => import('@/components/pages/recipes/RecipeDetail.vue'),
    props: true,
  },
];
