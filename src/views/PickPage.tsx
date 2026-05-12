import React, { useEffect, useState, useCallback } from 'react'
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
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-4">
          {weather && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="text-sm">
                {weather.condition === 'rain' ? '🌧️' : weather.condition === 'clear' ? '☀️' : '☁️'}
              </span>
              {weather.temperature}°C
            </div>
          )}
          <span className="text-xs text-gray-600">
            食谱: {userRecipes.length} · 规则: {rules.filter(r => r.enabled).length}
          </span>
        </div>
        <div className="flex gap-2">
          {finalResult && (
            <button onClick={() => setQuickAddOpen(true)}
              className="px-3 py-1.5 rounded-full text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >➕ 加入食谱</button>
          )}
          <button onClick={cycleHealthMode}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              healthMode === 'healthy' ? 'bg-green-500/10 text-green-400 border border-green-500/30' :
              healthMode === 'junk' ? 'bg-red-500/10 text-red-400 border border-red-500/30' :
              'bg-gray-800 text-gray-400 border border-gray-700'
            }`}
          >
            {healthMode === 'healthy' ? '🥗 健康' : healthMode === 'junk' ? '🍟 放纵' : '🍽️ 正常'}
          </button>
        </div>
      </div>

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
            <p className="text-gray-500 animate-pulse mb-2">正在准备...</p>
            {weatherLoading && <p className="text-xs text-gray-600">🌦️ 获取天气中...</p>}
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
          <p className="text-4xl mb-4">😅</p>
          <p className="text-gray-400 mb-2">排太狠了！没有符合条件的选项</p>
          <p className="text-gray-500 text-sm mb-6">试试放宽条件？</p>
          <Button onClick={handleReviewClose} variant="secondary">重新来过</Button>
        </div>
      )}

      {reviewOpen && finalResult && (
        <ReviewModal isOpen={reviewOpen} food={finalResult} onClose={handleReviewClose}
          onBlacklist={(entry) => { addStoreEntry(entry); handleReviewClose() }}
          onWhitelist={(entry) => { addStoreEntry(entry); handleReviewClose() }} />
      )}

      <Modal isOpen={quickAddOpen} onClose={() => setQuickAddOpen(false)} title="加入食谱">
        {finalResult && (
          <div className="space-y-4">
            <p className="text-sm text-gray-300">
              将「{finalResult.name}」加入你的随机食谱？
            </p>
            <p className="text-xs text-gray-500">加入后，这道菜在随机时会有更高权重出现</p>
            <div className="flex gap-2">
              <Button onClick={handleQuickAdd} variant="primary" size="sm">确认加入</Button>
              <Button onClick={() => setQuickAddOpen(false)} variant="ghost" size="sm">取消</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
