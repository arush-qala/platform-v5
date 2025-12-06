import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function Container({ children, className = '', maxWidth = 'xl' }: ContainerProps) {
  const maxWidths = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  }

  return (
    <div className={`mx-auto px-8 md:px-16 lg:px-24 ${maxWidths[maxWidth]} ${className}`}>
      {children}
    </div>
  )
}

