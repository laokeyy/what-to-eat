import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', size = 'md', disabled, className = '' }) => (
  <button
    className={`rounded-lg font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${
      { primary: 'bg-orange-500 hover:bg-orange-600 text-white',
        secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-200',
        ghost: 'bg-transparent hover:bg-gray-800 text-gray-300',
        danger: 'bg-red-600 hover:bg-red-700 text-white' }[variant]
    } ${
      { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-base', lg: 'px-6 py-3 text-lg' }[size]
    } ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
)