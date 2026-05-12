import { Food, Answer, Rule, StoreEntry, FoodCategory } from '../types'

export function applyAnswerExclusions(foods: Food[], answer: Answer): Food[] {
  return foods.filter(food => {
    for (const value of answer.selectedValues) {
      // Direct tag match exclusion
      if (food.tags.includes(value)) return false
      if (food.tags.some(t => t.includes(value) || value.includes(t))) return false

      // Category exclusion via value matching FoodCategory enum values
      if (Object.values(FoodCategory).includes(value as FoodCategory)) {
        if (food.category === value) return false
      }

      // Price-based exclusion
      if (value === 'cheap' && food.price > 30) return false
      if (value === 'mid' && (food.price < 25 || food.price > 65)) return false
      if (value === 'fancy' && food.price < 55) return false
    }
    return true
  })
}

export function applyAllAnswers(foods: Food[], answers: Answer[]): Food[] {
  let result = foods
  for (const answer of answers) {
    result = applyAnswerExclusions(result, answer)
  }
  return result
}

export function applyHardRules(foods: Food[], rules: Rule[]): Food[] {
  const activeRules = rules.filter(r => r.enabled && r.type === 'hard')
  if (activeRules.length === 0) return foods

  return foods.filter(food => {
    for (const rule of activeRules) {
      if (rule.excludeTags && rule.excludeTags.some(t =>
        food.tags.includes(t) || food.tags.some(ft => ft.includes(t) || t.includes(ft))
      )) return false
      if (rule.excludeCategories && rule.excludeCategories.includes(food.category)) return false
      if (rule.excludeStores && rule.excludeStores.includes(food.storeId)) return false
      if (rule.maxPrice && food.price > rule.maxPrice) return false
    }
    return true
  })
}

export function applyBlacklist(foods: Food[], blacklist: StoreEntry[]): Food[] {
  const blacklistedStoreIds = new Set(blacklist.filter(e => e.type === 'blacklist').map(e => e.storeId))
  return foods.filter(f => !blacklistedStoreIds.has(f.storeId))
}

export function applyCooldown(foods: Food[], cooldownMap: Record<string, number>): Food[] {
  const now = Date.now()
  return foods.filter(food => {
    const cooldown = cooldownMap[food.id]
    if (!cooldown) return true
    return now > cooldown
  })
}

export function getAllCandidates(
  allFoods: Food[],
  answers: Answer[],
  rules: Rule[],
  blacklist: StoreEntry[],
  cooldownMap: Record<string, number>
): Food[] {
  let foods = applyBlacklist(allFoods, blacklist)
  foods = applyHardRules(foods, rules)
  foods = applyCooldown(foods, cooldownMap)
  foods = applyAllAnswers(foods, answers)
  return foods
}
