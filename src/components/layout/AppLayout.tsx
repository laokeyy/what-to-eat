import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export const AppLayout: React.FC = () => (
  <div className="min-h-screen bg-gray-950 text-white">
    <Sidebar />
    <main className="lg:ml-56 min-h-screen pt-12 lg:pt-0">
      <Outlet />
    </main>
  </div>
)
