import { recoverUserInformation, signInRequest } from "@/lib/services/auth"
import { setCookie, parseCookies } from "nookies"
import { createContext, useContext, useEffect, useState } from "react"

import { api } from "@/lib/services/api"
import Router from "next/router"
import { AxiosError } from "axios"

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  signIn({ email, password }: SignInData): Promise<void>
  signOut(): void
}

const AuthContext = createContext({} as AuthContextType)

interface AuthProviderProps {
  children: React.ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies()

    if (token) {
      recoverUserInformation(token).then((user) => {
        setUser(user)
      })
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    try {
      const { token, user } = await signInRequest({
        email,
        password,
      })

      if (token) {
        setCookie(undefined, "nextauth.token", token, {
          maxAge: 60 * 60 * 1,
          sameSite: "lax",
        }) // 1 hour
        api.defaults.headers["Authorization"] = `Bearer ${token}`
        Router.push("/dashboard")
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  function signOut() {
    setUser(null)
    setCookie(undefined, "nextauth.token", "", {
      maxAge: -1,
    })
    Router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthContext, AuthProvider, useAuth }
