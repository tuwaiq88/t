// ملف خدمة المصادقة
import { useAppStore } from "./app-state"

// نموذج بيانات المستخدم
export interface User {
  id: string
  username: string
  fullName: string
  email: string
  role: "admin" | "employee" | "agent" | "customer"
  isActive: boolean
}

// بيانات المستخدمين المحلية (للتجربة فقط)
const users: User[] = [
  {
    id: "1",
    username: "admin",
    fullName: "مدير النظام",
    email: "admin@example.com",
    role: "admin",
    isActive: true,
  },
  {
    id: "2",
    username: "employee",
    fullName: "موظف النظام",
    email: "employee@example.com",
    role: "employee",
    isActive: true,
  },
  {
    id: "3",
    username: "agent",
    fullName: "وكيل الحجز",
    email: "agent@example.com",
    role: "agent",
    isActive: true,
  },
]

// كلمات المرور (في التطبيق الحقيقي يجب تخزينها بشكل آمن)
const passwords = {
  admin: "admin123",
  employee: "employee123",
  agent: "agent123",
}

// تسجيل الدخول والتحقق من صحة بيانات المستخدم
export const loginWithSession = async (username: string, password: string): Promise<User | null> => {
  // محاكاة تأخير الشبكة
  await new Promise((resolve) => setTimeout(resolve, 500))

  // البحث عن المستخدم
  const user = users.find((u) => u.username === username)

  // التحقق من وجود المستخدم وصحة كلمة المرور
  if (user && passwords[username] === password) {
    // تخزين بيانات المستخدم في الجلسة
    sessionStorage.setItem("currentUser", JSON.stringify(user))
    
    // تحديث حالة التطبيق
    useAppStore.getState().setCurrentUser(user)
    
    return user
  }

  return null
}

// استعادة جلسة المستخدم
export const restoreSession = (): boolean => {
  const userJson = sessionStorage.getItem("currentUser")
  
  if (userJson) {
    try {
      const user = JSON.parse(userJson)
      useAppStore.getState().setCurrentUser(user)
      return true
    } catch (error) {
      console.error("Error restoring session:", error)
    }
  }
  
  return false
}

// تسجيل الخروج
export const logout = (): void => {
  sessionStorage.removeItem("currentUser")
  useAppStore.getState().setCurrentUser(null)
}

// التحقق من حالة تسجيل الدخول
export const isLoggedIn = (): boolean => {
  return !!sessionStorage.getItem("currentUser")
}

// الحصول على المستخدم الحالي
export const getCurrentUser = (): User | null => {
  const userJson = sessionStorage.getItem("currentUser")
  
  if (userJson) {
    try {
      return JSON.parse(userJson)
    } catch (error) {
      console.error("Error parsing user data:", error)
    }
  }
  
  return null
}
