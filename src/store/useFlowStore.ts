import { create } from 'zustand'
import { FlowPhase, Answer, FlowState, StoreEntry, Rule, HealthMode, UserRecipe } from '../types'
import { generateQuestions } from '../engine/questions'
import { getAllCandidates } from '../engine/exclude'
import { calculateWeight, weightedRandom } from '../engine/random'
import { mockFoods } from '../data/mock-foods'
import { WeatherData } from '../engine/weather'

interface FlowStore extends FlowState {
  weather: WeatherData | null
  startFlow: (blacklist: StoreEntry[], rules: Rule[], cooldownMap: Record<string, number>, weather?: WeatherData) => void
  answerQuestion: (questionId: string, values: string[]) => void
  skipQuestion: () => void
  spin: (whitelist: StoreEntry[], rules: Rule[], healthMode: HealthMode, userRecipes: UserRecipe[], blacklist: StoreEntry[], cooldownMap: Record<string, number>) => void
  reSpin: (whitelist: StoreEntry[], rules: Rule[], healthMode: HealthMode, userRecipes: UserRecipe[], blacklist: StoreEntry[], cooldownMap: Record<string, number>) => void
  confirmResult: () => void
  resetFlow: () => void
  setWeather: (weather: WeatherData) => void
}

const MAX_SPINS = 5

const initialState: FlowState & { weather: WeatherData | null } = {
  phase: 'idle' as FlowPhase,
  currentQuestionIndex: 0,
  questions: [],
  answers: [],
  candidates: [],
  finalResult: null,
  spinCount: 0,
  maxSpins: MAX_SPINS,
  weather: null,
}

export const useFlowStore = create<FlowStore>((set, get) => ({
  ...initialState,

  startFlow: (blacklist, rules, cooldownMap, weather) => {
    const candidates = getAllCandidates(mockFoods, [], rules, blacklist, cooldownMap)
    const questions = generateQuestions(candidates, weather)
    set({ ...initialState, weather: weather ?? null, phase: 'questioning', currentQuestionIndex: 0, questions, candidates })
  },

  answerQuestion: (questionId, values) => {
    const state = get()
    const answer: Answer = { questionId, selectedValues: values }
    const answers = [...state.answers, answer]
    const nextIndex = state.currentQuestionIndex + 1
    if (nextIndex >= state.questions.length) {
      set({ answers, phase: 'spinning', currentQuestionIndex: nextIndex })
    } else {
      set({ answers, currentQuestionIndex: nextIndex })
    }
  },

  skipQuestion: () => {
    const state = get()
    const nextIndex = state.currentQuestionIndex + 1
    if (nextIndex >= state.questions.length) {
      set({ phase: 'spinning', currentQuestionIndex: nextIndex })
    } else {
      set({ currentQuestionIndex: nextIndex })
    }
  },

  spin: (whitelist, rules, healthMode, userRecipes, blacklist, cooldownMap) => {
    const state = get()
    const candidates = getAllCandidates(mockFoods, state.answers, rules, blacklist, cooldownMap)
    if (candidates.length === 0) {
      set({ phase: 'result', finalResult: null })
      return
    }
    const weights = candidates.map(food => calculateWeight({
      food, rules, whitelist, healthMode, userRecipes, weather: state.weather ?? undefined,
    }))
    const result = weightedRandom(candidates, weights)
    set({ phase: 'result', finalResult: result, spinCount: state.spinCount + 1, candidates })
  },

  reSpin: (whitelist, rules, healthMode, userRecipes, blacklist, cooldownMap) => {
    const state = get()
    if (state.spinCount >= state.maxSpins) return
    get().spin(whitelist, rules, healthMode, userRecipes, blacklist, cooldownMap)
  },

  confirmResult: () => { set({ phase: 'reviewing' }) },
  resetFlow: () => { set({ ...initialState, weather: get().weather }) },
  setWeather: (weather) => { set({ weather }) },
}))
