'use client'

import { useState, useEffect } from 'react'
import { kv } from '@vercel/kv'

export default function AnnouncementManagement() {
  const [announcements, setAnnouncements] = useState([])
  const [newAnnouncement, setNewAnnouncement] = useState('')

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  async function fetchAnnouncements() {
    try {
      const announcementList = await kv.lrange('announcements', 0, -1)
      setAnnouncements(announcementList || [])
    } catch (error) {
      console.error('Error fetching announcements:', error)
    }
  }

  async function addAnnouncement(e) {
    e.preventDefault()
    try {
      await kv.rpush('announcements', newAnnouncement)
      setNewAnnouncement('')
      fetchAnnouncements()
    } catch (error) {
      console.error('Error adding announcement:', error)
    }
  }

  async function deleteAnnouncement(index) {
    try {
      await kv.lrem('announcements', 1, announcements[index])
      fetchAnnouncements()
    } catch (error) {
      console.error('Error deleting announcement:', error)
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold mb-6">公告管理</h1>
      
      <form onSubmit={addAnnouncement} className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="新公告內容"
            value={newAnnouncement}
            onChange={(e) => setNewAnnouncement(e.target.value)}
            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            發布公告
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {announcements.map((announcement, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded">
            <p className="flex-1">{announcement}</p>
            <button
              onClick={() => deleteAnnouncement(index)}
              className="ml-4 text-red-600 hover:text-red-900"
            >
              刪除
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
