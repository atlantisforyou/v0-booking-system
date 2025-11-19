'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit2, Trash2, Search, Lock, Unlock } from 'lucide-react'
import { UserForm } from './user-form'

interface User {
  id: number
  name: string
  email: string
  department: string
  role: 'user' | 'admin'
  status: 'active' | 'suspended'
  joinDate: string
  bookings: number
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<'all' | 'user' | 'admin'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'suspended'>('all')
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@company.com', department: 'Engineering', role: 'user', status: 'active', joinDate: 'Jan 15, 2025', bookings: 12 },
    { id: 2, name: 'Jane Smith', email: 'jane@company.com', department: 'Marketing', role: 'admin', status: 'active', joinDate: 'Jan 10, 2025', bookings: 8 },
    { id: 3, name: 'Mike Johnson', email: 'mike@company.com', department: 'Finance', role: 'user', status: 'active', joinDate: 'Jan 20, 2025', bookings: 5 },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@company.com', department: 'HR', role: 'user', status: 'suspended', joinDate: 'Dec 15, 2024', bookings: 3 },
    { id: 5, name: 'Tom Brown', email: 'tom@company.com', department: 'Operations', role: 'admin', status: 'active', joinDate: 'Jan 5, 2025', bookings: 15 },
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const stats = [
    { label: 'Total Users', value: users.length, color: 'text-blue-600' },
    { label: 'Admins', value: users.filter(u => u.role === 'admin').length, color: 'text-purple-600' },
    { label: 'Active', value: users.filter(u => u.status === 'active').length, color: 'text-green-600' },
    { label: 'Suspended', value: users.filter(u => u.status === 'suspended').length, color: 'text-red-600' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button onClick={() => { setEditingUser(null); setShowForm(true) }} className="gap-2">
          <Plus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      {showForm && (
        <UserForm onClose={() => { setShowForm(false); setEditingUser(null) }} editingUser={editingUser} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as any)}
              className="px-4 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">All Roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Name</th>
                  <th className="text-left py-3 px-4 font-semibold">Email</th>
                  <th className="text-left py-3 px-4 font-semibold">Department</th>
                  <th className="text-left py-3 px-4 font-semibold">Role</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Bookings</th>
                  <th className="text-center py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="py-4 px-4 font-medium">{user.name}</td>
                    <td className="py-4 px-4 text-muted-foreground">{user.email}</td>
                    <td className="py-4 px-4 text-muted-foreground">{user.department}</td>
                    <td className="py-4 px-4">
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={user.status === 'active' ? 'bg-green-600' : 'bg-gray-600'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">{user.bookings}</td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => { setEditingUser(user); setShowForm(true) }}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={user.status === 'active' ? 'text-destructive hover:text-destructive' : 'text-green-600 hover:text-green-700'}
                        >
                          {user.status === 'active' ? (
                            <Lock className="w-4 h-4" />
                          ) : (
                            <Unlock className="w-4 h-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No users found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
