'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { AssetManagement } from '@/components/admin/asset-management'

type AssetView = 'rooms' | 'equipment'

export default function AssetsPage() {
  const [currentView, setCurrentView] = useState<AssetView>('rooms')

  return (
    <DashboardLayout currentView="assets" onViewChange={() => {}}>
      <AssetManagement currentView={currentView} onViewChange={setCurrentView} />
    </DashboardLayout>
  )
}
