'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, CheckCircle, XCircle } from 'lucide-react'

interface Booking {
  id: number
  user: string
  item: string
  type: string
  date: string
  time: string
  purpose: string
  status: 'pending' | 'approved' | 'rejected'
}

interface ApprovalDashboardProps {
  onSelectBooking: (booking: Booking) => void
}

export function ApprovalDashboard({ onSelectBooking }: ApprovalDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const pendingBookings: Booking[] = [
    { id: 1, user: 'John Doe', item: 'Meeting Room A', type: 'room', date: 'Nov 20, 2025', time: '2:00 PM - 3:00 PM', purpose: 'Team Standup', status: 'pending' },
    { id: 2, user: 'Jane Smith', item: 'Projector Equipment', type: 'equipment', date: 'Nov 21, 2025', time: '10:00 AM - 12:00 PM', purpose: 'Presentation', status: 'pending' },
    { id: 3, user: 'Mike Johnson', item: 'Conference Room B', type: 'room', date: 'Nov 22, 2025', time: '3:00 PM - 4:30 PM', purpose: 'Client Meeting', status: 'pending' },
  ]

  const filteredBookings = pendingBookings.filter(booking => {
    const matchesSearch = booking.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.item.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || booking.type === filterType
    return matchesSearch && matchesFilter
  })

  const stats = [
    { label: 'Pending Approvals', value: '3', color: 'text-yellow-600' },
    { label: 'Approved Today', value: '8', color: 'text-green-600' },
    { label: 'Rejected', value: '1', color: 'text-red-600' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Booking Approvals</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Booking Requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by user or item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">All Types</option>
              <option value="room">Rooms</option>
              <option value="equipment">Equipment</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">User</th>
                  <th className="text-left py-3 px-4 font-semibold">Item</th>
                  <th className="text-left py-3 px-4 font-semibold">Date & Time</th>
                  <th className="text-left py-3 px-4 font-semibold">Purpose</th>
                  <th className="text-center py-3 px-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="py-4 px-4 font-medium">{booking.user}</td>
                    <td className="py-4 px-4">{booking.item}</td>
                    <td className="py-4 px-4 text-muted-foreground">{booking.date}<br />{booking.time}</td>
                    <td className="py-4 px-4">{booking.purpose}</td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => onSelectBooking(booking)}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => onSelectBooking(booking)}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No pending bookings found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
