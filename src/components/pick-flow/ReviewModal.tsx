import React, { useState } from 'react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Food, StoreEntry } from '../../types'

interface Props {
  isOpen: boolean
  food: Food
  onClose: () => void
  onBlacklist: (entry: StoreEntry) => void
  onWhitelist: (entry: StoreEntry) => void
}

const REASONS_BLACKLIST = ['不好吃','配送太慢','不卫生','态度差','价格虚高','量太少','包装差']
const REASONS_WHITELIST = ['好吃','性价比高','出餐快','干净','分量足','包装好']

export const ReviewModal: React.FC<Props> = ({ isOpen, food, onClose, onBlacklist, onWhitelist }) => {
  const [action, setAction] = useState<'none' | 'blacklist' | 'whitelist'>('none')
  const [reason, setReason] = useState('')
  const [customReason, setCustomReason] = useState('')
  const reasons = action === 'blacklist' ? REASONS_BLACKLIST : REASONS_WHITELIST

  const handleSubmit = () => {
    const finalReason = reason === '其他' ? customReason : reason
    if (!finalReason) return
    const entry: StoreEntry = {
      storeId: food.storeId, storeName: food.storeName,
      type: action as 'blacklist' | 'whitelist',
      reason: finalReason, timestamp: Date.now(),
    }
    if (action === 'blacklist') onBlacklist(entry)
    else onWhitelist(entry)
    setAction('none'); setReason(''); setCustomReason(''); onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="这顿怎么样？">
      {action === 'none' ? (
        <div className="space-y-3">
          <p className="text-gray-400 text-sm">
            「{food.emoji} {food.name}」来自 <strong className="text-gray-200">{food.storeName}</strong>
          </p>
          <p className="text-gray-500 text-xs">方便的话，告诉我对这家店的感受？（可选）</p>
          <div className="flex gap-3 mt-4">
            <Button onClick={() => setAction('blacklist')} variant="danger" size="md">🚫 拉黑这家店</Button>
            <Button onClick={() => setAction('whitelist')} variant="secondary" size="md">⭐ 加入常驻</Button>
          </div>
          <Button onClick={onClose} variant="ghost" size="sm" className="w-full mt-2">跳过，下次再说</Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-300">
            {action === 'blacklist'
              ? `收到！${food.storeName}被拉黑了 🚫 方便说下原因吗？`
              : `好的！${food.storeName}加入了常驻食谱 ⭐ 为什么喜欢这家？`}
          </p>
          <div className="flex flex-wrap gap-2">
            {reasons.map(r => (
              <button key={r} onClick={() => setReason(r)}
                className={`px-3 py-1.5 rounded-full text-xs transition-colors ${reason === r ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              >{r}</button>
            ))}
            <button onClick={() => setReason('其他')}
              className={`px-3 py-1.5 rounded-full text-xs transition-colors ${reason === '其他' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >其他</button>
          </div>
          {reason === '其他' && (
            <input type="text" value={customReason} onChange={e => setCustomReason(e.target.value)}
              placeholder="说说具体原因..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          )}
          <div className="flex gap-2">
            <Button onClick={handleSubmit} variant="primary" size="sm" disabled={!reason}>确认</Button>
            <Button onClick={() => { setAction('none'); setReason(''); setCustomReason('') }} variant="ghost" size="sm">返回</Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
