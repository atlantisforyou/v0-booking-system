'use client'

import { Menu, Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

interface TopBarProps {
  onMenuToggle: () => void
}

export function TopBar({ onMenuToggle }: TopBarProps) {
  const router = useRouter()
  const { user } = useAuth()

  const handleProfileClick = () => {
    router.push('/profile')
  }

  return (
    <header className="bg-card border-b border-border h-16 flex items-center justify-between px-6 shadow-sm">
      <Button variant="ghost" size="icon" onClick={onMenuToggle} className="lg:hidden">
        <Menu className="w-5 h-5" />
      </Button>

      <div className="flex-1"></div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={handleProfileClick} title={user?.name}>
          <User className="w-5 h-5" />
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </header>
  )
}
