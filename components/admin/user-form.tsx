'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'

interface User {
  id?: number
  name: string
  email: string
  department: string
  role: 'user' | 'admin'
  status?: 'active' | 'suspended'
  password?: string
}

interface UserFormProps {
  onClose: () => void
  editingUser: User | null
}

export function UserForm({ onClose, editingUser }: UserFormProps) {
  const [formData, setFormData] = useState<User>(
    editingUser || {
      name: '',
      email: '',
      department: '',
      role: 'user',
      status: 'active',
      password: '',
    }
  )

  const departments = ['Engineering', 'Marketing', 'Finance', 'HR', 'Operations', 'Sales', 'Support']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('User saved:', formData)
    onClose()
  }

  return (
    <Card className="mb-6">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <CardTitle>{editingUser ? 'Edit User' : 'Add New User'}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <select
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full h-10 px-3 border border-input rounded-md bg-background"
                required
              >
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as 'user' | 'admin' })}
                className="w-full h-10 px-3 border border-input rounded-md bg-background"
              >
                <option value="user">User</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>

          {!editingUser && (
            <div className="space-y-2">
              <Label htmlFor="password">Initial Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Generate random password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">User will be prompted to change password on first login</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              {editingUser ? 'Update User' : 'Create User'}
            </Button>
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
