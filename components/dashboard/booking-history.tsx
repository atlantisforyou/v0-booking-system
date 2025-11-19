'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Eye, X } from 'lucide-react'

export function BookingHistory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const bookings = [
    { id: 1, item: 'Meeting Room A', date: 'Nov 20, 2025', time: '2:00 PM - 3:00 PM', status: 'approved', type: 'room' },
    { id: 2, item: 'Projector Equipment', date: 'Nov 19, 2025', time: '10:00 AM - 12:00 PM', status: 'approved', type: 'equipment' },
    { id: 3, item: 'Conference Room B', date: 'Nov 18, 2025', time: '3:00 PM - 4:30 PM', status: 'pending', type: 'room' },
    { id: 4, item: 'Whiteboard Set', date: 'Nov 17, 2025', time: '1:00 PM - 2:00 PM', status: 'rejected', type: 'equipment' },
    { id: 5, item: 'Meeting Room B', date: 'Nov 16, 2025', time: '11:00 AM - 12:00 PM', status: 'approved', type: 'room' },
  ]

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.item.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'rejected':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Booking History</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Item</th>
                  <th className="text-left py-3 px-4 font-semibold">Date & Time</th>
                  <th className="text-left py-3 px-4 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-center py-3 px-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="py-4 px-4">{booking.item}</td>
                    <td className="py-4 px-4 text-muted-foreground">{booking.date}<br />{booking.time}</td>
                    <td className="py-4 px-4 capitalize">{booking.type}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
