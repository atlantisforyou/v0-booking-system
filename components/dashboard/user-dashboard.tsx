'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface UserDashboardProps {
  onNewBooking: () => void
}

export function UserDashboard({ onNewBooking }: UserDashboardProps) {
  const stats = [
    { label: 'Total Bookings', value: '12', icon: Calendar, color: 'bg-blue-100 text-blue-600' },
    { label: 'Pending', value: '2', icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Approved', value: '9', icon: CheckCircle, color: 'bg-green-100 text-green-600' },
    { label: 'Rejected', value: '1', icon: AlertCircle, color: 'bg-red-100 text-red-600' },
  ]

  const upcomingBookings = [
    { id: 1, room: 'Meeting Room A', date: 'Nov 20, 2025', time: '2:00 PM - 3:00 PM', status: 'approved' },
    { id: 2, room: 'Projector Equipment', date: 'Nov 21, 2025', time: '10:00 AM - 12:00 PM', status: 'approved' },
    { id: 3, room: 'Conference Room B', date: 'Nov 22, 2025', time: '3:00 PM - 4:30 PM', status: 'pending' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome back, John!</h1>
        <Button onClick={onNewBooking} size="lg">
          + New Booking
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition">
                <div>
                  <p className="font-semibold">{booking.room}</p>
                  <p className="text-sm text-muted-foreground">{booking.date} • {booking.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  booking.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {booking.status === 'approved' ? 'Approved' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
