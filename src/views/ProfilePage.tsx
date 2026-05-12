import React from 'react'
import { useUserStore } from '../store/useUserStore'
import { useFoodStore } from '../store/useFoodStore'

export const ProfilePage: React.FC = () => {
  const { rules, storeEntries, healthMode, removeStoreEntry } = useUserStore()
  const { userRecipes } = useFoodStore()

  const blacklist = storeEntries.filter(e => e.type === 'blacklist')
  const whitelist = storeEntries.filter(e => e.type === 'whitelist')

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">👤 个人中心</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-orange-400">{userRecipes.length}</p>
          <p className="text-xs text-gray-500 mt-1">食谱数</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">{rules.filter(r => r.enabled).length}</p>
          <p className="text-xs text-gray-500 mt-1">活跃规则</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
          <p className={`text-2xl font-bold ${healthMode === 'healthy' ? 'text-green-400' : healthMode === 'junk' ? 'text-red-400' : 'text-gray-300'}`}>
            {healthMode === 'healthy' ? '🥗' : healthMode === 'junk' ? '🍟' : '🍽️'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {healthMode === 'healthy' ? '健康模式' : healthMode === 'junk' ? '放纵模式' : '正常模式'}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          🚫 已拉黑店铺
          <span className="text-xs text-gray-500 font-normal">({blacklist.length})</span>
        </h2>
        {blacklist.length === 0 ? (
          <p className="text-sm text-gray-500 py-4">还没有拉黑任何店铺，遇到不好的就拉黑吧</p>
        ) : (
          <div className="space-y-2">
            {blacklist.map(entry => (
              <div key={entry.storeId} className="flex items-center justify-between p-3 bg-gray-900 border border-gray-800 rounded-lg">
                <div>
                  <p className="text-sm text-white">{entry.storeName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">原因：{entry.reason}</p>
                </div>
                <button onClick={() => removeStoreEntry(entry.storeId)}
                  className="text-xs text-gray-500 hover:text-green-400 transition-colors"
                >撤销拉黑</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          ⭐ 常驻店铺
          <span className="text-xs text-gray-500 font-normal">({whitelist.length})</span>
        </h2>
        {whitelist.length === 0 ? (
          <p className="text-sm text-gray-500 py-4">还没有常驻店铺，遇到喜欢的就标记吧</p>
        ) : (
          <div className="space-y-2">
            {whitelist.map(entry => (
              <div key={entry.storeId} className="flex items-center justify-between p-3 bg-gray-900 border border-gray-800 rounded-lg">
                <div>
                  <p className="text-sm text-white">{entry.storeName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">原因：{entry.reason}</p>
                </div>
                <button onClick={() => removeStoreEntry(entry.storeId)}
                  className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                >移除常驻</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border border-dashed border-gray-700 rounded-xl p-6 text-center text-gray-600">
        <p className="text-sm">📊 饮食人格年度报告 — 即将上线</p>
      </div>
    </div>
  )
}
