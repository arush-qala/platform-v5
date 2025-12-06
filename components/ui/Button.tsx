'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-light uppercase tracking-wider transition-all duration-300 rounded-none'

  const variants = {
    primary: 'bg-black text-white hover:bg-neutral-800 border border-transparent',
    secondary: 'bg-transparent text-black border border-neutral-200 hover:border-black hover:bg-black hover:text-white',
    ghost: 'bg-transparent text-black hover:text-neutral-500',
  }

  const sizes = {
    sm: 'px-6 py-3 text-xs',
    md: 'px-10 py-4 text-sm',
    lg: 'px-12 py-5 text-base',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

