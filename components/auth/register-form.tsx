'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Lock, User, ArrowRight, Check } from 'lucide-react'

type PageType = 'login' | 'register' | 'forgot-password'
type Role = 'user' | 'admin'

interface RegisterFormProps {
  onSwitchPage: (page: PageType) => void
}

export function RegisterForm({ onSwitchPage }: RegisterFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<Role>('user')
  const [error, setError] = useState('')
  const { register, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      await register(name, email, password, role)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    }
  }

  return (
    <Card className="border border-border/40 shadow-elegant-lg backdrop-blur-sm">
      <CardHeader className="relative bg-gradient-to-br from-primary via-primary/80 to-primary/60 text-primary-foreground pb-8 pt-8 px-8 rounded-t-[0.75rem]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 relative">
            <Image
              src="/siperu-logo.png"
              alt="SIPERU Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2 tracking-tight">Create Account</h2>
            <p className="text-primary-foreground/80 text-sm">Join our booking system today</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-8 px-8 pb-8">
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Field */}
          <div className="space-y-3">
            <Label htmlFor="name" className="text-sm font-semibold text-foreground/80">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="pl-12 h-12 bg-background border border-border/50 rounded-lg placeholder:text-muted-foreground/60 transition-elegant focus:border-primary/50 focus:ring-2 focus:ring-primary/10 disabled:opacity-50"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-3">
            <Label htmlFor="email" className="text-sm font-semibold text-foreground/80">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="pl-12 h-12 bg-background border border-border/50 rounded-lg placeholder:text-muted-foreground/60 transition-elegant focus:border-primary/50 focus:ring-2 focus:ring-primary/10 disabled:opacity-50"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-3">
            <Label htmlFor="password" className="text-sm font-semibold text-foreground/80">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="pl-12 h-12 bg-background border border-border/50 rounded-lg placeholder:text-muted-foreground/60 transition-elegant focus:border-primary/50 focus:ring-2 focus:ring-primary/10 disabled:opacity-50"
                required
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-3">
            <Label htmlFor="confirm-password" className="text-sm font-semibold text-foreground/80">
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                className="pl-12 h-12 bg-background border border-border/50 rounded-lg placeholder:text-muted-foreground/60 transition-elegant focus:border-primary/50 focus:ring-2 focus:ring-primary/10 disabled:opacity-50"
                required
              />
            </div>
          </div>

          {/* Account Type Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground/80">
              Account Type
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {/* User Option */}
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`p-4 rounded-lg border-2 transition-elegant text-center ${
                  role === 'user'
                    ? 'border-primary bg-primary/5'
                    : 'border-border/50 hover:border-border'
                }`}
              >
                <User className="w-5 h-5 mx-auto mb-2" />
                <p className="text-sm font-semibold">User</p>
                <p className="text-xs text-muted-foreground">Book resources</p>
              </button>

              {/* Admin Option */}
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`p-4 rounded-lg border-2 transition-elegant text-center ${
                  role === 'admin'
                    ? 'border-accent bg-accent/5'
                    : 'border-border/50 hover:border-border'
                }`}
              >
                <Check className="w-5 h-5 mx-auto mb-2" />
                <p className="text-sm font-semibold">Admin</p>
                <p className="text-xs text-muted-foreground">Manage system</p>
              </button>
            </div>
          </div>

          {/* Create Account Button */}
          <Button 
            type="submit" 
            className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-elegant shadow-md hover:shadow-lg flex items-center justify-center gap-2 group mt-6 disabled:opacity-60" 
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-elegant" />
              </>
            )}
          </Button>

          {/* Sign In Link */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => onSwitchPage('login')}
              className="font-semibold text-primary hover:text-primary/80 transition-elegant"
            >
              Sign in here
            </button>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
