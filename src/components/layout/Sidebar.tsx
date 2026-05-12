import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'

const navItems = [
  { to: '/pick', label: '选饭吃', emoji: '🎲' },
  { to: '/recipes', label: '我的食谱', emoji: '📋' },
  { to: '/rules', label: '规则', emoji: '⚙️' },
  { to: '/profile', label: '我的', emoji: '👤' },
  { to: '/discover', label: '发现', emoji: '🔮' },
]

export const Sidebar: React.FC = () => {
  const healthMode = useUserStore(s => s.healthMode)
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebarContent = (
    <>
      <div className="p-5 border-b border-gray-800">
        <h1 className="text-lg font-bold text-white">🍜 这顿吃啥</h1>
        <p className="text-xs text-gray-500 mt-1">别再纠结了</p>
      </div>
      <nav className="flex-1 py-4">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3 text-sm transition-colors ${
                isActive ? 'bg-orange-500/10 text-orange-400 border-r-2 border-orange-500'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900'
              }`
            }
          >
            <span className="text-lg">{item.emoji}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-500 mb-1">当前模式</div>
        <div className={`text-sm font-medium ${
          healthMode === 'healthy' ? 'text-green-400' :
          healthMode === 'junk' ? 'text-red-400' : 'text-gray-300'
        }`}>
          {healthMode === 'healthy' ? '🥗 健康' : healthMode === 'junk' ? '🍟 放纵' : '🍽️ 正常'}
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-3 left-3 z-50 lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-gray-900 border border-gray-700 text-gray-400 hover:text-white"
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 h-screen bg-gray-950 border-r border-gray-800 flex-col fixed left-0 top-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-56 h-screen bg-gray-950 border-r border-gray-800 flex flex-col">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}
