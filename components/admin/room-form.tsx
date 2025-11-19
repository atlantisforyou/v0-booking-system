'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'

interface Room {
  id?: number
  name: string
  capacity: number
  location: string
  floor?: number
  facilities: string[]
  status: 'available' | 'unavailable'
}

interface RoomFormProps {
  onClose: () => void
  editingRoom: Room | null
}

export function RoomForm({ onClose, editingRoom }: RoomFormProps) {
  const [formData, setFormData] = useState<Room>(
    editingRoom || {
      name: '',
      capacity: 0,
      location: '',
      floor: 1,
      facilities: [],
      status: 'available',
    }
  )

  const [facilityInput, setFacilityInput] = useState('')
  const availableFacilities = ['Projector', 'Whiteboard', 'TV', 'Video Conference', 'Sound System', 'WiFi']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Room saved:', formData)
    onClose()
  }

  const addFacility = (facility: string) => {
    if (!formData.facilities.includes(facility)) {
      setFormData({
        ...formData,
        facilities: [...formData.facilities, facility],
      })
    }
  }

  const removeFacility = (facility: string) => {
    setFormData({
      ...formData,
      facilities: formData.facilities.filter(f => f !== facility),
    })
  }

  return (
    <Card className="mb-6">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <CardTitle>{editingRoom ? 'Edit Room' : 'Add New Room'}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Room Name</Label>
              <Input
                id="name"
                placeholder="e.g., Meeting Room A"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity (people)</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Building A"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="floor">Floor</Label>
              <Input
                id="floor"
                type="number"
                value={formData.floor}
                onChange={(e) => setFormData({ ...formData, floor: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Facilities</Label>
            <div className="flex gap-2 flex-wrap mb-3">
              {availableFacilities.map((facility) => (
                <Button
                  key={facility}
                  type="button"
                  variant={formData.facilities.includes(facility) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => formData.facilities.includes(facility) ? removeFacility(facility) : addFacility(facility)}
                >
                  {facility}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Availability Status</Label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'available' | 'unavailable' })}
              className="w-full h-10 px-3 border border-input rounded-md bg-background"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              {editingRoom ? 'Update Room' : 'Add Room'}
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
