import LoginForm from "../components/LoginForm"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">歡迎登入</h1>
        <LoginForm />
      </div>
    </div>
  )
}
