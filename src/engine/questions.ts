import { Question, Food, FoodCategory } from '../types'
import { WeatherData } from './weather'

// 10-question pool with strong exclusion logic
const questionBank: Question[] = [
  {
    id: 'temperature',
    text: '这顿想吃热的还是冷的？',
    dimension: 'temperature',
    multiSelect: false,
    options: [
      { value: 'hot', label: '热的 🔥', emoji: '🔥', excludeTags: ['冷食', '冷饮', '沙拉', '凉皮'] },
      { value: 'cold', label: '冷的 🧊', emoji: '🧊', excludeTags: ['热食', '火锅', '砂锅', '汤面'] },
    ],
  },
  {
    id: 'fullness',
    text: '这顿想吃多饱？',
    dimension: 'fullness',
    multiSelect: false,
    options: [
      { value: 'heavy', label: '扎实顶饱', emoji: '🍚', excludeTags: ['轻食', '沙拉', '小食', '甜品', '奶茶'] },
      { value: 'light', label: '轻食简餐', emoji: '🥗', excludeTags: ['火锅', '烧烤', '干锅', '自助', '套餐'] },
    ],
  },
  {
    id: 'taste',
    text: '今天想吃什么口味？',
    dimension: 'taste',
    multiSelect: false,
    options: [
      { value: 'spicy', label: '辣的 🌶️', emoji: '🌶️', excludeTags: ['甜', '清淡', '日式甜', '奶香'] },
      { value: 'sweet', label: '甜的 🍬', emoji: '🍬', excludeTags: ['辣', '麻辣', '酸辣', '重口味'] },
      { value: 'mild', label: '清淡的 🍃', emoji: '🍃', excludeTags: ['辣', '麻辣', '油炸', '烧烤', '重口味'] },
      { value: 'sour', label: '酸的 🍋', emoji: '🍋', excludeTags: ['甜', '奶香', '日式甜'] },
    ],
  },
  {
    id: 'category_exclude',
    text: '有没有特别不想吃的类型？（可多选）',
    dimension: 'category',
    multiSelect: true,
    options: [
      { value: FoodCategory.FAST_FOOD, label: '西式快餐', emoji: '🍔', excludeCategories: [FoodCategory.FAST_FOOD] },
      { value: FoodCategory.MALATANG, label: '麻辣烫/冒菜', emoji: '🥘', excludeCategories: [FoodCategory.MALATANG] },
      { value: FoodCategory.SALAD, label: '轻食沙拉', emoji: '🥗', excludeCategories: [FoodCategory.SALAD] },
      { value: FoodCategory.NOODLES, label: '面食', emoji: '🍜', excludeCategories: [FoodCategory.NOODLES] },
      { value: FoodCategory.RICE_NOODLE, label: '粉/米线', emoji: '🍝', excludeCategories: [FoodCategory.RICE_NOODLE] },
      { value: FoodCategory.BBQ, label: '烧烤', emoji: '🍢', excludeCategories: [FoodCategory.BBQ] },
      { value: FoodCategory.DESSERT, label: '甜品/奶茶', emoji: '🧋', excludeCategories: [FoodCategory.DESSERT] },
      { value: FoodCategory.HOTPOT, label: '火锅/干锅', emoji: '🫕', excludeCategories: [FoodCategory.HOTPOT] },
    ],
  },
  {
    id: 'style',
    text: '喜欢干爽的还是带汤的？',
    dimension: 'style',
    multiSelect: false,
    options: [
      { value: 'dry', label: '干爽好收拾', emoji: '🍱', excludeTags: ['汤水', '汤面', '火锅', '麻辣烫', '砂锅'] },
      { value: 'soup', label: '带汤汤水水', emoji: '🥣', excludeTags: ['干爽', '炒', '烤', '炸'] },
    ],
  },
  {
    id: 'price',
    text: '这顿预算多少？',
    dimension: 'price',
    multiSelect: false,
    options: [
      { value: 'cheap', label: '实惠 (30以下)', emoji: '💰', excludeTags: ['贵', '精品'] },
      { value: 'mid', label: '适中 (30-60)', emoji: '💵', excludeTags: [] },
      { value: 'fancy', label: '吃好点 (60以上)', emoji: '💎', excludeTags: ['实惠', '平价'] },
    ],
  },
  {
    id: 'protein',
    text: '想吃哪种蛋白质？',
    dimension: 'protein',
    multiSelect: false,
    options: [
      { value: 'beef', label: '牛肉 🥩', emoji: '🥩', excludeTags: ['猪肉', '海鲜', '鸡肉'] },
      { value: 'chicken', label: '鸡肉 🍗', emoji: '🍗', excludeTags: ['牛肉', '猪肉', '海鲜', '羊肉'] },
      { value: 'pork', label: '猪肉 🐷', emoji: '🐷', excludeTags: ['牛肉', '鸡肉', '海鲜', '羊肉'] },
      { value: 'seafood', label: '海鲜 🦐', emoji: '🦐', excludeTags: ['牛肉', '猪肉', '鸡肉', '羊肉'] },
    ],
  },
  {
    id: 'cuisine',
    text: '想吃哪个菜系？',
    dimension: 'cuisine',
    multiSelect: false,
    options: [
      { value: 'chinese', label: '中餐 🇨🇳', emoji: '🇨🇳', excludeCategories: [FoodCategory.FAST_FOOD, FoodCategory.JAPANESE, FoodCategory.KOREAN, FoodCategory.SOUTHEAST] },
      { value: 'western', label: '西式快餐 🇺🇸', emoji: '🇺🇸', excludeCategories: [FoodCategory.CHINESE, FoodCategory.JAPANESE, FoodCategory.KOREAN, FoodCategory.MALATANG, FoodCategory.HOTPOT] },
      { value: 'asian', label: '日韩/东南亚 🍣', emoji: '🍣', excludeCategories: [FoodCategory.CHINESE, FoodCategory.FAST_FOOD, FoodCategory.MALATANG, FoodCategory.HOTPOT] },
    ],
  },
  {
    id: 'spice_level',
    text: '辣度偏好？',
    dimension: 'spice',
    multiSelect: false,
    options: [
      { value: 'no_spice', label: '完全不辣', emoji: '🚫', excludeTags: ['辣', '麻辣', '酸辣', '香辣', '微辣'] },
      { value: 'mild_spice', label: '微辣就好', emoji: '🌶️', excludeTags: ['重口味', '麻辣'] },
      { value: 'hot', label: '越辣越好', emoji: '🔥', excludeTags: ['清淡', '甜', '日式', '不辣'] },
    ],
  },
  {
    id: 'mood',
    text: '现在是什么心情？',
    dimension: 'mood',
    multiSelect: false,
    options: [
      { value: 'comfort', label: '需要安慰 🫂', emoji: '🫂', excludeTags: ['健康', '轻食', '沙拉'] },
      { value: 'healthy', label: '健康自律 💪', emoji: '💪', excludeTags: ['油炸', '烧烤', '奶茶', '甜品', '火锅'] },
      { value: 'adventure', label: '想尝新的 🔮', emoji: '🔮', excludeTags: [] },
      { value: 'lazy', label: '随便吃吃 😴', emoji: '😴', excludeTags: ['贵', '精品', '火锅'] },
    ],
  },
]

// Generate 5 questions based on time + weather + candidate pool
export function generateQuestions(candidates: Food[], weather?: WeatherData): Question[] {
  const now = new Date()
  const hour = now.getHours()
  const temp = weather?.temperature ?? 20
  const isRaining = weather?.isRaining ?? false

  const questions: Question[] = []
  const used = new Set<string>()

  const pick = (id: string) => {
    const q = questionBank.find(q => q.id === id)
    if (q && !used.has(id)) {
      used.add(id)
      questions.push(q)
    }
  }

  // Q1: Temperature/Comfort - always first, weather-aware
  if (isRaining || temp < 5) {
    // Cold or rainy: push toward hot food
    pick('temperature')
  } else if (temp > 30) {
    // Hot: push toward cold food
    pick('temperature')
  } else if (hour >= 6 && hour < 10) {
    pick('temperature') // Breakfast: hot vs cold
  } else {
    pick('temperature')
  }

  // Q2: Fullness (meal size)
  if (hour >= 6 && hour < 10) {
    pick('price') // Breakfast: budget is more relevant
  } else if (hour >= 14 && hour < 17) {
    pick('mood') // Afternoon: mood matters
  } else {
    pick('fullness')
  }

  // Q3: Category exclusion (most impactful filter)
  if (candidates.length >= 15) {
    pick('category_exclude')
  } else if (candidates.length >= 8) {
    pick('cuisine')
  } else {
    pick('taste')
  }

  // Q4: Taste/Style detail
  if (hour >= 20 || hour < 6) {
    pick('mood') // Late night: mood-driven
  } else if (candidates.length >= 10) {
    pick('taste')
  } else {
    pick('style')
  }

  // Q5: Fine-tuning
  const pool = candidates.length >= 8
    ? ['style', 'protein', 'spice_level', 'price']
    : ['price', 'mood', 'protein']

  for (const id of pool) {
    if (questions.length >= 5) break
    if (!used.has(id)) pick(id)
  }

  // Fill to exactly 5
  while (questions.length < 5) {
    for (const q of questionBank) {
      if (!used.has(q.id)) {
        pick(q.id)
        break
      }
    }
  }

  return questions
}
