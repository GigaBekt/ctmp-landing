import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'customer' | 'vendor' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  organizationId?: string
  organizationName?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (user: User) => {
        set({ user, isAuthenticated: true })
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      updateUser: (updates: Partial<User>) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } })
        }
      },
    }),
    {
      name: 'ctmp-auth',
    }
  )
)
