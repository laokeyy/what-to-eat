# 「这顿吃什么外卖」— 技术设计文档

> 版本：v1.0 | 日期：2026-05-12 | 状态：MVP 阶段

## 1. 技术选型

| 项目 | 选择 | 理由 |
|------|------|------|
| 框架 | React 18 + TypeScript | 状态管理复杂，TS 类型安全 |
| 构建 | Vite | 快，生态好 |
| 路由 | React Router v6 | 侧边栏导航需路由 |
| 状态管理 | Zustand | 轻量，适合中型应用 |
| 样式 | CSS Modules + CSS变量 | 无第三方依赖，可控 |
| 动画 | CSS Animations + Framer Motion（转盘） | 核心体验需要流畅动画 |
| 数据 | 纯前端 Mock | MVP 阶段无需后端 |
| 存储 | localStorage | 用户数据本地持久化 |

## 2. 项目结构

```
src/
├── main.tsx                    # 入口
├── App.tsx                     # 路由 + 布局
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         # 侧边栏导航
│   │   └── AppLayout.tsx       # 侧边栏 + 主内容区布局
│   ├── pick-flow/
│   │   ├── QuestionCard.tsx    # 单个排除问题卡片
│   │   ├── QuestionFlow.tsx    # 问答流程控制器（1-3轮）
│   │   ├── SlotMachine.tsx     # 转盘揭晓动画
│   │   ├── ResultCard.tsx      # 结果展示 + 换一个
│   │   └── ReviewModal.tsx     # 评价/拉黑/加白名单弹窗
│   ├── recipes/
│   │   ├── RecipeList.tsx      # 食谱列表
│   │   └── AddRecipeModal.tsx  # 添加食谱弹窗
│   ├── rules/
│   │   └── RuleEditor.tsx      # 规则编辑（骨架）
│   ├── profile/
│   │   └── ProfilePage.tsx     # 个人中心（骨架）
│   ├── discover/
│   │   └── DiscoverPage.tsx    # 发现页（骨架）
│   └── ui/                     # 通用UI原子组件
│       ├── Button.tsx
│       ├── Modal.tsx
│       ├── Tag.tsx
│       └── Toggle.tsx
├── views/                      # 页面级视图
│   ├── PickPage.tsx            # ⭐ 核心：选饭吃
│   ├── RecipesPage.tsx         # 食谱管理
│   ├── RulesPage.tsx           # 规则引擎
│   ├── ProfilePage.tsx         # 个人中心
│   └── DiscoverPage.tsx        # 发现
├── store/
│   ├── useFoodStore.ts         # 菜品/店铺/候选池
│   ├── useUserStore.ts         # 偏好/规则/黑白名单/健康模式
│   └── useFlowStore.ts         # 问答流程状态机
├── engine/
│   ├── exclude.ts              # 排除引擎：根据答案缩小候选集
│   ├── random.ts               # 加权随机算法
│   ├── questions.ts            # 动态问题生成器
│   └── health.ts               # 健康模式权重计算
├── data/
│   └── mock-foods.ts           # 模拟外卖数据（50+条目，覆盖多品类/店铺）
└── types/
    └── index.ts                # 全局类型定义
```

## 3. 数据模型

### 核心类型

```ts
// 菜品
interface Food {
  id: string;
  name: string;             // "香辣鸡腿堡"
  storeId: string;
  storeName: string;        // "麦当劳"
  category: FoodCategory;   // 西式快餐 / 中餐 / 日料 / ...
  price: number;
  tags: string[];           // ["辣", "油炸", "碳水", "干爽", "外卖包装好"]
  healthScore: number;      // 0-100，越高越健康
  image?: string;           // emoji占位
  deliveryTime: number;     // 预计配送分钟
  rating: number;           // 1-5
}

// 菜品品类
enum FoodCategory {
  CHINESE = "中餐炒菜",
  FAST_FOOD = "西式快餐",
  JAPANESE = "日料",
  KOREAN = "韩式",
  NOODLES = "面食",
  RICE_NOODLE = "粉/米线",
  MALATANG = "麻辣烫/冒菜",
  BBQ = "烧烤",
  SALAD = "轻食沙拉",
  DESSERT = "甜品/奶茶",
  HOTPOT = "火锅/干锅",
  SOUTHEAST = "东南亚",
}

// 用户规则
interface Rule {
  id: string;
  type: "hard" | "soft" | "scene";
  description: string;      // 用户可读描述
  condition: RuleCondition; // 触发条件
  action: RuleAction;       // 效果
}

// 用户食谱条目
interface UserRecipe {
  id: string;
  name: string;             // 用户命名的菜名
  storeName?: string;       // 可选锁定店铺
  category?: FoodCategory;  // 可选锁定品类
  tags: string[];           // 用户自定义标签
  addedAt: number;
  cooldownUntil?: number;   // 冷却期结束时间戳
  frozen: boolean;          // 是否冷冻
  timesOrdered: number;     // 点过次数
}

// 黑白名单条目
interface StoreEntry {
  storeId: string;
  storeName: string;
  type: "blacklist" | "whitelist";
  reason: string;
  timestamp: number;
}

// 问答流程状态
interface FlowState {
  phase: "idle" | "questioning" | "spinning" | "result" | "reviewing";
  currentQuestionIndex: number;
  questions: Question[];
  answers: Record<string, string[]>;
  candidates: Food[];          // 当前候选集
  finalResult: Food | null;
  spinCount: number;           // 本轮已换次数
  maxSpins: number;            // 最大换次数（默认5）
}
```

## 4. 核心引擎设计

### 4.1 排除引擎

```
输入：全部菜品池 + 用户答案
输出：缩减后的候选集

流程：
1. 加载全量菜品池（从mock数据 + 用户食谱）
2. 应用硬规则过滤：拉黑店铺、过敏、预算上限、冷却期
3. 应用问题答案过滤：按用户每轮回答逐步缩减
4. 应用软偏好加权：辣/甜/干爽/健康模式 → 调整权重
5. 返回加权后的候选集（未被完全排除的）
```

### 4.2 动态问题生成

```
根据当前候选集 + 一天中的时间 + 天气生成最有区分度的问题：

时间维度：
- 早餐 (6-10): Q1优先 "想吃热的还是冷的？"
- 午餐 (10-14): Q1优先 "主食还是轻食？"  
- 晚餐 (14-20): Q1优先 "丰盛点还是简单点？"
- 夜宵 (20-6): Q1优先 "重口味还是清淡？"

候选集维度：
- 如果候选集>30个 → 问品类级排除（"今天不想吃哪种类型？"）
- 如果候选集10-30个 → 问口味维度（辣/不辣/酸/甜）
- 如果候选集<10个 → 直接进入转盘

最多3轮问题，每轮可跳过。
```

### 4.3 加权随机算法

```
最终结果 = 加权随机(候选集)

权重因子：
- 基础权重：1.0
- 白名单店铺：+3.0
- 用户食谱匹配：+2.0
- 软偏好匹配（辣/甜等）：+1.0 ~ +2.0
- 健康模式调整：×0.3（健康）/ ×1.0（正常）/ ×5.0（反向健康）
- 新鲜度：超过30天未点 ×1.5，7天内点过 ×0.0（冷却）
- 天气匹配：+1.0
- 盲盒因子：陌生店铺 ×2.0（盲盒模式下）

加权后标准化到概率分布，跑 Math.random() 抽一个。
```

## 5. 路由设计

```
/                    → 重定向到 /pick
/pick                → 核心：选饭吃（问答 → 转盘 → 结果）
/recipes             → 我的食谱（骨架）
/rules               → 规则引擎（骨架）  
/profile             → 个人中心（骨架：黑白名单/历史/报告入口）
/discover            → 发现（骨架：盲盒/挑战/饭搭子入口）
```

## 6. MVP 交付范围

### ✅ P0 核心（完整实现）

| 功能 | 内容 |
|------|------|
| 问答排除引擎 | 动态问题池、1-3轮问答、跳过、空结果容错 |
| 自由添加食谱 | 三级粒度添加、标签、搜索 |
| 转盘仪式 | SlotMachine动画、"换一个"最多5次 |
| 黑白名单 | 评价后拉黑/加白名单 + 原因追问 |
| 结果展示 | 菜品卡片、店铺信息、价格、配送时间 |
| 个人规则 | 简单规则编辑（硬规则/软偏好开关） |
| 健康模式 | 三档切换 |
| Mock数据 | 50+菜品覆盖主要品类 |
### 🏗️ 骨架（路由+空状态）

| 功能 | 内容 |
|------|------|
| 天气感知 | 路由占位 + "即将上线" |
| 饭搭子 | 路由占位 |
| 偷懒闹钟 | 路由占位 |
| 盲盒模式 | 路由占位 |
| 年度报告 | Profile页入口占位 |
| 挑战模式 | Discover页入口占位 |
| 桌面小组件 | 不适用Web端，搁置 |

## 7. 设计约束

1. **纯前端**：无后端，数据全部mock + localStorage 持久化
2. **响应式**：侧边栏在 < 768px 时折叠为汉堡菜单
3. **暗色主题**：默认暗色，后续可加浅色切换
4. **无第三方UI库**：手写CSS，保持包体积小
5. **中文优先**：所有文案中文

## 8. 文件清单

| 文件 | 说明 |
|------|------|
| `src/types/index.ts` | 所有类型定义 |
| `src/data/mock-foods.ts` | 50+条模拟菜品数据 |
| `src/engine/exclude.ts` | 排除引擎 |
| `src/engine/random.ts` | 加权随机 |
| `src/engine/questions.ts` | 动态问题生成 |
| `src/engine/health.ts` | 健康模式计算 |
| `src/store/useFoodStore.ts` | 菜品/食谱状态 |
| `src/store/useUserStore.ts` | 用户偏好状态 |
| `src/store/useFlowStore.ts` | 问答流程状态 |
| `src/components/layout/Sidebar.tsx` | 侧边栏 |
| `src/components/layout/AppLayout.tsx` | 全局布局 |
| `src/components/pick-flow/*.tsx` | 核心流程5个组件 |
| `src/components/recipes/*.tsx` | 食谱组件 |
| `src/components/ui/*.tsx` | 基础UI组件 |
| `src/views/PickPage.tsx` | ⭐ 核心页面 |
| `src/views/RecipesPage.tsx` | 食谱页面 |
| `src/views/RulesPage.tsx` | 规则页面 |
| `src/views/ProfilePage.tsx` | 个人中心 |
| `src/views/DiscoverPage.tsx` | 发现页 |
| `src/App.tsx` | 路由 + 布局组装 |
| `src/main.tsx` | 入口 |

---

*文档版本：v1.0 | 2026-05-12*
