// ملف إدارة الصلاحيات
import { User } from "./auth-service"

// قائمة الصلاحيات حسب الدور
const rolePermissions = {
  admin: [
    "view_all_bookings",
    "create_bookings",
    "edit_bookings",
    "delete_bookings",
    "confirm_bookings",
    "view_all_passengers",
    "view_financial_data",
    "manage_users",
    "manage_agents",
    "manage_employees",
    "manage_trips",
    "manage_buses",
    "manage_settings",
    "view_dashboard",
    "view_bookings",
    "view_trips",
    "view_passengers",
    "view_invoices",
    "view_statements",
    "view_employees",
    "view_agents",
    "view_branches",
    "view_reports",
    "view_settings",
  ],
  employee: [
    "view_all_bookings",
    "create_bookings",
    "edit_bookings",
    "confirm_bookings",
    "view_all_passengers",
    "view_dashboard",
    "view_bookings",
    "view_trips",
    "view_passengers",
    "view_invoices",
  ],
  agent: [
    "view_own_bookings",
    "create_bookings",
    "view_dashboard",
    "view_bookings",
    "view_trips",
  ],
  customer: [
    "view_own_bookings",
    "create_bookings",
    "view_bookings",
    "view_trips",
  ],
}

// التحقق من وجود صلاحية معينة للمستخدم
export const hasPermission = (user: User | null, permission: string): boolean => {
  if (!user) return false
  
  const userPermissions = rolePermissions[user.role] || []
  return userPermissions.includes(permission)
}

// التحقق من إمكانية عرض بيانات المسافر
export const canViewPassengerDetails = (user: User | null, bookingCreatorId: string): boolean => {
  if (!user) return false
  
  // المدير والموظف يمكنهم رؤية جميع البيانات
  if (user.role === "admin" || user.role === "employee") {
    return true
  }
  
  // الوكيل والعميل يمكنهم رؤية بيانات الحجوزات التي قاموا بإنشائها فقط
  return user.id === bookingCreatorId
}
EOL# إنشاء مكون الشريط الجانبي
mkdir -p components
cat > components/sidebar.tsx << 'EOL'
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAppStore } from "@/lib/app-state"
import { hasPermission } from "@/lib/permissions"
import { BarChart, Bus, Calendar, CreditCard, FileText, Home, Menu, Settings, Users, Building, LogOut, User, Ticket, Map } from 'lucide-react'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed?: boolean
}

export function Sidebar({ className, isCollapsed = false }: SidebarProps) {
  const pathname = usePathname()
  const currentUser = useAppStore((state) => state.currentUser)
  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  const navItems = [
    {
      title: "لوحة التحكم",
      href: "/dashboard",
      icon: Home,
      permission: "view_dashboard",
    },
    {
      title: "الحجوزات",
      href: "/bookings",
      icon: Ticket,
      permission: "view_bookings",
    },
    {
      title: "الرحلات",
      href: "/trips",
      icon: Bus,
      permission: "view_trips",
    },
    {
      title: "المسافرين",
      href: "/passengers",
      icon: Users,
      permission: "view_passengers",
    },
    {
      title: "الفواتير",
      href: "/finance/invoices",
      icon: FileText,
      permission: "view_invoices",
    },
    {
      title: "كشوفات الحسابات",
      href: "/finance/statements",
      icon: CreditCard,
      permission: "view_statements",
    },
    {
      title: "الموظفين",
      href: "/employees",
      icon: User,
      permission: "view_employees",
    },
    {
      title: "الوكلاء",
      href: "/agents",
      icon: Users,
      permission: "view_agents",
    },
    {
      title: "الفروع",
      href: "/branches",
      icon: Building,
      permission: "view_branches",
    },
    {
      title: "التقارير",
      href: "/dashboard/reports",
      icon: BarChart,
      permission: "view_reports",
    },
    {
      title: "الإعدادات",
      href: "/dashboard/settings",
      icon: Settings,
      permission: "view_settings",
    },
  ]

  const filteredNavItems = navItems.filter((item) => {
    // إذا لم يكن هناك صلاحية محددة، أو المستخدم لديه الصلاحية
    return !item.permission || hasPermission(currentUser, item.permission)
  })

  const NavItems = () => (
    <>
      {filteredNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setOpen(false)}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            pathname === item.href && "bg-muted text-primary",
            isCollapsed && "justify-center px-2"
          )}
        >
          <item.icon className={cn("h-5 w-5", isCollapsed ? "h-6 w-6" : "")} />
          {!isCollapsed && <span>{item.title}</span>}
        </Link>
      ))}
    </>
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-0">
          <div className="flex h-full flex-col">
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold">طويق للنقل البري</h2>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="flex flex-col gap-1">
                <NavItems />
              </div>
            </ScrollArea>
            <div className="border-t p-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/login">
                  <LogOut className="ml-2 h-4 w-4" />
                  تسجيل الخروج
                </Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className={cn("flex h-full flex-col border-l", className)}>
      <div className={cn("p-4", isCollapsed ? "text-center" : "")}>
        {!isCollapsed && <h2 className="text-lg font-semibold">طويق للنقل البري</h2>}
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-1">
          <NavItems />
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <Button variant="outline" className={cn("w-full", isCollapsed ? "justify-center px-2" : "justify-start")} asChild>
          <Link href="/login">
            <LogOut className={cn("h-4 w-4", isCollapsed ? "h-5 w-5" : "ml-2")} />
            {!isCollapsed && "تسجيل الخروج"}
          </Link>
        </Button>
      </div>
    </div>
  )
}
