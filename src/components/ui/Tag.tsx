import React from 'react'

interface TagProps {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
  removable?: boolean
  onRemove?: () => void
}

export const Tag: React.FC<TagProps> = ({ children, active, onClick, removable, onRemove }) => (
  <span
    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
      active ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
        : 'bg-gray-800 text-gray-400 border border-gray-700'
    } ${onClick ? 'cursor-pointer hover:bg-gray-700' : ''}`}
    onClick={onClick}
  >
    {children}
    {removable && (
      <button onClick={e => { e.stopPropagation(); onRemove?.() }} className="ml-0.5 hover:text-red-400">&times;</button>
    )}
  </span>
)