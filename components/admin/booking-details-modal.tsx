'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X } from 'lucide-react'

interface Booking {
  id: number
  user: string
  item: string
  type: string
  date: string
  time: string
  purpose: string
  status: 'pending' | 'approved' | 'rejected'
  notes?: string
}

interface BookingDetailsModalProps {
  booking: Booking
  onClose: () => void
}

export function BookingDetailsModal({ booking, onClose }: BookingDetailsModalProps) {
  const [action, setAction] = useState<'none' | 'approve' | 'reject'>('none')
  const [rejectReason, setRejectReason] = useState('')
  const [approvalNotes, setApprovalNotes] = useState('')

  const handleApprove = () => {
    console.log('Approved booking:', booking.id, approvalNotes)
    onClose()
  }

  const handleReject = () => {
    console.log('Rejected booking:', booking.id, rejectReason)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <CardTitle>Booking Details</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">User</p>
              <p className="font-semibold">{booking.user}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Item</p>
              <p className="font-semibold">{booking.item}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-semibold">{booking.date}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-semibold">{booking.time}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Purpose</p>
              <p className="font-semibold">{booking.purpose}</p>
            </div>
          </div>

          {action === 'none' && (
            <div className="flex gap-3">
              <Button
                onClick={() => setAction('approve')}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Approve Request
              </Button>
              <Button
                onClick={() => setAction('reject')}
                variant="destructive"
                className="flex-1"
              >
                Reject Request
              </Button>
            </div>
          )}

          {action === 'approve' && (
            <div className="space-y-4 border-t pt-4">
              <div>
                <label className="block text-sm font-medium mb-2">Approval Notes (Optional)</label>
                <textarea
                  placeholder="Add any notes for the user..."
                  value={approvalNotes}
                  onChange={(e) => setApprovalNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  rows={3}
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleApprove} className="flex-1 bg-green-600 hover:bg-green-700">
                  Confirm Approval
                </Button>
                <Button onClick={() => setAction('none')} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {action === 'reject' && (
            <div className="space-y-4 border-t pt-4">
              <div>
                <label className="block text-sm font-medium mb-2">Reason for Rejection</label>
                <textarea
                  placeholder="Explain why this booking is being rejected..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  rows={3}
                  required
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleReject} variant="destructive" className="flex-1">
                  Confirm Rejection
                </Button>
                <Button onClick={() => setAction('none')} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
