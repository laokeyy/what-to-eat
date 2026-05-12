import { Question, Food, FoodCategory } from "../types"
import { WeatherData } from "./weather"

// 30+ question pool with strong exclusion logic
const questionBank: Question[] = [
  // === 温度/体感 (2题) ===
  {
    id: "temperature",
    text: "这顿想吃热的还是冷的？",
    dimension: "temperature",
    multiSelect: false,
    options: [
      { value: "hot", label: "热的 🔥", emoji: "🔥", excludeTags: ["冷食", "冷饮", "沙拉", "凉皮"] },
      { value: "cold", label: "冷的 🧊", emoji: "🧊", excludeTags: ["热食", "火锅", "砂锅", "汤面"] },
    ],
  },
  {
    id: "weather_fit",
    text: "今天天气适合吃……",
    dimension: "weather",
    multiSelect: false,
    options: [
      { value: "warm_up", label: "暖身驱寒 🔥", emoji: "🔥", excludeTags: ["冷食", "冷饮", "沙拉", "凉拌"] },
      { value: "cool_down", label: "降温解暑 🧊", emoji: "🧊", excludeTags: ["火锅", "热汤", "砂锅", "麻辣烫"] },
      { value: "dont_care", label: "无所谓天气 ☁️", emoji: "☁️", excludeTags: [] },
    ],
  },
  // === 饱腹感 (2题) ===
  {
    id: "fullness",
    text: "这顿想吃多饱？",
    dimension: "fullness",
    multiSelect: false,
    options: [
      { value: "heavy", label: "扎实顶饱 🍚", emoji: "🍚", excludeTags: ["轻食", "沙拉", "小食", "甜品", "奶茶"] },
      { value: "light", label: "轻食简餐 🥗", emoji: "🥗", excludeTags: ["火锅", "烧烤", "干锅", "自助", "套餐"] },
      { value: "medium", label: "七八分饱就好 😌", emoji: "😌", excludeTags: [] },
    ],
  },
  {
    id: "meal_size",
    text: "这顿是正餐还是随便吃点？",
    dimension: "meal_size",
    multiSelect: false,
    options: [
      { value: "full_meal", label: "正经吃一顿 🍽️", emoji: "🍽️", excludeTags: ["小食", "甜品", "奶茶", "零食"] },
      { value: "snack", label: "垫垫肚子就行 🍪", emoji: "🍪", excludeTags: ["火锅", "烧烤", "套餐", "干锅"] },
    ],
  },
  // === 口味偏好 (4题) ===
  {
    id: "taste",
    text: "今天想吃什么口味？",
    dimension: "taste",
    multiSelect: false,
    options: [
      { value: "spicy", label: "辣的 🌶️", emoji: "🌶️", excludeTags: ["甜", "清淡", "日式甜", "奶香"] },
      { value: "sweet", label: "甜的 🍬", emoji: "🍬", excludeTags: ["辣", "麻辣", "酸辣", "重口味"] },
      { value: "mild", label: "清淡的 🍃", emoji: "🍃", excludeTags: ["辣", "麻辣", "油炸", "烧烤", "重口味"] },
      { value: "sour", label: "酸的 🍋", emoji: "🍋", excludeTags: ["甜", "奶香", "日式甜"] },
      { value: "savory", label: "咸香 🧂", emoji: "🧂", excludeTags: ["甜", "酸", "清淡"] },
    ],
  },
  {
    id: "spice_level",
    text: "辣度偏好？",
    dimension: "spice",
    multiSelect: false,
    options: [
      { value: "no_spice", label: "完全不辣 🚫", emoji: "🚫", excludeTags: ["辣", "麻辣", "酸辣", "香辣", "微辣"] },
      { value: "mild_spice", label: "微辣就好 🌶️", emoji: "🌶️", excludeTags: ["重口味", "麻辣"] },
      { value: "hot", label: "越辣越爽 🔥", emoji: "🔥", excludeTags: ["清淡", "甜", "日式", "不辣"] },
    ],
  },
  {
    id: "oil_level",
    text: "油腻程度有要求吗？",
    dimension: "oil",
    multiSelect: false,
    options: [
      { value: "no_oil", label: "拒绝油腻 🚫", emoji: "🚫", excludeTags: ["油炸", "烧烤", "火锅", "肥肉"] },
      { value: "ok_oil", label: "无所谓 😋", emoji: "😋", excludeTags: [] },
      { value: "love_oil", label: "越油越香 🤤", emoji: "🤤", excludeTags: ["轻食", "沙拉", "清蒸", "健康"] },
    ],
  },
  {
    id: "smell",
    text: "介意味道大吗？（办公室友好度）",
    dimension: "smell",
    multiSelect: false,
    options: [
      { value: "no_smell", label: "最好没味道 🤫", emoji: "🤫", excludeTags: ["重口味", "螺蛳粉", "臭豆腐", "大蒜", "火锅"] },
      { value: "ok_smell", label: "有点味道没事 🙂", emoji: "🙂", excludeTags: [] },
      { value: "love_smell", label: "越重口越过瘾 💨", emoji: "💨", excludeTags: ["清淡", "轻食"] },
    ],
  },
  // === 品类排除 (2题) ===
  {
    id: "category_exclude",
    text: "有没有特别不想吃的类型？（可多选）",
    dimension: "category",
    multiSelect: true,
    options: [
      { value: FoodCategory.FAST_FOOD, label: "西式快餐", emoji: "🍔", excludeCategories: [FoodCategory.FAST_FOOD] },
      { value: FoodCategory.MALATANG, label: "麻辣烫/冒菜", emoji: "🥘", excludeCategories: [FoodCategory.MALATANG] },
      { value: FoodCategory.SALAD, label: "轻食沙拉", emoji: "🥗", excludeCategories: [FoodCategory.SALAD] },
      { value: FoodCategory.NOODLES, label: "面食", emoji: "🍜", excludeCategories: [FoodCategory.NOODLES] },
      { value: FoodCategory.RICE_NOODLE, label: "粉/米线", emoji: "🍝", excludeCategories: [FoodCategory.RICE_NOODLE] },
      { value: FoodCategory.BBQ, label: "烧烤", emoji: "🍢", excludeCategories: [FoodCategory.BBQ] },
      { value: FoodCategory.DESSERT, label: "甜品/奶茶", emoji: "🧋", excludeCategories: [FoodCategory.DESSERT] },
      { value: FoodCategory.HOTPOT, label: "火锅/干锅", emoji: "🫕", excludeCategories: [FoodCategory.HOTPOT] },
      { value: FoodCategory.JAPANESE, label: "日料", emoji: "🍣", excludeCategories: [FoodCategory.JAPANESE] },
      { value: FoodCategory.KOREAN, label: "韩式", emoji: "🇰🇷", excludeCategories: [FoodCategory.KOREAN] },
      { value: FoodCategory.SOUTHEAST, label: "东南亚", emoji: "🍜", excludeCategories: [FoodCategory.SOUTHEAST] },
    ],
  },
  {
    id: "category_want",
    text: "今天特别想吃什么类型？",
    dimension: "category_want",
    multiSelect: false,
    options: [
      { value: FoodCategory.CHINESE, label: "中餐炒菜 🇨🇳", emoji: "🇨🇳", excludeCategories: [] },
      { value: FoodCategory.FAST_FOOD, label: "西式快餐 🍔", emoji: "🍔", excludeCategories: [] },
      { value: FoodCategory.NOODLES, label: "面食 🍜", emoji: "🍜", excludeCategories: [] },
      { value: FoodCategory.RICE_NOODLE, label: "粉/米线 🍝", emoji: "🍝", excludeCategories: [] },
      { value: FoodCategory.JAPANESE, label: "日料 🍣", emoji: "🍣", excludeCategories: [] },
      { value: "random", label: "随便，懒得想 🎲", emoji: "🎲", excludeCategories: [] },
    ],
  },
  // === 时间/速度 (2题) ===
  {
    id: "delivery_speed",
    text: "这顿急不急？",
    dimension: "speed",
    multiSelect: false,
    options: [
      { value: "urgent", label: "饿死了快点 ⚡", emoji: "⚡", excludeTags: ["火锅", "烧烤", "慢"] },
      { value: "patient", label: "不急慢慢等 ☕", emoji: "☕", excludeTags: ["快餐"] },
    ],
  },
  {
    id: "time_of_day",
    text: "现在是什么时段？",
    dimension: "time",
    multiSelect: false,
    options: [
      { value: "breakfast", label: "早餐时间 🌅", emoji: "🌅", excludeTags: ["火锅", "烧烤", "干锅", "辣", "重口味"] },
      { value: "lunch", label: "午餐 ☀️", emoji: "☀️", excludeTags: ["早餐", "宵夜"] },
      { value: "dinner", label: "晚餐 🌙", emoji: "🌙", excludeTags: ["早餐"] },
      { value: "late_night", label: "宵夜时间 🦉", emoji: "🦉", excludeTags: ["早餐", "沙拉", "健康"] },
    ],
  },
  // === 主食/碳水 (3题) ===
  {
    id: "carb_type",
    text: "主食想吃什么？",
    dimension: "carb",
    multiSelect: false,
    options: [
      { value: "rice", label: "米饭 🍚", emoji: "🍚", excludeTags: ["面食", "粉", "面包", "汉堡"] },
      { value: "noodle", label: "面/粉 🍜", emoji: "🍜", excludeTags: ["米饭", "面包", "汉堡"] },
      { value: "bread", label: "面包/汉堡 🍔", emoji: "🍔", excludeTags: ["米饭", "面食", "粉", "中餐"] },
      { value: "no_carb", label: "不吃主食 🙅", emoji: "🙅", excludeTags: ["米饭", "面食", "粉", "碳水"] },
    ],
  },
  {
    id: "rice_style",
    text: "吃米饭的话想要哪种？",
    dimension: "rice_style",
    multiSelect: false,
    options: [
      { value: "gaifan", label: "盖浇饭 🍛", emoji: "🍛", excludeTags: ["西式", "日式", "韩式"] },
      { value: "chaofan", label: "炒饭 🍳", emoji: "🍳", excludeTags: ["汤水", "清淡"] },
      { value: "taocan", label: "套餐 🍱", emoji: "🍱", excludeTags: ["实惠", "路边摊"] },
      { value: "any_rice", label: "都行 😋", emoji: "😋", excludeTags: [] },
    ],
  },
  {
    id: "noodle_type",
    text: "面食偏好？",
    dimension: "noodle_type",
    multiSelect: false,
    options: [
      { value: "lamian", label: "拉面/手擀面 🍜", emoji: "🍜", excludeTags: ["米线", "粉"] },
      { value: "rice_noodle", label: "米粉/米线 🍝", emoji: "🍝", excludeTags: ["拉面", "手擀面"] },
      { value: "instant", label: "方便面/速食 😅", emoji: "😅", excludeTags: ["健康", "精品"] },
    ],
  },
  // === 预算 (2题) ===
  {
    id: "price",
    text: "这顿预算多少？",
    dimension: "price",
    multiSelect: false,
    options: [
      { value: "cheap", label: "实惠 (30以下) 💰", emoji: "💰", excludeTags: ["贵", "精品"] },
      { value: "mid", label: "适中 (30-60) 💵", emoji: "💵", excludeTags: [] },
      { value: "fancy", label: "吃好点 (60+) 💎", emoji: "💎", excludeTags: ["实惠", "平价"] },
    ],
  },
  {
    id: "value",
    text: "更看重性价比还是体验？",
    dimension: "value",
    multiSelect: false,
    options: [
      { value: "cheaper", label: "便宜大碗最重要 💪", emoji: "💪", excludeTags: ["精品", "日料", "火锅"] },
      { value: "experience", label: "吃好才是王道 ✨", emoji: "✨", excludeTags: ["路边摊", "速食"] },
    ],
  },
  // === 蛋白质/肉类 (2题) ===
  {
    id: "protein",
    text: "想吃哪种蛋白质？",
    dimension: "protein",
    multiSelect: false,
    options: [
      { value: "beef", label: "牛肉 🥩", emoji: "🥩", excludeTags: ["猪肉", "鸡肉"] },
      { value: "chicken", label: "鸡肉 🍗", emoji: "🍗", excludeTags: ["牛肉", "猪肉", "羊肉"] },
      { value: "pork", label: "猪肉 🐷", emoji: "🐷", excludeTags: ["牛肉", "鸡肉", "羊肉"] },
      { value: "seafood", label: "海鲜 🦐", emoji: "🦐", excludeTags: ["猪肉", "鸡肉"] },
      { value: "veggie", label: "素菜也很好 🥬", emoji: "🥬", excludeTags: ["牛肉", "猪肉", "鸡肉", "羊肉", "海鲜"] },
    ],
  },
  {
    id: "meat_ratio",
    text: "肉多还是菜多？",
    dimension: "meat_ratio",
    multiSelect: false,
    options: [
      { value: "more_meat", label: "我要吃肉 🥩", emoji: "🥩", excludeTags: ["素食", "沙拉", "轻食"] },
      { value: "balanced", label: "荤素搭配 ⚖️", emoji: "⚖️", excludeTags: [] },
      { value: "more_veggie", label: "多吃菜 🥬", emoji: "🥬", excludeTags: ["烤肉", "纯肉"] },
    ],
  },
  // === 烹饪方式 (2题) ===
  {
    id: "cooking_method",
    text: "喜欢什么烹饪方式？",
    dimension: "cooking",
    multiSelect: false,
    options: [
      { value: "stir_fry", label: "爆炒 🔥", emoji: "🔥", excludeTags: ["清蒸", "生食", "沙拉"] },
      { value: "steam", label: "清蒸/煮 🍲", emoji: "🍲", excludeTags: ["油炸", "烧烤", "爆炒"] },
      { value: "deep_fry", label: "油炸 🍤", emoji: "🍤", excludeTags: ["清蒸", "健康", "轻食"] },
      { value: "grill", label: "烤的 🍖", emoji: "🍖", excludeTags: ["清蒸", "水煮"] },
      { value: "cold_mix", label: "凉拌/生食 🥒", emoji: "🥒", excludeTags: ["火锅", "热食", "油炸"] },
    ],
  },
  {
    id: "texture",
    text: "喜欢什么口感？",
    dimension: "texture",
    multiSelect: false,
    options: [
      { value: "crispy", label: "脆的 🥐", emoji: "🥐", excludeTags: ["汤水", "炖", "软烂"] },
      { value: "chewy", label: "有嚼劲 🍝", emoji: "🍝", excludeTags: ["软烂", "糊状"] },
      { value: "tender", label: "软嫩 🍮", emoji: "🍮", excludeTags: ["脆", "硬"] },
      { value: "smooth", label: "顺滑 🍵", emoji: "🍵", excludeTags: ["脆", "硬", "粗糙"] },
    ],
  },
  // === 菜系国家 (2题) ===
  {
    id: "cuisine",
    text: "想吃哪个菜系？",
    dimension: "cuisine",
    multiSelect: false,
    options: [
      { value: "chinese", label: "中餐 🇨🇳", emoji: "🇨🇳", excludeCategories: [FoodCategory.FAST_FOOD, FoodCategory.JAPANESE, FoodCategory.KOREAN, FoodCategory.SOUTHEAST] },
      { value: "western", label: "西式快餐 🇺🇸", emoji: "🇺🇸", excludeCategories: [FoodCategory.CHINESE, FoodCategory.JAPANESE, FoodCategory.KOREAN, FoodCategory.MALATANG, FoodCategory.HOTPOT] },
      { value: "asian", label: "日韩/东南亚 🍣", emoji: "🍣", excludeCategories: [FoodCategory.CHINESE, FoodCategory.FAST_FOOD, FoodCategory.MALATANG, FoodCategory.HOTPOT] },
      { value: "fusion", label: "混搭也行 🌀", emoji: "🌀", excludeTags: [] },
    ],
  },
  {
    id: "chinese_region",
    text: "想吃哪个地方的中餐？",
    dimension: "chinese_region",
    multiSelect: false,
    options: [
      { value: "sichuan", label: "川渝麻辣 🌶️", emoji: "🌶️", excludeTags: ["清淡", "甜", "日式"] },
      { value: "cantonese", label: "粤式清淡 🥢", emoji: "🥢", excludeTags: ["辣", "麻辣", "重口味"] },
      { value: "jiangzhe", label: "江浙甜鲜 🍬", emoji: "🍬", excludeTags: ["辣", "麻辣"] },
      { value: "northeast", label: "东北豪放 🥟", emoji: "🥟", excludeTags: ["轻食", "沙拉"] },
      { value: "northwest", label: "西北面食 🍜", emoji: "🍜", excludeTags: ["米饭", "海鲜"] },
    ],
  },
  // === 心情/场景 (3题) ===
  {
    id: "mood",
    text: "现在是什么心情？",
    dimension: "mood",
    multiSelect: false,
    options: [
      { value: "comfort", label: "需要安慰 🫂", emoji: "🫂", excludeTags: ["健康", "轻食", "沙拉"] },
      { value: "healthy", label: "健康自律 💪", emoji: "💪", excludeTags: ["油炸", "烧烤", "奶茶", "甜品", "火锅"] },
      { value: "adventure", label: "想尝新的 🔮", emoji: "🔮", excludeTags: [] },
      { value: "lazy", label: "随便吃吃 😴", emoji: "😴", excludeTags: ["贵", "精品", "火锅"] },
    ],
  },
  {
    id: "activity",
    text: "吃完打算做什么？",
    dimension: "activity",
    multiSelect: false,
    options: [
      { value: "work", label: "接着干活 💼", emoji: "💼", excludeTags: ["酒", "重口味", "大蒜"] },
      { value: "rest", label: "躺平休息 🛋️", emoji: "🛋️", excludeTags: ["咖啡", "茶", "提神"] },
      { value: "social", label: "和朋友一起吃 🎉", emoji: "🎉", excludeTags: ["单人套餐", "轻食"] },
      { value: "exercise", label: "要去运动 🏃", emoji: "🏃", excludeTags: ["火锅", "烧烤", "重口味", "油炸"] },
    ],
  },
  {
    id: "companion",
    text: "一个人吃还是分享？",
    dimension: "companion",
    multiSelect: false,
    options: [
      { value: "solo", label: "一个人 🧍", emoji: "🧍", excludeTags: ["火锅", "双人", "分享"] },
      { value: "share", label: "要分享 🫂", emoji: "🫂", excludeTags: ["单人"] },
      { value: "dont_care_comp", label: "都行 🤷", emoji: "🤷", excludeTags: [] },
    ],
  },
  // === 特殊需求 (3题) ===
  {
    id: "style",
    text: "干爽还是带汤？",
    dimension: "style",
    multiSelect: false,
    options: [
      { value: "dry", label: "干爽好收拾 🍱", emoji: "🍱", excludeTags: ["汤水", "汤面", "火锅", "麻辣烫", "砂锅"] },
      { value: "soup", label: "汤汤水水 🥣", emoji: "🥣", excludeTags: ["干爽", "炒", "烤", "炸"] },
      { value: "half", label: "最好有菜有汤 🍲", emoji: "🍲", excludeTags: ["纯干", "纯汤"] },
    ],
  },
  {
    id: "eat_method",
    text: "想以什么方式吃？",
    dimension: "eat_method",
    multiSelect: false,
    options: [
      { value: "chopsticks", label: "用筷子传统吃 🥢", emoji: "🥢", excludeTags: ["汉堡", "三明治"] },
      { value: "hands", label: "上手抓 👐", emoji: "👐", excludeTags: ["汤面", "火锅", "米饭"] },
      { value: "spoon", label: "用勺子挖 🥄", emoji: "🥄", excludeTags: ["面", "大块肉"] },
      { value: "any_eat", label: "怎么吃都行 🙌", emoji: "🙌", excludeTags: [] },
    ],
  },
  {
    id: "drink",
    text: "要搭什么喝的？",
    dimension: "drink",
    multiSelect: false,
    options: [
      { value: "soda", label: "冰可乐 🥤", emoji: "🥤", excludeTags: ["健康", "养生"] },
      { value: "tea", label: "热茶/奶茶 🍵", emoji: "🍵", excludeTags: ["西式快餐"] },
      { value: "beer", label: "来点小酒 🍺", emoji: "🍺", excludeTags: ["早餐", "沙拉", "甜品"] },
      { value: "none", label: "不喝也行 💧", emoji: "💧", excludeTags: [] },
    ],
  },
]

// Fisher-Yates shuffle
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Generate 5 questions with more randomness
// Uses seeded random from Date.now() to avoid same questions every load
export function generateQuestions(candidates: Food[], weather?: WeatherData): Question[] {
  const now = new Date()
  const hour = now.getHours()
  const temp = weather?.temperature ?? 20
  const isRaining = weather?.isRaining ?? false
  const seed = now.getTime() % 10000

  const questions: Question[] = []
  const used = new Set<string>()

  const pick = (id: string) => {
    const q = questionBank.find(q => q.id === id)
    if (q && !used.has(id)) {
      used.add(id)
      questions.push(q)
    }
  }

  // === Q1: Weather/Temperature (always first, weather-aware) ===
  if (isRaining || temp < 5) {
    pick("temperature")
  } else if (temp > 30) {
    seed % 2 === 0 ? pick("temperature") : pick("weather_fit")
  } else {
    seed % 3 === 0 ? pick("weather_fit") : pick("temperature")
  }

  // === Q2: Time of day or Fullness ===
  
  // === Q2: Time of day or Fullness ===
  // Bias time_of_day question based on actual hour
  const isMorning = hour >= 6 && hour < 10
  const isLateNight = hour >= 22 || hour < 6
  const timeQuestions: string[] = isMorning
    ? ["time_of_day", "meal_size", "fullness"]
    : isLateNight
    ? ["time_of_day", "mood", "delivery_speed"]
    : ["time_of_day", "fullness", "meal_size", "delivery_speed"]
  const shuffledTime = shuffle(timeQuestions)
  for (const id of shuffledTime) {
    if (questions.length >= 2) break
    if (!used.has(id)) pick(id)
  }

  // === Q3: Category exclusion (most impactful) ===
  if (candidates.length >= 12) {
    seed % 2 === 0 ? pick("category_exclude") : pick("category_want")
  } else if (candidates.length >= 6) {
    const catPool = shuffle(["category_exclude", "category_want", "cuisine", "chinese_region"])
    for (const id of catPool) {
      if (!used.has(id)) { pick(id); break }
    }
  } else {
    pick("taste")
  }

  // === Q4: Taste/Flavor detail ===
  const tastePool = shuffle(["taste", "spice_level", "oil_level", "smell", "cooking_method", "texture"])
  for (const id of tastePool) {
    if (questions.length >= 4) break
    if (!used.has(id)) pick(id)
  }

  // === Q5: Fine-tuning (random from diverse pools) ===
  const fineTunePools = [
    ["protein", "meat_ratio", "carb_type", "rice_style", "noodle_type"],
    ["price", "value", "style", "eat_method", "drink"],
    ["mood", "activity", "companion", "cuisine", "chinese_region"],
  ]
  const selectedPool = fineTunePools[seed % fineTunePools.length]
  const shuffled = shuffle(selectedPool)
  for (const id of shuffled) {
    if (questions.length >= 5) break
    if (!used.has(id)) pick(id)
  }

  // Fill to exactly 5 if still short
  const remaining = shuffle(questionBank.map(q => q.id))
  while (questions.length < 5) {
    for (const id of remaining) {
      if (!used.has(id)) { pick(id); break }
    }
  }

  return questions
}
