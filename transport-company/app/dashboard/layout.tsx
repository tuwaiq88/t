"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"
import { useAppStore } from "@/lib/app-state"
import { isLoggedIn } from "@/lib/auth-service"
import { PanelLeft, Bell, User } from 'lucide-react'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const currentUser = useAppStore((state) => state.currentUser)

  useEffect(() => {
    // التحقق من تسجيل الدخول
    if (!isLoggedIn()) {
      router.push("/login?redirect=/dashboard")
    }
  }, [router])

  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        <div className="flex-1">
          <Breadcrumb />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="outline" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <Sidebar isCollapsed={isCollapsed} className="hidden md:flex" />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
