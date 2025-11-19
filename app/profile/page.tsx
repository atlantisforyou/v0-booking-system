'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { LogOut, User, Mail, Briefcase, ArrowLeft } from 'lucide-react'

export default function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    router.push('/')
    return null
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Button>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Profil Saya</h1>
          <p className="text-muted-foreground mt-2">Kelola informasi akun dan preferensi Anda</p>
        </div>

        {/* Profile Card */}
        <Card className="p-6 sm:p-8 border border-border/50 shadow-lg hover:shadow-xl transition-shadow">
          {/* Avatar Section */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border/50">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{user.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {user.role === 'admin' ? 'Administrator' : 'User Standar'}
              </p>
            </div>
          </div>

          {/* User Information */}
          <div className="space-y-6 mb-8">
            {/* Email */}
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground font-medium break-all">{user.email}</p>
              </div>
            </div>

            {/* Department */}
            <div className="flex items-start gap-4">
              <Briefcase className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Departemen</p>
                <p className="text-foreground font-medium">{user.department || 'Tidak Ditentukan'}</p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-start gap-4">
              <Briefcase className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="text-foreground font-medium capitalize">{user.role}</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="pt-6 border-t border-border/50">
            <Button
              onClick={handleLogout}
              className="w-full bg-destructive hover:bg-destructive/90 text-white gap-2 h-11"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-secondary/20 rounded-lg border border-secondary/30">
          <p className="text-sm text-muted-foreground">
            Untuk mengubah informasi profil, hubungi administrator sistem.
          </p>
        </div>
      </div>
    </div>
  )
}
