'use client'

import { useState, useEffect } from 'react'
import { kv } from '@vercel/kv'

interface Announcement {
  id: string
  content: string
  createdAt: string
}

export default function AnnouncementManagement() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [newAnnouncement, setNewAnnouncement] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  async function fetchAnnouncements() {
    setIsLoading(true)
    setError(null)
    try {
      const announcementList = await kv.lrange('announcements', 0, -1)
      setAnnouncements(announcementList.map(item => JSON.parse(item)))
    } catch (err) {
      setError('Failed to fetch announcements. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  async function addAnnouncement(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!newAnnouncement.trim()) {
      setError('Announcement content cannot be empty.')
      return
    }
    try {
      const announcement: Announcement = {
        id: Date.now().toString(),
        content: newAnnouncement,
        createdAt: new Date().toISOString()
      }
      await kv.rpush('announcements', JSON.stringify(announcement))
      setNewAnnouncement('')
      await fetchAnnouncements()
    } catch (err) {
      setError('Failed to add announcement. Please try again.')
    }
  }

  async function deleteAnnouncement(id: string) {
    setError(null)
    try {
      const index = announcements.findIndex(a => a.id === id)
      if (index !== -1) {
        await kv.lrem('announcements', 1, JSON.stringify(announcements[index]))
        await fetchAnnouncements()
      }
    } catch (err) {
      setError('Failed to delete announcement. Please try again.')
    }
  }

  if (isLoading) return <div className="text-center">Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">公告管理</h1>
      
      <form onSubmit={addAnnouncement} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <textarea
            placeholder="新公告內容"
            value={newAnnouncement}
            onChange={(e) => setNewAnnouncement(e.target.value)}
            className="flex-grow p-2 border rounded resize-none"
            rows={3}
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
            添加公告
          </button>
        </div>
      </form>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {announcements.length > 0 ? (
        <ul className="bg-white shadow rounded-lg divide-y">
          {announcements.map((announcement) => (
            <li key={announcement.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <p className="font-semibold">{new Date(announcement.createdAt).toLocaleString()}</p>
                <button
                  onClick={() => deleteAnnouncement(announcement.id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                >
                  刪除
                </button>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{announcement.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">目前沒有公告。</p>
      )}
    </div>
  )
}

