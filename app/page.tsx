'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-purple-600">
      <Card className="w-full max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">登入</TabsTrigger>
            <TabsTrigger value="register">註冊</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <CardHeader>
              <CardTitle>登入帳號</CardTitle>
              <CardDescription>
                請輸入您的帳號密碼進行登入
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">電子郵件</Label>
                <Input id="email" placeholder="請輸入電子郵件" required type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">密碼</Label>
                <Input id="password" placeholder="請輸入密碼" required type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={onSubmit}
                disabled={isLoading}
              >
                {isLoading ? "登入中..." : "登入"}
              </Button>
            </CardFooter>
          </TabsContent>
          <TabsContent value="register">
            <CardHeader>
              <CardTitle>註冊帳號</CardTitle>
              <CardDescription>
                請填寫以下資料以創建新帳號
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-email">電子郵件</Label>
                <Input id="register-email" placeholder="請輸入電子郵件" required type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">密碼</Label>
                <Input id="register-password" placeholder="請輸入密碼" required type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">確認密碼</Label>
                <Input id="confirm-password" placeholder="請再次輸入密碼" required type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={onSubmit}
                disabled={isLoading}
              >
                {isLoading ? "註冊中..." : "註冊"}
              </Button>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>
    </main>
  )
}