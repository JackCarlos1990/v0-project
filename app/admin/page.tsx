export default function AdminDashboard() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold mb-4">管理員儀表板</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-medium mb-2">用戶管理</h2>
          <p className="text-gray-600">管理系統用戶，包括添加、刪除和修改用戶信息。</p>
          <a href="/admin/users" className="mt-4 inline-block text-blue-500 hover:text-blue-600">
            進入用戶管理 →
          </a>
        </div>
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-medium mb-2">公告管理</h2>
          <p className="text-gray-600">管理系統公告，發布新公告或修改現有公告。</p>
          <a href="/admin/announcements" className="mt-4 inline-block text-blue-500 hover:text-blue-600">
            進入公告管理 →
          </a>
        </div>
      </div>
    </div>
  )
}
