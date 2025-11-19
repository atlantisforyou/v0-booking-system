'use client'

import Image from 'next/image'
import { Calendar, Home, LogOut, Settings, User, BookOpen, BarChart3, Building2, Users, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'

interface SidebarProps {
  isOpen: boolean
  currentView: string
  onViewChange: (view: string) => void
}

export function Sidebar({ isOpen, currentView, onViewChange }: SidebarProps) {
  const { user, logout } = useAuth()

  const userMenuItems = [
    { id: 'overview', label: 'Dashboard', icon: Home },
    { id: 'new-booking', label: 'New Booking', icon: Calendar },
    { id: 'history', label: 'Booking History', icon: BookOpen },
  ]

  const adminMenuItems = [
    { id: 'admin-dashboard', label: 'Analytics', icon: BarChart3 },
    { id: 'approvals', label: 'Approvals', icon: FileText },
    { id: 'assets', label: 'Assets', icon: Building2 },
    { id: 'users', label: 'Users', icon: Users },
  ]

  const menuItems = user?.role === 'admin' ? adminMenuItems : userMenuItems

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-0'} bg-sidebar border-r border-sidebar-border transition-all duration-300 overflow-hidden flex flex-col`}>
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative flex-shrink-0">
            <Image
              src="/siperu-logo.png"
              alt="SIPERU Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <span className="text-sidebar-foreground font-bold text-xs block leading-tight">SIPERU</span>
            <span className="text-sidebar-foreground/60 font-medium text-xs">Booking System</span>
          </div>
        </div>
      </div>

      {user && (
        <div className="px-6 py-4 border-b border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/60 mb-1">Logged in as</p>
          <p className="text-sm font-semibold text-sidebar-foreground truncate">{user.name}</p>
          <p className="text-xs text-sidebar-foreground/50 capitalize">{user.role}</p>
        </div>
      )}

      <nav className="flex-1 p-4 space-y-1">
        {user?.role === 'user' && (
          <>
            <p className="px-4 py-2 text-xs font-semibold text-sidebar-foreground/60 uppercase">Main</p>
          </>
        )}
        {user?.role === 'admin' && (
          <>
            <p className="px-4 py-2 text-xs font-semibold text-sidebar-foreground/60 uppercase">Admin</p>
          </>
        )}
        
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentView === item.id
                ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-all">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
        <Button 
          onClick={logout}
          variant="ghost" 
          className="w-full justify-start gap-3 text-sidebar-foreground hover:text-destructive"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </aside>
  )
}
