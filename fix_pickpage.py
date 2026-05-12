import os
BASE = r"C:\Users\key\Documents\New project 2\src"
def w(path, content):
    with open(os.path.join(BASE, path), "w", encoding="utf-8") as f:
        f.write(content)

w("views/PickPage.tsx", """import React, { useEffect, useState, useCallback } from 'react'
import { useFlowStore } from '../store/useFlowStore'
import { useUserStore } from '../store/useUserStore'
import { useFoodStore } from '../store/useFoodStore'
import { QuestionFlow } from '../components/pick-flow/QuestionFlow'
import { SlotMachine } from '../components/pick-flow/SlotMachine'
import { ResultCard } from '../components/pick-flow/ResultCard'
import { ReviewModal } from '../components/pick-flow/ReviewModal'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { HealthMode } from '../types'
import { getWeatherForUser, getWeatherTip } from '../engine/weather'

export const PickPage: React.FC = () => {
  const { phase, startFlow, spin, reSpin, confirmResult, resetFlow, spinCount, maxSpins, finalResult, weather } = useFlowStore()
  const { rules, storeEntries, healthMode, setHealthMode, addStoreEntry } = useUserStore()
  const { userRecipes, orderFood, getCooldownMap, addRecipe } = useFoodStore()
  const [reviewOpen, setReviewOpen] = useState(false)
  const [restartKey, setRestartKey] = useState(0)
  const [quickAddOpen, setQuickAddOpen] = useState(false)
  const [weatherLoading, setWeatherLoading] = useState(true)

  const getFilterParams = useCallback(() => {
    const blacklist = storeEntries.filter(e => e.type === 'blacklist')
    const whitelist = storeEntries.filter(e => e.type === 'whitelist')
    const cooldownMap = getCooldownMap()
    return { blacklist, whitelist, cooldownMap }
  }, [storeEntries, getCooldownMap])

  // Fetch weather on mount
  useEffect(() => {
    getWeatherForUser().then(w => {
      useFlowStore.getState().setWeather(w)
      setWeatherLoading(false)
    }).catch(() => setWeatherLoading(false))
  }, [])

  useEffect(() => {
    if (phase === 'idle') {
      const { blacklist, cooldownMap } = getFilterParams()
      const w = useFlowStore.getState().weather
      startFlow(blacklist, rules, cooldownMap, w ?? undefined)
    }
  }, [phase, restartKey])

  const handleSpin = () => {
    const { whitelist, blacklist, cooldownMap } = getFilterParams()
    spin(whitelist, rules, healthMode, userRecipes, blacklist, cooldownMap)
  }

  const handleReSpin = () => {
    const { whitelist, blacklist, cooldownMap } = getFilterParams()
    reSpin(whitelist, rules, healthMode, userRecipes, blacklist, cooldownMap)
  }

  const handleConfirm = () => {
    if (finalResult) {
      orderFood(finalResult.id)
      confirmResult()
      setReviewOpen(true)
    }
  }

  const handleReviewClose = () => {
    setReviewOpen(false)
    resetFlow()
    setRestartKey(k => k + 1)
  }

  const handleQuickAdd = () => {
    if (!finalResult) return
    addRecipe({
      id: Date.now().toString(),
      name: finalResult.name,
      storeName: finalResult.storeName,
      category: finalResult.category,
      tags: [],
      addedAt: Date.now(),
      frozen: false,
      timesOrdered: 0,
    })
    setQuickAddOpen(false)
  }

  const cycleHealthMode = () => {
    const modes: HealthMode[] = ['normal', 'healthy', 'junk']
    const idx = modes.indexOf(healthMode)
    setHealthMode(modes[(idx + 1) % 3])
  }

  const weatherTip = weather ? getWeatherTip(weather) : null

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-4">
          {weather && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="text-sm">
                {weather.condition === 'rain' ? '\ud83c\udf27\ufe0f' : weather.condition === 'clear' ? '\u2600\ufe0f' : '\u2601\ufe0f'}
              </span>
              {weather.temperature}\u00b0C
            </div>
          )}
          <span className="text-xs text-gray-600">
            \u98df\u8c31: {userRecipes.length} \u00b7 \u89c4\u5219: {rules.filter(r => r.enabled).length}
          </span>
        </div>
        <div className="flex gap-2">
          {finalResult && (
            <button onClick={() => setQuickAddOpen(true)}
              className="px-3 py-1.5 rounded-full text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >\u2795 \u52a0\u5165\u98df\u8c31</button>
          )}
          <button onClick={cycleHealthMode}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              healthMode === 'healthy' ? 'bg-green-500/10 text-green-400 border border-green-500/30' :
              healthMode === 'junk' ? 'bg-red-500/10 text-red-400 border border-red-500/30' :
              'bg-gray-800 text-gray-400 border border-gray-700'
            }`}
          >
            {healthMode === 'healthy' ? '\ud83e\udd57 \u5065\u5eb7' : healthMode === 'junk' ? '\ud83c\udf5f \u653e\u7eb5' : '\ud83c\udf7d\ufe0f \u6b63\u5e38'}
          </button>
        </div>
      </div>

      {/* Weather tip banner */}
      {weatherTip && phase === 'questioning' && (
        <div className="mx-auto max-w-xl mt-4 px-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-400">
            {weatherTip}
          </div>
        </div>
      )}

      {phase === 'idle' && (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <p className="text-gray-500 animate-pulse mb-2">\u6b63\u5728\u51c6\u5907...</p>
            {weatherLoading && <p className="text-xs text-gray-600">\ud83c\udf26\ufe0f \u83b7\u53d6\u5929\u6c14\u4e2d...</p>}
          </div>
        </div>
      )}

      {phase === 'questioning' && <QuestionFlow />}
      {phase === 'spinning' && <SlotMachine onComplete={handleSpin} />}

      {phase === 'result' && finalResult && (
        <ResultCard food={finalResult} spinCount={spinCount} maxSpins={maxSpins}
          onConfirm={handleConfirm} onReSpin={handleReSpin} />
      )}

      {phase === 'result' && !finalResult && (
        <div className="flex flex-col items-center justify-center pt-24">
          <p className="text-4xl mb-4">\ud83d\ude05</p>
          <p className="text-gray-400 mb-2">\u6392\u592a\u72e0\u4e86\uff01\u6ca1\u6709\u7b26\u5408\u6761\u4ef6\u7684\u9009\u9879</p>
          <p className="text-gray-500 text-sm mb-6">\u8bd5\u8bd5\u653e\u5bbd\u6761\u4ef6\uff1f</p>
          <Button onClick={handleReviewClose} variant="secondary">\u91cd\u65b0\u6765\u8fc7</Button>
        </div>
      )}

      {reviewOpen && finalResult && (
        <ReviewModal isOpen={reviewOpen} food={finalResult} onClose={handleReviewClose}
          onBlacklist={(entry) => { addStoreEntry(entry); handleReviewClose() }}
          onWhitelist={(entry) => { addStoreEntry(entry); handleReviewClose() }} />
      )}

      <Modal isOpen={quickAddOpen} onClose={() => setQuickAddOpen(false)} title="\u52a0\u5165\u98df\u8c31">
        {finalResult && (
          <div className="space-y-4">
            <p className="text-sm text-gray-300">
              \u5c06\u300c{finalResult.name}\u300d\u52a0\u5165\u4f60\u7684\u968f\u673a\u98df\u8c31\uff1f
            </p>
            <p className="text-xs text-gray-500">\u52a0\u5165\u540e\uff0c\u8fd9\u9053\u83dc\u5728\u968f\u673a\u65f6\u4f1a\u6709\u66f4\u9ad8\u6743\u91cd\u51fa\u73b0</p>
            <div className="flex gap-2">
              <Button onClick={handleQuickAdd} variant="primary" size="sm">\u786e\u8ba4\u52a0\u5165</Button>
              <Button onClick={() => setQuickAddOpen(false)} variant="ghost" size="sm">\u53d6\u6d88</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
""")

print("PickPage rewritten")
