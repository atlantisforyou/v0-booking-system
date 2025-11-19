'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'
import { RoomForm } from './room-form'
import { EquipmentForm } from './equipment-form'

type AssetView = 'rooms' | 'equipment'

interface AssetManagementProps {
  currentView: AssetView
  onViewChange: (view: AssetView) => void
}

interface Room {
  id: number
  name: string
  capacity: number
  location: string
  facilities: string[]
  status: 'available' | 'unavailable'
}

interface Equipment {
  id: number
  name: string
  type: string
  quantity: number
  condition: 'good' | 'fair' | 'needs-repair'
  status: 'available' | 'in-use'
}

export function AssetManagement({ currentView, onViewChange }: AssetManagementProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Room | Equipment | null>(null)

  const rooms: Room[] = [
    { id: 1, name: 'Meeting Room A', capacity: 8, location: 'Floor 2', facilities: ['Projector', 'Whiteboard'], status: 'available' },
    { id: 2, name: 'Meeting Room B', capacity: 6, location: 'Floor 2', facilities: ['TV', 'Video Conference'], status: 'available' },
    { id: 3, name: 'Conference Room', capacity: 20, location: 'Floor 3', facilities: ['Projector', 'Sound System'], status: 'unavailable' },
  ]

  const equipment: Equipment[] = [
    { id: 1, name: 'Projector', type: 'AV Equipment', quantity: 3, condition: 'good', status: 'available' },
    { id: 2, name: 'Whiteboard Set', type: 'Office Equipment', quantity: 5, condition: 'good', status: 'available' },
    { id: 3, name: 'Laptop', type: 'Computer', quantity: 10, condition: 'fair', status: 'in-use' },
  ]

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredEquipment = equipment.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'good':
        return 'bg-green-100 text-green-700'
      case 'fair':
        return 'bg-yellow-100 text-yellow-700'
      case 'needs-repair':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Asset Management</h1>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add {currentView === 'rooms' ? 'Room' : 'Equipment'}
        </Button>
      </div>

      {showForm && (
        <>
          {currentView === 'rooms' ? (
            <RoomForm onClose={() => { setShowForm(false); setEditingItem(null) }} editingRoom={editingItem as Room | null} />
          ) : (
            <EquipmentForm onClose={() => { setShowForm(false); setEditingItem(null) }} editingEquipment={editingItem as Equipment | null} />
          )}
        </>
      )}

      <div className="flex gap-2 mb-4">
        <Button
          variant={currentView === 'rooms' ? 'default' : 'outline'}
          onClick={() => onViewChange('rooms')}
          className="flex-1"
        >
          Rooms
        </Button>
        <Button
          variant={currentView === 'equipment' ? 'default' : 'outline'}
          onClick={() => onViewChange('equipment')}
          className="flex-1"
        >
          Equipment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{currentView === 'rooms' ? 'Rooms' : 'Equipment'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder={`Search ${currentView}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="overflow-x-auto">
            {currentView === 'rooms' ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Capacity</th>
                    <th className="text-left py-3 px-4 font-semibold">Location</th>
                    <th className="text-left py-3 px-4 font-semibold">Facilities</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-center py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRooms.map((room) => (
                    <tr key={room.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-4 px-4 font-medium">{room.name}</td>
                      <td className="py-4 px-4">{room.capacity} people</td>
                      <td className="py-4 px-4 text-muted-foreground">{room.location}</td>
                      <td className="py-4 px-4 text-sm">
                        <div className="flex gap-1 flex-wrap">
                          {room.facilities.map((f, idx) => (
                            <Badge key={idx} variant="secondary">{f}</Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={room.status === 'available' ? 'bg-green-600' : 'bg-gray-600'}>
                          {room.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => { setEditingItem(room); setShowForm(true) }}
                          >
                            <Edit2 className="w-4 h-4" />
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
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Type</th>
                    <th className="text-left py-3 px-4 font-semibold">Quantity</th>
                    <th className="text-left py-3 px-4 font-semibold">Condition</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-center py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEquipment.map((item) => (
                    <tr key={item.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-4 px-4 font-medium">{item.name}</td>
                      <td className="py-4 px-4 text-muted-foreground">{item.type}</td>
                      <td className="py-4 px-4">{item.quantity}</td>
                      <td className="py-4 px-4">
                        <Badge className={getConditionColor(item.condition)}>
                          {item.condition}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={item.status === 'available' ? 'bg-green-600' : 'bg-blue-600'}>
                          {item.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => { setEditingItem(item); setShowForm(true) }}
                          >
                            <Edit2 className="w-4 h-4" />
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
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
