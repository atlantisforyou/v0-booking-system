'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Lock, ArrowRight } from 'lucide-react'

type PageType = 'login' | 'register' | 'forgot-password'

interface LoginFormProps {
  onSwitchPage: (page: PageType) => void
}

export function LoginForm({ onSwitchPage }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
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
            <h2 className="text-3xl font-bold mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-primary-foreground/80 text-sm">Access your booking dashboard</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-8 px-8 pb-8">
        {/* Added error message display */}
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}
        
        {/* Added demo credentials hint */}
        <div className="mb-4 p-3 bg-primary/10 border border-primary/30 rounded-lg text-primary text-xs">
          <p className="font-semibold mb-1">Demo Credentials:</p>
          <p>Admin: admin@booking.com / admin123</p>
          <p>Or any email with password ≥6 chars</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-sm font-semibold text-foreground/80">
                Password
              </Label>
              <button
                type="button"
                onClick={() => onSwitchPage('forgot-password')}
                className="text-xs font-medium text-primary hover:text-primary/80 transition-elegant"
              >
                Forgot password?
              </button>
            </div>
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

          {/* Sign In Button */}
          <Button 
            type="submit" 
            className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-elegant shadow-md hover:shadow-lg flex items-center justify-center gap-2 group disabled:opacity-60" 
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-elegant" />
              </>
            )}
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/30"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-background text-xs text-muted-foreground/60 font-medium">Or continue with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              type="button" 
              variant="outline"
              className="h-11 border border-border/50 hover:border-border text-foreground transition-elegant rounded-lg"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              </svg>
              <span className="hidden sm:inline text-sm">Google</span>
            </Button>
            <Button 
              type="button" 
              variant="outline"
              className="h-11 border border-border/50 hover:border-border text-foreground transition-elegant rounded-lg"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="hidden sm:inline text-sm">Facebook</span>
            </Button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => onSwitchPage('register')}
              className="font-semibold text-primary hover:text-primary/80 transition-elegant"
            >
              Create one now
            </button>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
