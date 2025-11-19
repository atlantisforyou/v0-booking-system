'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'

interface Equipment {
  id?: number
  name: string
  type: string
  quantity: number
  condition: 'good' | 'fair' | 'needs-repair'
  status: 'available' | 'in-use'
}

interface EquipmentFormProps {
  onClose: () => void
  editingEquipment: Equipment | null
}

export function EquipmentForm({ onClose, editingEquipment }: EquipmentFormProps) {
  const [formData, setFormData] = useState<Equipment>(
    editingEquipment || {
      name: '',
      type: '',
      quantity: 1,
      condition: 'good',
      status: 'available',
    }
  )

  const equipmentTypes = ['AV Equipment', 'Office Equipment', 'Computer', 'Furniture', 'Accessories']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Equipment saved:', formData)
    onClose()
  }

  return (
    <Card className="mb-6">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <CardTitle>{editingEquipment ? 'Edit Equipment' : 'Add New Equipment'}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Equipment Name</Label>
              <Input
                id="name"
                placeholder="e.g., Projector"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full h-10 px-3 border border-input rounded-md bg-background"
                required
              >
                <option value="">Select type</option>
                {equipmentTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <select
                id="condition"
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value as 'good' | 'fair' | 'needs-repair' })}
                className="w-full h-10 px-3 border border-input rounded-md bg-background"
              >
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="needs-repair">Needs Repair</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Availability Status</Label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'available' | 'in-use' })}
              className="w-full h-10 px-3 border border-input rounded-md bg-background"
            >
              <option value="available">Available</option>
              <option value="in-use">In Use</option>
            </select>
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              {editingEquipment ? 'Update Equipment' : 'Add Equipment'}
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
