export type Ingredient = {
  name: string
  amount: string
}

export type Recipe = {
  id: number
  title: string
  description: string
  durationMinutes: number
  servings: number
  ingredients: Ingredient[]
  steps: string[]
}
