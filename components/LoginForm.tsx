'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')

    if (username === '1234' && password === '1234') {
      router.push('/welcome')
    } else {
      setError('用戶名或密碼錯誤')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <input
          type="text"
          name="username"
          placeholder="用戶名"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="密碼"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <button 
        type="submit" 
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        登入
      </button>
    </form>
  )
}
