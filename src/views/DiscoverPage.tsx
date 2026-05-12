import React, { useState } from 'react'

export const DiscoverPage: React.FC = () => {
  const [blindMode, setBlindMode] = useState(false)
  const [blindRatio, setBlindRatio] = useState(10)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">🔮 发现</h1>

      {/* Blind Box */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold">🔮 盲盒模式</h2>
            <p className="text-xs text-gray-500 mt-1">在随机中混入你没吃过的店，给生活一点惊喜</p>
          </div>
          <button
            onClick={() => setBlindMode(!blindMode)}
            className={`w-10 h-6 rounded-full transition-colors relative ${blindMode ? 'bg-purple-500' : 'bg-gray-700'}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${blindMode ? 'left-4' : 'left-0.5'}`} />
          </button>
        </div>
        {blindMode && (
          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-xs text-gray-400 mb-2">陌生店铺比例</p>
            <div className="flex gap-2">
              {[10, 20, 30, 50].map(r => (
                <button key={r}
                  onClick={() => setBlindRatio(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    blindRatio === r ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >{r}%</button>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {blindRatio === 10 ? '保守 — 偶尔来点新花样' :
               blindRatio === 20 ? '适中 — 有一定新鲜感' :
               blindRatio === 30 ? '冒险 — 三分之一是新面孔' :
               '疯批 — 一半都是没吃过的！'}
            </p>
          </div>
        )}
      </div>

      {/* Challenges */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-4">
        <h2 className="text-lg font-semibold mb-3">🎯 挑战模式</h2>
        <p className="text-xs text-gray-500 mb-4">完成挑战获取徽章，解锁专属优惠</p>
        <div className="space-y-2">
          {[
            { emoji: '🗺️', title: '新店猎手', desc: '一个月内尝试10家没去过的店', progress: '0/10' },
            { emoji: '🎲', title: '绝不重复', desc: '连续7天点不同的店', progress: '0/7' },
            { emoji: '🌱', title: '素食星期二', desc: '每周二点素食', progress: '0次' },
            { emoji: '💰', title: '省钱达人', desc: '本月外卖花费低于预算', progress: '¥0/¥800' },
          ].map(c => (
            <div key={c.title} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
              <span className="text-xl">{c.emoji}</span>
              <div className="flex-1">
                <p className="text-sm text-white">{c.title}</p>
                <p className="text-xs text-gray-500">{c.desc}</p>
              </div>
              <span className="text-xs text-gray-600">{c.progress}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Food Buddy */}
      <div className="border border-dashed border-gray-700 rounded-xl p-6 text-center text-gray-600">
        <p className="text-sm">👥 饭搭子模式 — 即将上线</p>
        <p className="text-xs mt-1">多人一起纠结时，各自排除取交集，自动算AA</p>
      </div>
    </div>
  )
}
