'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { ApprovalDashboard } from '@/components/admin/approval-dashboard'
import { BookingDetailsModal } from '@/components/admin/booking-details-modal'

type AdminView = 'approvals' | 'feedback'

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

export default function ApprovalsPage() {
  const [currentView, setCurrentView] = useState<AdminView>('approvals')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  return (
    <DashboardLayout currentView="approvals" onViewChange={setCurrentView}>
      <ApprovalDashboard
        onSelectBooking={setSelectedBooking}
      />
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </DashboardLayout>
  )
}
