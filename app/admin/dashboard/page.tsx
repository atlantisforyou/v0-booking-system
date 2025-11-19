'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { AdminDashboard } from '@/components/admin/admin-dashboard'

export default function AdminDashboardPage() {
  return (
    <DashboardLayout currentView="dashboard" onViewChange={() => {}}>
      <AdminDashboard />
    </DashboardLayout>
  )
}
