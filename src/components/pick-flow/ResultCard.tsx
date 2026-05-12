import React from 'react'
import { Food } from '../../types'
import { Button } from '../ui/Button'

interface Props {
  food: Food
  spinCount: number
  maxSpins: number
  onConfirm: () => void
  onReSpin: () => void
}

export const ResultCard: React.FC<Props> = ({ food, spinCount, maxSpins, onConfirm, onReSpin }) => {
  const remaining = maxSpins - spinCount
  return (
    <div className="max-w-md mx-auto pt-16 px-4 animate-fadeIn">
      <p className="text-center text-gray-400 mb-6">🎉 这顿吃这个！</p>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="text-5xl">{food.emoji}</div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">{food.name}</h2>
            <p className="text-gray-400 text-sm mt-1">{food.storeName}</p>
            <div className="flex gap-4 mt-3 text-sm">
              <span className="text-yellow-400">⭐ {food.rating}</span>
              <span className="text-orange-400">💰 ¥{food.price}</span>
              <span className="text-blue-400">🕐 ~{food.deliveryTime}min</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {food.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-gray-800 rounded-md text-xs text-gray-400">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Button onClick={onConfirm} variant="primary" size="lg" className="flex-1">就它了！👍</Button>
        <Button onClick={onReSpin} variant="secondary" size="lg" disabled={remaining <= 0}>
          {remaining > 0 ? `换一个 (${remaining})` : '没次数了'}
        </Button>
      </div>
      {remaining === 0 && <p className="text-center text-gray-500 text-xs mt-3">换太多次了！要不下次自己选？😅</p>}
    </div>
  )
}
