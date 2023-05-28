import { signInRequest } from "@/lib/services/auth"
import { setCookie, parseCookies } from "nookies"
import { createContext, useContext, useEffect, useState } from "react"

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  signIn({ email, password }: SignInData): Promise<void>
}

const AuthContext = createContext({} as AuthContextType)

interface AuthProviderProps {
  children: React.ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user

  useEffect(() => {
    const { "next-auth-token": token } = parseCookies()
  }, [])

  async function signIn({ email, password }: SignInData) {
    const { token, user } = await signInRequest({ email, password })

    setCookie(undefined, "next-auth-token", token, { maxAge: 60 * 60 * 1 }) // 1 hour

    return { user }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthContext, AuthProvider, useAuth }
