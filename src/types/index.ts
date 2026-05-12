export enum FoodCategory {
  CHINESE = '中餐炒菜',
  FAST_FOOD = '西式快餐',
  JAPANESE = '日料',
  KOREAN = '韩式',
  NOODLES = '面食',
  RICE_NOODLE = '粉/米线',
  MALATANG = '麻辣烫/冒菜',
  BBQ = '烧烤',
  SALAD = '轻食沙拉',
  DESSERT = '甜品/奶茶',
  HOTPOT = '火锅/干锅',
  SOUTHEAST = '东南亚',
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

export type RuleType = 'hard' | 'soft' | 'scene'

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
  type: 'blacklist' | 'whitelist'
  reason: string
  timestamp: number
}

export type HealthMode = 'normal' | 'healthy' | 'junk'
export type FlowPhase = 'idle' | 'questioning' | 'spinning' | 'result' | 'reviewing'

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
