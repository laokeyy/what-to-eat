import React, { useState, useEffect } from 'react'

const FOOD_EMOJIS = ['🍔','🍗','🍜','🥗','🍕','🌮','🍣','🥘','🍱','🍩','🍲','🧋','🍢','🫕']

interface Props { onComplete: () => void }

export const SlotMachine: React.FC<Props> = ({ onComplete }) => {
  const [rolling, setRolling] = useState(FOOD_EMOJIS[0])
  const [speed, setSpeed] = useState(80)
  const [phase, setPhase] = useState<'fast' | 'slowing' | 'done'>('fast')

  useEffect(() => {
    const interval = setInterval(() => {
      setRolling(FOOD_EMOJIS[Math.floor(Math.random() * FOOD_EMOJIS.length)])
    }, speed)
    return () => clearInterval(interval)
  }, [speed])

  useEffect(() => {
    if (phase === 'fast') { const t = setTimeout(() => setPhase('slowing'), 1500); return () => clearTimeout(t) }
    if (phase === 'slowing') {
      setSpeed(150)
      const t1 = setTimeout(() => setSpeed(300), 600)
      const t2 = setTimeout(() => setSpeed(500), 1200)
      const t3 = setTimeout(() => { setPhase('done'); onComplete() }, 2200)
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }
  }, [phase, onComplete])

  return (
    <div className="flex flex-col items-center justify-center pt-24 animate-fadeIn">
      <p className="text-gray-400 mb-8 text-lg">命运之轮正在转动...</p>
      <div className={`text-8xl transition-all duration-200 ${phase === 'fast' ? 'animate-bounce' : phase === 'slowing' ? 'animate-pulse' : 'scale-125'}`}>
        {rolling}
      </div>
      <p className="text-gray-600 mt-8 text-sm">
        {phase === 'fast' ? '转转转...' : phase === 'slowing' ? '快要揭晓了...' : ''}
      </p>
    </div>
  )
}
