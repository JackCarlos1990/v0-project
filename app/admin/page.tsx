import { kv } from '@vercel/kv'

export default async function AdminDashboard() {
  const userCount = await kv.llen('users')
  const announcementCount = await kv.llen('announcements')
  const recentAnnouncements = await kv.lrange('announcements', 0, 4)

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">管理員儀表板</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">用戶統計</h2>
          <p className="text-3xl font-bold">{userCount}</p>
          <p className="text-gray-500">總用戶數</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">公告統計</h2>
          <p className="text-3xl font-bold">{announcementCount}</p>
          <p className="text-gray-500">總公告數</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">最近公告</h2>
        {recentAnnouncements.length > 0 ? (
          <ul className="space-y-2">
            {recentAnnouncements.map((announcement, index) => (
              <li key={index} className="border-b pb-2 last:border-b-0">
                {announcement}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">暫無公告</p>
        )}
      </div>
    </div>
  )
}

