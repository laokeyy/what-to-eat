
import os
BASE = r"C:\Users\key\Documents\New project 2\src"

def w(path, content):
    full = os.path.join(BASE, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(content)

# Types
w("types/index.ts", """export enum FoodCategory {
  CHINESE = "\u4e2d\u9910\u7092\u83dc",
  FAST_FOOD = "\u897f\u5f0f\u5feb\u9910",
  JAPANESE = "\u65e5\u6599",
  KOREAN = "\u97e9\u5f0f",
  NOODLES = "\u9762\u98df",
  RICE_NOODLE = "\u7c89/\u7c73\u7ebf",
  MALATANG = "\u9ebb\u8fa3\u70eb/\u5192\u83dc",
  BBQ = "\u70e7\u70e4",
  SALAD = "\u8f7b\u98df\u6c99\u62c9",
  DESSERT = "\u751c\u54c1/\u5976\u8336",
  HOTPOT = "\u706b\u9505/\u5e72\u9505",
  SOUTHEAST = "\u4e1c\u5357\u4e9a",
}

export interface Food {
  id: string
  name: string
  storeId: string
  storeName: string
  category: FoodCategory
  price: number
  tags: string[]
  healthScore: number
  deliveryTime: number
  rating: number
  emoji: string
}

export interface Store {
  id: string
  name: string
  categories: FoodCategory[]
  rating: number
  avgDeliveryTime: number
  tags: string[]
}

export interface Question {
  id: string
  text: string
  dimension: string
  options: QuestionOption[]
  multiSelect: boolean
}

export interface QuestionOption {
  value: string
  label: string
  emoji: string
  excludeTags?: string[]
  excludeCategories?: FoodCategory[]
}

export type RuleType = "hard" | "soft" | "scene"

export interface Rule {
  id: string
  type: RuleType
  description: string
  enabled: boolean
  excludeTags?: string[]
  excludeCategories?: FoodCategory[]
  excludeStores?: string[]
  maxPrice?: number
  preferTags?: string[]
  preferCategories?: FoodCategory[]
  weightMultiplier?: number
  triggerTimeStart?: string
  triggerTimeEnd?: string
  triggerWeekday?: boolean
  triggerWeekend?: boolean
}

export interface UserRecipe {
  id: string
  name: string
  storeName?: string
  category?: FoodCategory
  tags: string[]
  addedAt: number
  cooldownUntil?: number
  frozen: boolean
  timesOrdered: number
}

export interface StoreEntry {
  storeId: string
  storeName: string
  type: "blacklist" | "whitelist"
  reason: string
  timestamp: number
}

export type HealthMode = "normal" | "healthy" | "junk"
export type FlowPhase = "idle" | "questioning" | "spinning" | "result" | "reviewing"

export interface Answer {
  questionId: string
  selectedValues: string[]
}

export interface FlowState {
  phase: FlowPhase
  currentQuestionIndex: number
  questions: Question[]
  answers: Answer[]
  candidates: Food[]
  finalResult: Food | null
  spinCount: number
  maxSpins: number
}
""")

print("types done")

