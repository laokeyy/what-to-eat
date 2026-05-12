import { Food, Rule, StoreEntry, HealthMode, UserRecipe } from '../types'
import { WeatherData } from './weather'

interface WeightConfig {
  food: Food
  rules: Rule[]
  whitelist: StoreEntry[]
  healthMode: HealthMode
  userRecipes: UserRecipe[]
  weather?: WeatherData
  blindMode?: number
}

const WHITELIST_WEIGHT = 3.0
const RECIPE_WEIGHT = 2.0
const PREFER_BONUS = 1.5

export function calculateWeight(config: WeightConfig): number {
  const { food, rules, whitelist, healthMode, userRecipes, weather } = config
  let weight = 1.0

  // Whitelist bonus
  const isWhitelisted = whitelist.some(e => e.type === 'whitelist' && e.storeId === food.storeId)
  if (isWhitelisted) weight += WHITELIST_WEIGHT

  // Recipe match
  const recipeMatch = userRecipes.some(r => {
    if (r.frozen) return false
    if (r.storeName && r.storeName !== food.storeName) return false
    if (r.name && !food.name.includes(r.name) && !food.tags.some(t => r.name.includes(t))) return false
    return true
  })
  if (recipeMatch) weight += RECIPE_WEIGHT

  // Soft preference rules
  const softRules = rules.filter(r => r.enabled && r.type === 'soft')
  for (const rule of softRules) {
    if (rule.preferTags && rule.preferTags.some(t =>
      food.tags.includes(t) || food.tags.some(ft => ft.includes(t) || t.includes(ft))
    )) {
      weight += PREFER_BONUS * (rule.weightMultiplier || 1)
    }
    if (rule.preferCategories && rule.preferCategories.includes(food.category)) {
      weight += PREFER_BONUS * (rule.weightMultiplier || 1)
    }
  }

  // Health mode
  const isJunkFood = food.healthScore < 35
  const isHealthFood = food.healthScore > 70
  if (healthMode === 'healthy' && isJunkFood) weight *= 0.3
  else if (healthMode === 'healthy' && isHealthFood) weight *= 3.0
  else if (healthMode === 'junk' && isJunkFood) weight *= 5.0

  // Weather weighting
  if (weather) {
    const isHotFood = food.tags.some(t => ['热食', '火锅', '砂锅', '汤面', '汤水'].includes(t))
    const isColdFood = food.tags.some(t => ['冷食', '冷饮', '沙拉', '凉皮'].includes(t))
    const isSoup = food.tags.some(t => ['汤水', '汤面', '砂锅'].includes(t))
    const isComfortFood = food.tags.some(t => ['油炸', '碳水', '甜品', '奶茶'].includes(t))

    // Hot weather: boost cold, deboost hot
    if (weather.temperature > 30) {
      if (isColdFood) weight *= 2.0
      if (isHotFood && !isSoup) weight *= 0.5
    }
    // Cold weather: boost hot/soup
    if (weather.temperature < 10) {
      if (isHotFood) weight *= 2.0
      if (isSoup) weight *= 2.5
      if (isColdFood) weight *= 0.3
    }
    // Rain: boost soup, comfort food, fast delivery
    if (weather.isRaining) {
      if (isSoup) weight *= 2.0
      if (isComfortFood) weight *= 1.5
      if (food.deliveryTime <= 25) weight *= 1.3
      if (food.deliveryTime > 40) weight *= 0.5
    }
  }

  return Math.max(weight, 0.01)
}

export function weightedRandom(foods: Food[], weights: number[]): Food {
  const totalWeight = weights.reduce((sum, w) => sum + w, 0)
  let random = Math.random() * totalWeight
  for (let i = 0; i < foods.length; i++) {
    random -= weights[i]
    if (random <= 0) return foods[i]
  }
  return foods[foods.length - 1]
}
