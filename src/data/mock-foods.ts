import { Food, FoodCategory, Store } from "../types"

export const mockStores: Store[] = [
  { id: "s1", name: "麦当劳", categories: [FoodCategory.FAST_FOOD], rating: 4.3, avgDeliveryTime: 30, tags: ["连锁", "快"] },
  { id: "s2", name: "肯德基", categories: [FoodCategory.FAST_FOOD], rating: 4.2, avgDeliveryTime: 28, tags: ["连锁", "快"] },
  { id: "s3", name: "兰州拉面", categories: [FoodCategory.NOODLES], rating: 4.5, avgDeliveryTime: 25, tags: ["热食", "汤水"] },
  { id: "s4", name: "沙县小吃", categories: [FoodCategory.CHINESE], rating: 4.0, avgDeliveryTime: 20, tags: ["实惠", "家常"] },
  { id: "s5", name: "杨国福麻辣烫", categories: [FoodCategory.MALATANG], rating: 4.1, avgDeliveryTime: 35, tags: ["辣", "热食", "汤水"] },
  { id: "s6", name: "张亮麻辣烫", categories: [FoodCategory.MALATANG], rating: 4.0, avgDeliveryTime: 32, tags: ["辣", "热食", "汤水"] },
  { id: "s7", name: "吉野家", categories: [FoodCategory.JAPANESE], rating: 4.2, avgDeliveryTime: 28, tags: ["连锁", "米饭"] },
  { id: "s8", name: "正一味", categories: [FoodCategory.KOREAN], rating: 4.1, avgDeliveryTime: 30, tags: ["辣", "米饭"] },
  { id: "s9", name: "Wagas", categories: [FoodCategory.SALAD], rating: 4.4, avgDeliveryTime: 25, tags: ["健康", "轻食"] },
  { id: "s10", name: "新元素", categories: [FoodCategory.SALAD], rating: 4.3, avgDeliveryTime: 30, tags: ["健康", "轻食"] },
  { id: "s11", name: "西贝莜面村", categories: [FoodCategory.CHINESE], rating: 4.5, avgDeliveryTime: 35, tags: ["西北菜", "面食"] },
  { id: "s12", name: "外婆家", categories: [FoodCategory.CHINESE], rating: 4.4, avgDeliveryTime: 32, tags: ["杭帮菜", "米饭"] },
  { id: "s13", name: "海底捞外送", categories: [FoodCategory.HOTPOT], rating: 4.6, avgDeliveryTime: 45, tags: ["火锅", "贵", "汤水"] },
  { id: "s14", name: "木屋烧烤", categories: [FoodCategory.BBQ], rating: 4.3, avgDeliveryTime: 35, tags: ["烧烤", "宵夜", "辣"] },
  { id: "s15", name: "喜茶", categories: [FoodCategory.DESSERT], rating: 4.5, avgDeliveryTime: 25, tags: ["奶茶", "甜"] },
  { id: "s16", name: "奈雪の茶", categories: [FoodCategory.DESSERT], rating: 4.4, avgDeliveryTime: 28, tags: ["奶茶", "甜"] },
  { id: "s17", name: "越南米粉", categories: [FoodCategory.SOUTHEAST], rating: 4.2, avgDeliveryTime: 30, tags: ["汤水", "酸"] },
  { id: "s18", name: "螺蛳粉先生", categories: [FoodCategory.RICE_NOODLE], rating: 4.0, avgDeliveryTime: 25, tags: ["辣", "酸", "重口味"] },
  { id: "s19", name: "霸蛮米粉", categories: [FoodCategory.RICE_NOODLE], rating: 4.3, avgDeliveryTime: 28, tags: ["辣", "重口味"] },
  { id: "s20", name: "黄焖鸡米饭", categories: [FoodCategory.CHINESE], rating: 4.1, avgDeliveryTime: 22, tags: ["实惠", "米饭", "热食"] },
  { id: "s21", name: "和合谷", categories: [FoodCategory.CHINESE], rating: 4.2, avgDeliveryTime: 25, tags: ["米饭", "家常", "实惠"] },
  { id: "s22", name: "必胜客", categories: [FoodCategory.FAST_FOOD], rating: 4.1, avgDeliveryTime: 35, tags: ["西式", "贵"] },
  { id: "s23", name: "鼎泰丰", categories: [FoodCategory.CHINESE], rating: 4.5, avgDeliveryTime: 35, tags: ["精品", "贵"] },
  { id: "s24", name: "永和大王", categories: [FoodCategory.CHINESE], rating: 4.0, avgDeliveryTime: 22, tags: ["实惠", "早餐"] },
  { id: "s25", name: "小满手工粉", categories: [FoodCategory.RICE_NOODLE], rating: 4.3, avgDeliveryTime: 28, tags: ["粉", "热食"] },
]

export const mockFoods: Food[] = [
  // 麦当劳
  { id: "f1", name: "巨无霸套餐", storeId: "s1", storeName: "麦当劳", category: FoodCategory.FAST_FOOD, price: 35, tags: ["汉堡", "油炸", "碳水", "牛肉"], healthScore: 35, deliveryTime: 30, rating: 4.3, emoji: "🍔" },
  { id: "f2", name: "麦辣鸡腿堡套餐", storeId: "s1", storeName: "麦当劳", category: FoodCategory.FAST_FOOD, price: 32, tags: ["汉堡", "油炸", "辣", "碳水", "鸡肉"], healthScore: 30, deliveryTime: 30, rating: 4.4, emoji: "🍗" },
  { id: "f3", name: "板烧鸡腿堡套餐", storeId: "s1", storeName: "麦当劳", category: FoodCategory.FAST_FOOD, price: 33, tags: ["汉堡", "鸡肉", "碳水"], healthScore: 40, deliveryTime: 30, rating: 4.2, emoji: "🍔" },
  { id: "f4", name: "麦乐鸡(20块)", storeId: "s1", storeName: "麦当劳", category: FoodCategory.FAST_FOOD, price: 28, tags: ["油炸", "鸡肉", "小食"], healthScore: 25, deliveryTime: 28, rating: 4.5, emoji: "🍗" },
  // 肯德基
  { id: "f5", name: "香辣鸡腿堡套餐", storeId: "s2", storeName: "肯德基", category: FoodCategory.FAST_FOOD, price: 33, tags: ["汉堡", "油炸", "辣", "碳水", "鸡肉"], healthScore: 30, deliveryTime: 28, rating: 4.4, emoji: "🍗" },
  { id: "f6", name: "吮指原味鸡(4块)", storeId: "s2", storeName: "肯德基", category: FoodCategory.FAST_FOOD, price: 30, tags: ["油炸", "鸡肉"], healthScore: 25, deliveryTime: 28, rating: 4.3, emoji: "🍗" },
  { id: "f7", name: "老北京鸡肉卷套餐", storeId: "s2", storeName: "肯德基", category: FoodCategory.FAST_FOOD, price: 28, tags: ["卷饼", "鸡肉", "碳水"], healthScore: 38, deliveryTime: 28, rating: 4.1, emoji: "🌯" },
  { id: "f8", name: "蛋挞(6个装)", storeId: "s2", storeName: "肯德基", category: FoodCategory.DESSERT, price: 24, tags: ["甜", "甜品", "蛋挞"], healthScore: 20, deliveryTime: 25, rating: 4.8, emoji: "🥚" },
  { id: "f40", name: "炸鸡排", storeId: "s2", storeName: "肯德基", category: FoodCategory.FAST_FOOD, price: 15, tags: ["油炸", "鸡肉", "小食"], healthScore: 20, deliveryTime: 25, rating: 4.2, emoji: "🍗" },
  // 兰州拉面
  { id: "f9", name: "兰州牛肉面", storeId: "s3", storeName: "兰州拉面", category: FoodCategory.NOODLES, price: 22, tags: ["面食", "牛肉", "热食", "汤水", "拉面"], healthScore: 55, deliveryTime: 25, rating: 4.5, emoji: "🍜" },
  { id: "f41", name: "牛肉炒面", storeId: "s3", storeName: "兰州拉面", category: FoodCategory.NOODLES, price: 24, tags: ["面食", "牛肉", "干爽", "炒", "拉面"], healthScore: 50, deliveryTime: 25, rating: 4.3, emoji: "🍝" },
  // 沙县小吃
  { id: "f38", name: "宫保鸡丁盖饭", storeId: "s4", storeName: "沙县小吃", category: FoodCategory.CHINESE, price: 20, tags: ["米饭", "鸡肉", "辣", "家常", "实惠", "盖浇饭"], healthScore: 48, deliveryTime: 20, rating: 4.2, emoji: "🥜" },
  { id: "f39", name: "青椒炒肉盖饭", storeId: "s4", storeName: "沙县小吃", category: FoodCategory.CHINESE, price: 20, tags: ["米饭", "猪肉", "家常", "实惠", "盖浇饭"], healthScore: 50, deliveryTime: 20, rating: 4.3, emoji: "🫑" },
  { id: "f42", name: "西红柿鸡蛋面", storeId: "s4", storeName: "沙县小吃", category: FoodCategory.NOODLES, price: 16, tags: ["面食", "鸡蛋", "家常", "实惠", "汤水"], healthScore: 60, deliveryTime: 20, rating: 4.0, emoji: "🍅" },
  { id: "f43", name: "红烧猪脚饭", storeId: "s4", storeName: "沙县小吃", category: FoodCategory.CHINESE, price: 25, tags: ["米饭", "猪肉", "实惠", "盖浇饭"], healthScore: 42, deliveryTime: 20, rating: 4.1, emoji: "🐷" },
  // 麻辣烫
  { id: "f10", name: "自选麻辣烫(微辣)", storeId: "s5", storeName: "杨国福麻辣烫", category: FoodCategory.MALATANG, price: 30, tags: ["辣", "热食", "汤水", "微辣"], healthScore: 40, deliveryTime: 35, rating: 4.1, emoji: "🥘" },
  { id: "f44", name: "自选麻辣烫(特辣)", storeId: "s6", storeName: "张亮麻辣烫", category: FoodCategory.MALATANG, price: 30, tags: ["辣", "热食", "汤水", "麻辣"], healthScore: 35, deliveryTime: 32, rating: 4.0, emoji: "🥘" },
  // 吉野家
  { id: "f11", name: "招牌牛肉饭(大)", storeId: "s7", storeName: "吉野家", category: FoodCategory.JAPANESE, price: 35, tags: ["米饭", "牛肉", "日式", "日式甜"], healthScore: 50, deliveryTime: 28, rating: 4.3, emoji: "🍱" },
  { id: "f12", name: "照烧鸡肉饭", storeId: "s7", storeName: "吉野家", category: FoodCategory.JAPANESE, price: 32, tags: ["米饭", "鸡肉", "日式", "日式甜"], healthScore: 55, deliveryTime: 28, rating: 4.4, emoji: "🍱" },
  { id: "f45", name: "咖喱牛肉饭", storeId: "s7", storeName: "吉野家", category: FoodCategory.JAPANESE, price: 33, tags: ["米饭", "牛肉", "日式", "咖喱"], healthScore: 48, deliveryTime: 28, rating: 4.2, emoji: "🍛" },
  // 正一味
  { id: "f35", name: "石锅拌饭", storeId: "s8", storeName: "正一味", category: FoodCategory.KOREAN, price: 32, tags: ["米饭", "韩式", "辣", "干爽"], healthScore: 52, deliveryTime: 30, rating: 4.1, emoji: "🍚" },
  { id: "f36", name: "大酱汤", storeId: "s8", storeName: "正一味", category: FoodCategory.KOREAN, price: 26, tags: ["汤水", "韩式", "辣"], healthScore: 55, deliveryTime: 28, rating: 4.0, emoji: "🥘" },
  { id: "f46", name: "韩式炸鸡(半只)", storeId: "s8", storeName: "正一味", category: FoodCategory.KOREAN, price: 38, tags: ["油炸", "鸡肉", "韩式", "甜"], healthScore: 25, deliveryTime: 32, rating: 4.3, emoji: "🍗" },
  // Wagas / 沙拉
  { id: "f19", name: "鸡肉牛油果沙拉", storeId: "s9", storeName: "Wagas", category: FoodCategory.SALAD, price: 48, tags: ["轻食", "健康", "鸡肉", "冷食"], healthScore: 85, deliveryTime: 25, rating: 4.4, emoji: "🥗" },
  { id: "f20", name: "泰式虾仁沙拉", storeId: "s9", storeName: "Wagas", category: FoodCategory.SALAD, price: 52, tags: ["轻食", "健康", "海鲜", "冷食", "酸"], healthScore: 88, deliveryTime: 25, rating: 4.5, emoji: "🥗" },
  { id: "f37", name: "凯撒沙拉+鸡肉", storeId: "s10", storeName: "新元素", category: FoodCategory.SALAD, price: 45, tags: ["轻食", "健康", "鸡肉", "冷食"], healthScore: 82, deliveryTime: 30, rating: 4.3, emoji: "🥗" },
  // 西贝
  { id: "f21", name: "烤羊排", storeId: "s11", storeName: "西贝莜面村", category: FoodCategory.CHINESE, price: 68, tags: ["西北菜", "羊肉", "干爽", "烧烤"], healthScore: 45, deliveryTime: 35, rating: 4.5, emoji: "🍖" },
  { id: "f22", name: "莜面鱼鱼", storeId: "s11", storeName: "西贝莜面村", category: FoodCategory.NOODLES, price: 38, tags: ["面食", "西北菜", "汤水", "健康"], healthScore: 65, deliveryTime: 32, rating: 4.4, emoji: "🍜" },
  { id: "f47", name: "牛大骨", storeId: "s11", storeName: "西贝莜面村", category: FoodCategory.CHINESE, price: 78, tags: ["牛肉", "西北菜", "干爽", "贵"], healthScore: 48, deliveryTime: 38, rating: 4.6, emoji: "🥩" },
  // 外婆家
  { id: "f23", name: "外婆红烧肉", storeId: "s12", storeName: "外婆家", category: FoodCategory.CHINESE, price: 42, tags: ["米饭", "猪肉", "甜", "杭帮菜", "红烧"], healthScore: 40, deliveryTime: 32, rating: 4.4, emoji: "🥩" },
  { id: "f24", name: "龙井虾仁", storeId: "s12", storeName: "外婆家", category: FoodCategory.CHINESE, price: 58, tags: ["海鲜", "杭帮菜", "清淡", "清蒸"], healthScore: 70, deliveryTime: 35, rating: 4.6, emoji: "🦐" },
  // 海底捞
  { id: "f25", name: "番茄牛腩锅(双人)", storeId: "s13", storeName: "海底捞外送", category: FoodCategory.HOTPOT, price: 128, tags: ["火锅", "牛肉", "汤水", "热食", "贵", "双人"], healthScore: 50, deliveryTime: 45, rating: 4.6, emoji: "🫕" },
  // 木屋烧烤
  { id: "f26", name: "烤串拼盘", storeId: "s14", storeName: "木屋烧烤", category: FoodCategory.BBQ, price: 48, tags: ["烧烤", "辣", "干爽", "宵夜", "牛肉", "猪肉"], healthScore: 30, deliveryTime: 35, rating: 4.3, emoji: "🍢" },
  { id: "f27", name: "烤生蚝(半打)", storeId: "s14", storeName: "木屋烧烤", category: FoodCategory.BBQ, price: 36, tags: ["烧烤", "海鲜", "宵夜"], healthScore: 45, deliveryTime: 35, rating: 4.5, emoji: "🦪" },
  // 喜茶/奈雪
  { id: "f28", name: "多肉葡萄", storeId: "s15", storeName: "喜茶", category: FoodCategory.DESSERT, price: 28, tags: ["奶茶", "甜", "冷饮"], healthScore: 15, deliveryTime: 25, rating: 4.6, emoji: "🍇" },
  { id: "f29", name: "霸气草莓", storeId: "s16", storeName: "奈雪の茶", category: FoodCategory.DESSERT, price: 26, tags: ["奶茶", "甜", "冷饮"], healthScore: 15, deliveryTime: 28, rating: 4.5, emoji: "🍓" },
  // 越南/东南亚
  { id: "f30", name: "牛肉河粉", storeId: "s17", storeName: "越南米粉", category: FoodCategory.SOUTHEAST, price: 32, tags: ["粉", "牛肉", "汤水", "酸", "清淡"], healthScore: 55, deliveryTime: 30, rating: 4.2, emoji: "🍜" },
  { id: "f48", name: "冬阴功米粉", storeId: "s17", storeName: "越南米粉", category: FoodCategory.SOUTHEAST, price: 35, tags: ["粉", "海鲜", "汤水", "酸", "辣", "东南亚"], healthScore: 50, deliveryTime: 30, rating: 4.1, emoji: "🦐" },
  // 螺蛳粉/米粉
  { id: "f31", name: "原味螺蛳粉", storeId: "s18", storeName: "螺蛳粉先生", category: FoodCategory.RICE_NOODLE, price: 18, tags: ["粉", "辣", "酸", "重口味", "汤水", "螺蛳粉"], healthScore: 35, deliveryTime: 25, rating: 4.0, emoji: "🍜" },
  { id: "f32", name: "招牌牛肉粉", storeId: "s19", storeName: "霸蛮米粉", category: FoodCategory.RICE_NOODLE, price: 28, tags: ["粉", "牛肉", "辣", "汤水"], healthScore: 45, deliveryTime: 28, rating: 4.3, emoji: "🍜" },
  { id: "f33", name: "酸菜牛肉粉", storeId: "s19", storeName: "霸蛮米粉", category: FoodCategory.RICE_NOODLE, price: 28, tags: ["粉", "牛肉", "辣", "酸", "汤水"], healthScore: 42, deliveryTime: 28, rating: 4.2, emoji: "🍜" },
  // 黄焖鸡
  { id: "f34", name: "黄焖鸡米饭(大)", storeId: "s20", storeName: "黄焖鸡米饭", category: FoodCategory.CHINESE, price: 24, tags: ["米饭", "鸡肉", "热食", "实惠", "盖浇饭", "砂锅"], healthScore: 50, deliveryTime: 22, rating: 4.1, emoji: "🍗" },
  // === 新增菜品 ===
  // 和合谷
  { id: "f49", name: "宫保鸡丁+米饭", storeId: "s21", storeName: "和合谷", category: FoodCategory.CHINESE, price: 26, tags: ["米饭", "鸡肉", "辣", "家常"], healthScore: 48, deliveryTime: 25, rating: 4.1, emoji: "🥜" },
  { id: "f50", name: "东坡肉饭", storeId: "s21", storeName: "和合谷", category: FoodCategory.CHINESE, price: 30, tags: ["米饭", "猪肉", "甜", "红烧"], healthScore: 38, deliveryTime: 25, rating: 4.2, emoji: "🥩" },
  // 必胜客
  { id: "f51", name: "超级至尊披萨(9寸)", storeId: "s22", storeName: "必胜客", category: FoodCategory.FAST_FOOD, price: 68, tags: ["西式", "碳水", "猪肉", "牛肉", "贵"], healthScore: 30, deliveryTime: 35, rating: 4.2, emoji: "🍕" },
  { id: "f52", name: "意式肉酱面", storeId: "s22", storeName: "必胜客", category: FoodCategory.FAST_FOOD, price: 35, tags: ["西式", "面食", "牛肉", "碳水"], healthScore: 42, deliveryTime: 32, rating: 4.1, emoji: "🍝" },
  // 鼎泰丰
  { id: "f53", name: "小笼包(10只)", storeId: "s23", storeName: "鼎泰丰", category: FoodCategory.CHINESE, price: 58, tags: ["猪肉", "精品", "贵", "江浙", "清蒸"], healthScore: 50, deliveryTime: 35, rating: 4.7, emoji: "🥟" },
  { id: "f54", name: "虾仁蛋炒饭", storeId: "s23", storeName: "鼎泰丰", category: FoodCategory.CHINESE, price: 48, tags: ["米饭", "海鲜", "鸡蛋", "精品", "炒"], healthScore: 55, deliveryTime: 32, rating: 4.5, emoji: "🍤" },
  // 永和大王
  { id: "f55", name: "油条豆浆套餐", storeId: "s24", storeName: "永和大王", category: FoodCategory.CHINESE, price: 15, tags: ["早餐", "实惠", "碳水", "豆浆"], healthScore: 45, deliveryTime: 20, rating: 4.0, emoji: "🥖" },
  { id: "f56", name: "卤肉饭", storeId: "s24", storeName: "永和大王", category: FoodCategory.CHINESE, price: 22, tags: ["米饭", "猪肉", "实惠", "家常"], healthScore: 42, deliveryTime: 22, rating: 4.1, emoji: "🍚" },
  // 小满手工粉
  { id: "f57", name: "酸汤肥牛粉", storeId: "s25", storeName: "小满手工粉", category: FoodCategory.RICE_NOODLE, price: 30, tags: ["粉", "牛肉", "酸", "辣", "汤水"], healthScore: 45, deliveryTime: 28, rating: 4.2, emoji: "🍜" },
  { id: "f58", name: "番茄牛腩粉", storeId: "s25", storeName: "小满手工粉", category: FoodCategory.RICE_NOODLE, price: 32, tags: ["粉", "牛肉", "不辣", "汤水", "番茄"], healthScore: 55, deliveryTime: 28, rating: 4.3, emoji: "🍅" },
  // 更多多样性菜品
  { id: "f59", name: "麻辣香锅(单人)", storeId: "s14", storeName: "木屋烧烤", category: FoodCategory.BBQ, price: 42, tags: ["辣", "麻辣", "干爽", "重口味", "牛肉", "猪肉"], healthScore: 32, deliveryTime: 33, rating: 4.2, emoji: "🍲" },
  { id: "f60", name: "寿司拼盘(12贯)", storeId: "s7", storeName: "吉野家", category: FoodCategory.JAPANESE, price: 55, tags: ["日式", "海鲜", "米饭", "冷食"], healthScore: 58, deliveryTime: 30, rating: 4.4, emoji: "🍣" },
  { id: "f61", name: "京酱肉丝+春饼", storeId: "s21", storeName: "和合谷", category: FoodCategory.CHINESE, price: 28, tags: ["猪肉", "卷饼", "甜", "东北"], healthScore: 45, deliveryTime: 26, rating: 4.0, emoji: "🫓" },
  { id: "f62", name: "辣椒炒肉盖饭", storeId: "s4", storeName: "沙县小吃", category: FoodCategory.CHINESE, price: 18, tags: ["米饭", "猪肉", "辣", "盖浇饭", "实惠", "爆炒"], healthScore: 45, deliveryTime: 20, rating: 4.2, emoji: "🌶️" },
  { id: "f63", name: "芝士牛肉堡(单层)", storeId: "s1", storeName: "麦当劳", category: FoodCategory.FAST_FOOD, price: 25, tags: ["汉堡", "牛肉", "碳水", "芝士"], healthScore: 35, deliveryTime: 28, rating: 4.3, emoji: "🧀" },
]
