'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { UserDashboard } from '@/components/dashboard/user-dashboard'
import { BookingForm } from '@/components/dashboard/booking-form'
import { BookingHistory } from '@/components/dashboard/booking-history'
import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { ApprovalDashboard } from '@/components/admin/approval-dashboard'
import { AssetManagement } from '@/components/admin/asset-management'
import { UserManagement } from '@/components/admin/user-management'
import { BookingDetailsModal } from '@/components/admin/booking-details-modal'
import { useState } from 'react'

type DashboardView = 'overview' | 'new-booking' | 'history' | 'admin-dashboard' | 'approvals' | 'assets' | 'users'

interface Booking {
  id: number
  user: string
  item: string
  type: string
  date: string
  time: string
  purpose: string
  status: 'pending' | 'approved' | 'rejected'
  notes?: string
}

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [currentView, setCurrentView] = useState<DashboardView>('overview')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [assetView, setAssetView] = useState<'rooms' | 'equipment'>('rooms')

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!user) {
    return null
  }

  if (user.role === 'admin') {
    return (
      <DashboardLayout currentView={currentView} onViewChange={setCurrentView}>
        {currentView === 'admin-dashboard' && (
          <AdminDashboard />
        )}
        {currentView === 'approvals' && (
          <>
            <ApprovalDashboard onSelectBooking={setSelectedBooking} />
            {selectedBooking && (
              <BookingDetailsModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
            )}
          </>
        )}
        {currentView === 'assets' && (
          <AssetManagement currentView={assetView} onViewChange={setAssetView} />
        )}
        {currentView === 'users' && (
          <UserManagement />
        )}
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout currentView={currentView} onViewChange={setCurrentView}>
      {currentView === 'overview' && (
        <UserDashboard onNewBooking={() => setCurrentView('new-booking')} />
      )}
      {currentView === 'new-booking' && (
        <BookingForm onSuccess={() => setCurrentView('overview')} />
      )}
      {currentView === 'history' && (
        <BookingHistory />
      )}
    </DashboardLayout>
  )
}
