'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Calendar, Users, Building2, Zap, TrendingUp, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function AdminDashboard() {
  const bookingData = [
    { name: 'Mon', bookings: 24, approved: 20 },
    { name: 'Tue', bookings: 32, approved: 28 },
    { name: 'Wed', bookings: 28, approved: 25 },
    { name: 'Thu', bookings: 35, approved: 32 },
    { name: 'Fri', bookings: 42, approved: 38 },
    { name: 'Sat', bookings: 18, approved: 15 },
    { name: 'Sun', bookings: 12, approved: 10 },
  ]

  const roomUtilizationData = [
    { name: 'Meeting Room A', value: 78 },
    { name: 'Meeting Room B', value: 65 },
    { name: 'Conference Room', value: 45 },
  ]

  const equipmentUtilizationData = [
    { name: 'Mon', equipment: 18, rooms: 24 },
    { name: 'Tue', equipment: 22, rooms: 32 },
    { name: 'Wed', equipment: 20, rooms: 28 },
    { name: 'Thu', equipment: 28, rooms: 35 },
    { name: 'Fri', equipment: 32, rooms: 42 },
    { name: 'Sat', equipment: 14, rooms: 18 },
    { name: 'Sun', equipment: 10, rooms: 12 },
  ]

  const stats = [
    { label: 'Total Bookings', value: '247', icon: Calendar, color: 'bg-blue-100 text-blue-600', trend: '+12%' },
    { label: 'Active Users', value: '84', icon: Users, color: 'bg-purple-100 text-purple-600', trend: '+5%' },
    { label: 'Rooms Available', value: '12/15', icon: Building2, color: 'bg-green-100 text-green-600', trend: '80%' },
    { label: 'Equipment Items', value: '156', icon: Zap, color: 'bg-yellow-100 text-yellow-600', trend: '+8%' },
  ]

  const recentActivity = [
    { id: 1, action: 'Meeting Room A booked', user: 'John Doe', time: '2 hours ago', status: 'approved' },
    { id: 2, action: 'Projector equipment reserved', user: 'Jane Smith', time: '4 hours ago', status: 'approved' },
    { id: 3, action: 'Conference Room booking request', user: 'Mike Johnson', time: '6 hours ago', status: 'pending' },
    { id: 4, action: 'Equipment maintenance scheduled', user: 'Sarah Wilson', time: '8 hours ago', status: 'scheduled' },
    { id: 5, action: 'User account created', user: 'Tom Brown', time: '1 day ago', status: 'active' },
  ]

  const COLORS = ['#0ea5e9', '#8b5cf6', '#ec4899']

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your booking system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.trend}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Booking Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--foreground)" />
                <YAxis stroke="var(--foreground)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} />
                <Legend />
                <Bar dataKey="bookings" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="approved" fill="var(--chart-2)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Room Utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Room Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roomUtilizationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {roomUtilizationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Equipment vs Rooms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Equipment vs Rooms Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={equipmentUtilizationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--foreground)" />
                <YAxis stroke="var(--foreground)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} />
                <Legend />
                <Line type="monotone" dataKey="equipment" stroke="var(--chart-1)" strokeWidth={2} />
                <Line type="monotone" dataKey="rooms" stroke="var(--chart-2)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm font-medium">Total Pending</span>
                <span className="text-2xl font-bold text-yellow-600">8</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm font-medium">Approved Today</span>
                <span className="text-2xl font-bold text-green-600">24</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm font-medium">Rejected Today</span>
                <span className="text-2xl font-bold text-red-600">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Avg Response Time</span>
                <span className="text-2xl font-bold text-blue-600">2.5h</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">by {activity.user}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={
                    activity.status === 'approved' ? 'bg-green-600' :
                    activity.status === 'pending' ? 'bg-yellow-600' :
                    activity.status === 'scheduled' ? 'bg-blue-600' :
                    'bg-gray-600'
                  }>
                    {activity.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
