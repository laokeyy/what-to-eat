import React, { useState } from 'react'
import { useUserStore } from '../store/useUserStore'
import { Rule } from '../types'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'

const RULE_TEMPLATES: Omit<Rule, 'id'>[] = [
  { type: 'hard', description: '不连续两顿吃一样的', enabled: true, excludeTags: [] },
  { type: 'hard', description: '工作日午餐不超过35元', enabled: false, maxPrice: 35 },
  { type: 'soft', description: '偏辣口味', enabled: false, preferTags: ['辣'], weightMultiplier: 2 },
  { type: 'soft', description: '偏甜口味', enabled: false, preferTags: ['甜'], weightMultiplier: 2 },
  { type: 'soft', description: '不要带汤的', enabled: false, preferTags: ['干爽'], excludeTags: ['汤水'], weightMultiplier: 3 },
  { type: 'soft', description: '好收拾的（干爽型）', enabled: false, preferTags: ['干爽'], weightMultiplier: 1.5 },
]

export const RulesPage: React.FC = () => {
  const { rules, addRule, removeRule, toggleRule } = useUserStore()
  const [showAdd, setShowAdd] = useState(false)

  const handleAddTemplate = (template: Omit<Rule, 'id'>) => {
    const newRule: Rule = { ...template, id: Date.now().toString() }
    addRule(newRule)
    setShowAdd(false)
  }

  const activeHard = rules.filter(r => r.type === 'hard' && r.enabled).length
  const activeSoft = rules.filter(r => r.type === 'soft' && r.enabled).length

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">⚙️ 规则引擎</h1>
          <p className="text-gray-500 text-sm mt-1">
            {rules.length} 条规则 · {activeHard} 硬规则 · {activeSoft} 软偏好
          </p>
        </div>
        <Button onClick={() => setShowAdd(true)} size="md">➕ 添加规则</Button>
      </div>

      {rules.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-4">🔧</p>
          <p>还没有自定义规则</p>
          <p className="text-xs mt-2 text-gray-600">规则帮助系统更好地理解你的偏好</p>
        </div>
      ) : (
        <div className="space-y-2">
          {rules.map(rule => (
            <div key={rule.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                rule.enabled ? 'bg-gray-900 border-gray-700' : 'bg-gray-900/50 border-gray-800 opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  rule.type === 'hard' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'
                }`}>
                  {rule.type === 'hard' ? '硬规则' : rule.type === 'soft' ? '软偏好' : '场景'}
                </span>
                <span className="text-sm text-gray-200">{rule.description}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleRule(rule.id)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${rule.enabled ? 'bg-orange-500' : 'bg-gray-700'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${rule.enabled ? 'left-4' : 'left-0.5'}`} />
                </button>
                <button onClick={() => removeRule(rule.id)}
                  className="px-2 py-1 text-xs rounded bg-gray-800 hover:bg-red-900/50 text-gray-400 hover:text-red-400 transition-colors"
                >删除</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="添加预置规则">
        <p className="text-gray-500 text-xs mb-4">选择一个模板添加到你的规则库（添加后可开关/删除）</p>
        <div className="space-y-2">
          {RULE_TEMPLATES.filter(t => !rules.some(r => r.description === t.description)).map(t => (
            <button key={t.description}
              onClick={() => handleAddTemplate(t)}
              className="w-full text-left p-3 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                  t.type === 'hard' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'
                }`}>{t.type === 'hard' ? '硬' : '软'}</span>
                <span className="text-sm text-gray-200">{t.description}</span>
              </div>
            </button>
          ))}
          {RULE_TEMPLATES.every(t => rules.some(r => r.description === t.description)) && (
            <p className="text-gray-500 text-sm text-center py-4">所有预置规则已添加 ✅</p>
          )}
        </div>
      </Modal>
    </div>
  )
}
