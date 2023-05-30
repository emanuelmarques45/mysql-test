import c from "@/lib/utils/crypt"
import { api } from "./api"

type SignInResponse = {
  token: string
  user: User
}

export async function signInRequest({ email, password }: SignInData) {
  try {
    const {
      data: { token, user },
    } = await api.post<SignInResponse>("/users", {
      email,
      password,
    })

    return {
      token,
      user,
    }
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function recoverUserInformation(token: string) {
  const id = c.decryptObject(token)
  const { data: user } = await api.get<User>(`/users/${id}`)

  return user
}
