import React, { useState } from 'react'
import { useFoodStore } from '../store/useFoodStore'
import { FoodCategory, UserRecipe } from '../types'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { Tag } from '../components/ui/Tag'

export const RecipesPage: React.FC = () => {
  const { userRecipes, addRecipe, removeRecipe, toggleFreeze } = useFoodStore()
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState('')
  const [newStore, setNewStore] = useState('')
  const [newCategory, setNewCategory] = useState<FoodCategory | ''>('')
  const [newTags, setNewTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  const handleAdd = () => {
    if (!newName.trim()) return
    const recipe: UserRecipe = {
      id: Date.now().toString(),
      name: newName.trim(),
      storeName: newStore.trim() || undefined,
      category: newCategory || undefined,
      tags: newTags,
      addedAt: Date.now(),
      frozen: false,
      timesOrdered: 0,
    }
    addRecipe(recipe)
    setNewName(''); setNewStore(''); setNewCategory(''); setNewTags([]); setShowAdd(false)
  }

  const addTag = () => {
    if (tagInput.trim() && !newTags.includes(tagInput.trim())) {
      setNewTags([...newTags, tagInput.trim()])
      setTagInput('')
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">📋 我的食谱</h1>
          <p className="text-gray-500 text-sm mt-1">{userRecipes.length} 条食谱 · {userRecipes.filter(r => !r.frozen).length} 活跃</p>
        </div>
        <Button onClick={() => setShowAdd(true)} size="md">➕ 添加食谱</Button>
      </div>

      {userRecipes.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-4">📝</p>
          <p>还没有食谱，点击上方的按钮添加你喜欢吃的吧！</p>
          <p className="text-xs mt-2 text-gray-600">支持三级粒度：单品 / 店铺-单品 / 品类</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {userRecipes.map(recipe => (
            <div key={recipe.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                recipe.frozen ? 'bg-gray-900/50 border-gray-800 opacity-60' : 'bg-gray-900 border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">{recipe.name}</span>
                  {recipe.frozen && <span className="text-xs text-gray-500">❄️ 已冷冻</span>}
                  <span className="text-xs text-gray-600">点了 {recipe.timesOrdered} 次</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {recipe.storeName && <span className="text-xs text-gray-500">@{recipe.storeName}</span>}
                  {recipe.category && <span className="text-xs text-gray-500">· {recipe.category}</span>}
                  {recipe.cooldownUntil && recipe.cooldownUntil > Date.now() && (
                    <span className="text-xs text-yellow-500">⏳ 冷却中</span>
                  )}
                </div>
                {recipe.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {recipe.tags.map(t => <Tag key={t}>{t}</Tag>)}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggleFreeze(recipe.id)}
                  className="px-2 py-1 text-xs rounded bg-gray-800 hover:bg-gray-700 text-gray-400 transition-colors"
                >{recipe.frozen ? '解冻' : '冷冻'}</button>
                <button onClick={() => removeRecipe(recipe.id)}
                  className="px-2 py-1 text-xs rounded bg-gray-800 hover:bg-red-900/50 text-gray-400 hover:text-red-400 transition-colors"
                >删除</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="添加食谱">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1">菜名 *</label>
            <input value={newName} onChange={e => setNewName(e.target.value)}
              placeholder="例如：青椒炒肉、香辣鸡腿堡..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">店铺（可选，锁定店铺）</label>
            <input value={newStore} onChange={e => setNewStore(e.target.value)}
              placeholder="例如：麦当劳"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">品类（可选）</label>
            <select value={newCategory} onChange={e => setNewCategory(e.target.value as FoodCategory)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500"
            >
              <option value="">不限</option>
              {Object.values(FoodCategory).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">标签</label>
            <div className="flex gap-2">
              <input value={tagInput} onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
                placeholder="输入标签后回车..."
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
              />
              <Button onClick={addTag} variant="secondary" size="sm">添加</Button>
            </div>
            {newTags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {newTags.map(t => <Tag key={t} removable onRemove={() => setNewTags(newTags.filter(x => x !== t))}>{t}</Tag>)}
              </div>
            )}
          </div>
          <Button onClick={handleAdd} variant="primary" className="w-full" disabled={!newName.trim()}>确认添加</Button>
        </div>
      </Modal>
    </div>
  )
}
