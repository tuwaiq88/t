import { create } from "zustand"

// تعريف أنواع البيانات
export interface User {
  id: string
  username: string
  fullName: string
  email: string
  role: "admin" | "employee" | "agent" | "customer"
  isActive: boolean
}

export interface Trip {
  id: string
  tripNumber: string
  route: string
  departureDate: string
  departureTime: string
  arrivalTime: string
  busId: string
  driverId: string
  status: "scheduled" | "active" | "completed" | "cancelled"
  availableSeats: number
  totalSeats: number
  price: number
}

export interface Booking {
  id: string
  bookingNumber: string
  tripId: string
  passengerFullName: string
  passportNumber: string
  nationality: string
  phoneNumber: string
  email: string
  seatNumber: string
  bookingStatus: "confirmed" | "pending" | "cancelled" | "completed"
  paymentStatus: "paid" | "pending" | "refunded" | "cancelled"
  paymentMethod: string
  totalAmount: number
  createdBy: string
  createdAt: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  customerName: string
  invoiceDate: string
  dueDate: string
  invoiceType: "booking" | "service" | "commission"
  items: {
    description: string
    quantity: number
    unitPrice: number
    total: number
  }[]
  subtotal: number
  tax: number
  discount: number
  total: number
  paymentStatus: "paid" | "partially-paid" | "pending" | "cancelled"
  notes: string
}

// إنشاء معرف فريد
export const generateId = () => {
  return Math.random().toString(36).substring(2, 9)
}

// تعريف حالة التطبيق
interface AppState {
  currentUser: User | null
  users: User[]
  trips: Trip[]
  bookings: Booking[]
  invoices: Invoice[]
  websiteContent: {
    homepageBanner: {
      title: string
      subtitle: string
      buttonText: string
      imageUrl: string
    }
    specialOffers: {
      id: string
      title: string
      description: string
      discount: string
      imageUrl: string
      isActive: boolean
      order: number
    }[]
    testimonials: {
      id: string
      name: string
      location: string
      rating: number
      comment: string
      isActive: boolean
    }[]
    destinations: {
      id: string
      name: string
      imageUrl: string
      isActive: boolean
    }[]
    services: {
      id: string
      title: string
      description: string
      icon: string
      isActive: boolean
    }[]
  }
  
  // الأفعال
  setCurrentUser: (user: User | null) => void
  addUser: (user: User) => void
  updateUser: (id: string, userData: Partial<User>) => void
  deleteUser: (id: string) => void
  addTrip: (trip: Trip) => void
  updateTrip: (id: string, tripData: Partial<Trip>) => void
  deleteTrip: (id: string) => void
  addBooking: (booking: Booking) => void
  updateBooking: (id: string, bookingData: Partial<Booking>) => void
  deleteBooking: (id: string) => void
  addInvoice: (invoice: Invoice) => void
  updateInvoice: (id: string, invoiceData: Partial<Invoice>) => void
  deleteInvoice: (id: string) => void
  updateWebsiteContent: (content: Partial<AppState["websiteContent"]>) => void
}

// بيانات افتراضية
const defaultUsers: User[] = [
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

const defaultTrips: Trip[] = [
  {
    id: "1",
    tripNumber: "TR-1001",
    route: "الرياض - جدة",
    departureDate: "2025-03-22",
    departureTime: "08:00",
    arrivalTime: "13:30",
    busId: "BUS-001",
    driverId: "DRV-001",
    status: "scheduled",
    availableSeats: 35,
    totalSeats: 45,
    price: 150,
  },
  {
    id: "2",
    tripNumber: "TR-1002",
    route: "الرياض - الدمام",
    departureDate: "2025-03-22",
    departureTime: "10:30",
    arrivalTime: "15:00",
    busId: "BUS-002",
    driverId: "DRV-002",
    status: "scheduled",
    availableSeats: 40,
    totalSeats: 45,
    price: 120,
  },
  {
    id: "3",
    tripNumber: "TR-1003",
    route: "جدة - المدينة",
    departureDate: "2025-03-22",
    departureTime: "13:15",
    arrivalTime: "16:30",
    busId: "BUS-003",
    driverId: "DRV-003",
    status: "scheduled",
    availableSeats: 42,
    totalSeats: 45,
    price: 100,
  },
]

const defaultBookings: Booking[] = [
  {
    id: "1",
    bookingNumber: "BK-5001",
    tripId: "1",
    passengerFullName: "أحمد محمد علي",
    passportNumber: "A12345678",
    nationality: "سعودي",
    phoneNumber: "0501234567",
    email: "ahmed@example.com",
    seatNumber: "12",
    bookingStatus: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "بطاقة ائتمان",
    totalAmount: 150,
    createdBy: "2",
    createdAt: "2025-03-20T10:30:00",
  },
  {
    id: "2",
    bookingNumber: "BK-5002",
    tripId: "1",
    passengerFullName: "سارة خالد عبدالله",
    passportNumber: "B87654321",
    nationality: "سعودية",
    phoneNumber: "0512345678",
    email: "sara@example.com",
    seatNumber: "13",
    bookingStatus: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "نقداً",
    totalAmount: 150,
    createdBy: "3",
    createdAt: "2025-03-20T11:45:00",
  },
  {
    id: "3",
    bookingNumber: "BK-5003",
    tripId: "2",
    passengerFullName: "محمد عبدالرحمن",
    passportNumber: "C56789012",
    nationality: "سعودي",
    phoneNumber: "0523456789",
    email: "mohammed@example.com",
    seatNumber: "5",
    bookingStatus: "pending",
    paymentStatus: "pending",
    paymentMethod: "تحويل بنكي",
    totalAmount: 120,
    createdBy: "2",
    createdAt: "2025-03-20T14:20:00",
  },
]

const defaultInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-1001",
    customerName: "أحمد محمد علي",
    invoiceDate: "2025-03-20",
    dueDate: "2025-03-27",
    invoiceType: "booking",
    items: [
      {
        description: "حجز تذكرة رحلة الرياض - جدة",
        quantity: 1,
        unitPrice: 150,
        total: 150,
      },
    ],
    subtotal: 150,
    tax: 0,
    discount: 0,
    total: 150,
    paymentStatus: "paid",
    notes: "",
  },
  {
    id: "2",
    invoiceNumber: "INV-1002",
    customerName: "سارة خالد عبدالله",
    invoiceDate: "2025-03-20",
    dueDate: "2025-03-27",
    invoiceType: "booking",
    items: [
      {
        description: "حجز تذكرة رحلة الرياض - جدة",
        quantity: 1,
        unitPrice: 150,
        total: 150,
      },
    ],
    subtotal: 150,
    tax: 0,
    discount: 0,
    total: 150,
    paymentStatus: "paid",
    notes: "",
  },
]

const defaultWebsiteContent = {
  homepageBanner: {
    title: "سافر براحة وأمان مع طويق للنقل البري",
    subtitle: "أفضل خدمات النقل البري بين مدن المملكة العربية السعودية واليمن",
    buttonText: "احجز رحلتك الآن",
    imageUrl: "/placeholder.svg?height=400&width=800",
  },
  specialOffers: [
    {
      id: "offer-1",
      title: "عرض العائلة",
      description: "خصم 10% للعائلات المكونة من 4 أفراد أو أكثر",
      discount: "10%",
      imageUrl: "/placeholder.svg?height=200&width=300",
      isActive: true,
      order: 1,
    },
    {
      id: "offer-2",
      title: "عرض الطلاب",
      description: "خصم 15% لجميع الطلاب عند إبراز البطاقة الجامعية",
      discount: "15%",
      imageUrl: "/placeholder.svg?height=200&width=300",
      isActive: true,
      order: 2,
    },
  ],
  testimonials: [
    {
      id: "testimonial-1",
      name: "أحمد محمد",
      location: "الرياض",
      rating: 5,
      comment: "خدمة ممتازة وراحة أثناء السفر، أنصح بها الجميع",
      isActive: true,
    },
    {
      id: "testimonial-2",
      name: "سارة علي",
      location: "جدة",
      rating: 4,
      comment: "رحلة مريحة وسائق محترف، سأكرر التجربة",
      isActive: true,
    },
  ],
  destinations: [
    {
      id: "destination-1",
      name: "الرياض",
      imageUrl: "/placeholder.svg?height=200&width=300",
      isActive: true,
    },
    {
      id: "destination-2",
      name: "جدة",
      imageUrl: "/placeholder.svg?height=200&width=300",
      isActive: true,
    },
    {
      id: "destination-3",
      name: "الدمام",
      imageUrl: "/placeholder.svg?height=200&width=300",
      isActive: true,
    },
  ],
  services: [
    {
      id: "service-1",
      title: "حافلات مريحة",
      description: "حافلات حديثة ومكيفة لراحة المسافرين",
      icon: "Bus",
      isActive: true,
    },
    {
      id: "service-2",
      title: "سائقين محترفين",
      description: "سائقين ذوي خبرة عالية لضمان سلامة الرحلة",
      icon: "User",
      isActive: true,
    },
  ],
}

// إنشاء مخزن حالة التطبيق
export const useAppStore = create<AppState>((set) => ({
  currentUser: null,
  users: defaultUsers,
  trips: defaultTrips,
  bookings: defaultBookings,
  invoices: defaultInvoices,
  websiteContent: defaultWebsiteContent,

  // الأفعال
  setCurrentUser: (user) => set({ currentUser: user }),
  
  addUser: (user) => set((state) => ({
    users: [...state.users, user],
  })),
  
  updateUser: (id, userData) => set((state) => ({
    users: state.users.map((user) =>
      user.id === id ? { ...user, ...userData } : user
    ),
  })),
  
  deleteUser: (id) => set((state) => ({
    users: state.users.filter((user) => user.id !== id),
  })),
  
  addTrip: (trip) => set((state) => ({
    trips: [...state.trips, trip],
  })),
  
  updateTrip: (id, tripData) => set((state) => ({
    trips: state.trips.map((trip) =>
      trip.id === id ? { ...trip, ...tripData } : trip
    ),
  })),
  
  deleteTrip: (id) => set((state) => ({
    trips: state.trips.filter((trip) => trip.id !== id),
  })),
  
  addBooking: (booking) => set((state) => ({
    bookings: [...state.bookings, booking],
  })),
  
  updateBooking: (id, bookingData) => set((state) => ({
    bookings: state.bookings.map((booking) =>
      booking.id === id ? { ...booking, ...bookingData } : booking
    ),
  })),
  
  deleteBooking: (id) => set((state) => ({
    bookings: state.bookings.filter((booking) => booking.id !== id),
  })),
  
  addInvoice: (invoice) => set((state) => ({
    invoices: [...state.invoices, invoice],
  })),
  
  updateInvoice: (id, invoiceData) => set((state) => ({
    invoices: state.invoices.map((invoice) =>
      invoice.id === id ? { ...invoice, ...invoiceData } : invoice
    ),
  })),
  
  deleteInvoice: (id) => set((state) => ({
    invoices: state.invoices.filter((invoice) => invoice.id !== id),
  })),
  
  updateWebsiteContent: (content) => set((state) => ({
    websiteContent: {
      ...state.websiteContent,
      ...content,
    },
  })),
}))
