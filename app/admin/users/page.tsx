'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { UserManagement } from '@/components/admin/user-management'

export default function UsersPage() {
  return (
    <DashboardLayout currentView="users" onViewChange={() => {}}>
      <UserManagement />
    </DashboardLayout>
  )
}
