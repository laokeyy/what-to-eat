import { create } from 'zustand'
import { Food, UserRecipe } from '../types'
import { mockFoods } from '../data/mock-foods'

interface FoodStore {
  allFoods: Food[]
  userRecipes: UserRecipe[]
  addRecipe: (recipe: UserRecipe) => void
  removeRecipe: (id: string) => void
  toggleFreeze: (id: string) => void
  setCooldown: (foodId: string) => void
  getCooldownMap: () => Record<string, number>
  orderFood: (foodId: string) => void
}

const STORAGE_KEY = 'food-app-recipes'

function loadRecipes(): UserRecipe[] {
  try { const data = localStorage.getItem(STORAGE_KEY); return data ? JSON.parse(data) : [] }
  catch { return [] }
}

function saveRecipes(recipes: UserRecipe[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
}

export const useFoodStore = create<FoodStore>((set, get) => ({
  allFoods: mockFoods,
  userRecipes: loadRecipes(),

  addRecipe: (recipe) => set(state => {
    const recipes = [...state.userRecipes, recipe]
    saveRecipes(recipes)
    return { userRecipes: recipes }
  }),

  removeRecipe: (id) => set(state => {
    const recipes = state.userRecipes.filter(r => r.id !== id)
    saveRecipes(recipes)
    return { userRecipes: recipes }
  }),

  toggleFreeze: (id) => set(state => {
    const recipes = state.userRecipes.map(r => r.id === id ? { ...r, frozen: !r.frozen } : r)
    saveRecipes(recipes)
    return { userRecipes: recipes }
  }),

  setCooldown: (foodId) => set(state => {
    const cooldownUntil = Date.now() + 7 * 24 * 60 * 60 * 1000
    const recipes = state.userRecipes.map(r => {
      if (r.name === foodId || r.id === foodId) return { ...r, cooldownUntil, timesOrdered: r.timesOrdered + 1 }
      return r
    })
    saveRecipes(recipes)
    return { userRecipes: recipes }
  }),

  getCooldownMap: () => {
    const recipes = get().userRecipes
    const map: Record<string, number> = {}
    for (const r of recipes) {
      if (r.cooldownUntil) {
        const matchFoods = get().allFoods.filter(f => f.name.includes(r.name) || r.tags.some(t => f.tags.includes(t)))
        for (const f of matchFoods) map[f.id] = r.cooldownUntil
      }
    }
    return map
  },

  orderFood: (foodId) => { get().setCooldown(foodId) },
}))