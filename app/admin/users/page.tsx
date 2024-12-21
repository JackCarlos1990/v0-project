'use client'

import { useState, useEffect } from 'react'
import { kv } from '@vercel/kv'

interface User {
  name: string
  email: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState<User>({ name: '', email: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    setIsLoading(true)
    setError(null)
    try {
      const userList = await kv.lrange('users', 0, -1)
      setUsers(userList.map(user => JSON.parse(user)))
    } catch (err) {
      setError('Failed to fetch users. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  async function addUser(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await kv.rpush('users', JSON.stringify(newUser))
      setNewUser({ name: '', email: '' })
      await fetchUsers()
    } catch (err) {
      setError('Failed to add user. Please try again.')
    }
  }

  async function deleteUser(index: number) {
    setError(null)
    try {
      await kv.lrem('users', 1, JSON.stringify(users[index]))
      await fetchUsers()
    } catch (err) {
      setError('Failed to delete user. Please try again.')
    }
  }

  if (isLoading) return <div className="text-center">Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">用戶管理</h1>
      
      <form onSubmit={addUser} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="名稱"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="flex-grow p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="電子郵件"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="flex-grow p-2 border rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
            添加用戶
          </button>
        </div>
      </form>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {users.length > 0 ? (
        <ul className="bg-white shadow rounded-lg divide-y">
          {users.map((user, index) => (
            <li key={index} className="flex items-center justify-between p-4">
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={() => deleteUser(index)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
              >
                刪除
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">目前沒有用戶。</p>
      )}
    </div>
  )
}

