import { create } from 'zustand'
import { Rule, StoreEntry, HealthMode } from '../types'

interface UserStore {
  rules: Rule[]
  storeEntries: StoreEntry[]
  healthMode: HealthMode
  addRule: (rule: Rule) => void
  removeRule: (id: string) => void
  toggleRule: (id: string) => void
  addStoreEntry: (entry: StoreEntry) => void
  removeStoreEntry: (storeId: string) => void
  setHealthMode: (mode: HealthMode) => void
}

const STORAGE_KEY = 'food-app-user'

function loadUserData(): { rules: Rule[]; storeEntries: StoreEntry[]; healthMode: HealthMode } {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : { rules: [], storeEntries: [], healthMode: 'normal' as HealthMode }
  } catch { return { rules: [], storeEntries: [], healthMode: 'normal' } }
}

function saveUserData(data: { rules: Rule[]; storeEntries: StoreEntry[]; healthMode: HealthMode }) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const useUserStore = create<UserStore>((set) => {
  const initial = loadUserData()
  return {
    ...initial,

    addRule: (rule) => set(state => {
      const data = { rules: [...state.rules, rule], storeEntries: state.storeEntries, healthMode: state.healthMode }
      saveUserData(data)
      return data
    }),

    removeRule: (id) => set(state => {
      const data = { rules: state.rules.filter(r => r.id !== id), storeEntries: state.storeEntries, healthMode: state.healthMode }
      saveUserData(data)
      return data
    }),

    toggleRule: (id) => set(state => {
      const rules = state.rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r)
      const data = { rules, storeEntries: state.storeEntries, healthMode: state.healthMode }
      saveUserData(data)
      return data
    }),

    addStoreEntry: (entry) => set(state => {
      const entries = state.storeEntries.filter(e => e.storeId !== entry.storeId).concat(entry)
      const data = { rules: state.rules, storeEntries: entries, healthMode: state.healthMode }
      saveUserData(data)
      return data
    }),

    removeStoreEntry: (storeId) => set(state => {
      const entries = state.storeEntries.filter(e => e.storeId !== storeId)
      const data = { rules: state.rules, storeEntries: entries, healthMode: state.healthMode }
      saveUserData(data)
      return data
    }),

    setHealthMode: (mode) => set(state => {
      const data = { rules: state.rules, storeEntries: state.storeEntries, healthMode: mode }
      saveUserData(data)
      return data
    }),
  }
})