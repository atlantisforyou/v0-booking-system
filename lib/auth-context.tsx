'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  department?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: 'user' | 'admin') => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call with demo credentials
      if (email && password) {
        // Demo: admin user
        if (email === 'admin@booking.com' && password === 'admin123') {
          const adminUser: User = {
            id: '1',
            name: 'Admin User',
            email: 'admin@booking.com',
            role: 'admin',
            department: 'Management'
          }
          localStorage.setItem('user', JSON.stringify(adminUser))
          setUser(adminUser)
          router.push('/dashboard')
          return
        }
        // Demo: regular user
        if (email.includes('@') && password.length >= 6) {
          const regularUser: User = {
            id: '2',
            name: email.split('@')[0],
            email,
            role: 'user',
            department: 'User Department'
          }
          localStorage.setItem('user', JSON.stringify(regularUser))
          setUser(regularUser)
          router.push('/dashboard')
          return
        }
        throw new Error('Invalid email or password')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, role: 'user' | 'admin') => {
    setIsLoading(true)
    try {
      if (name && email && password) {
        const newUser: User = {
          id: Math.random().toString(),
          name,
          email,
          role,
          department: role === 'admin' ? 'Management' : 'User Department'
        }
        localStorage.setItem('user', JSON.stringify(newUser))
        setUser(newUser)
        router.push('/dashboard')
        return
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
