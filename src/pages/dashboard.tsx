import { useAuth } from "@/contexts/AuthContext"
import { getApiClient } from "@/lib/services/getApiClient"
import { GetServerSideProps } from "next"
import Image from "next/image"
import c from "@/lib/utils/crypt"
import { parseCookies } from "nookies"
import * as S from "@/styles/pages/dashboard"

export default function Dashboard({ user }: { user: User }) {
  const auth = useAuth()
  return (
    <>
      <S.Container>
        <Image
          src={user.avatar}
          width={70}
          height={70}
          alt="Avatar photo"
        ></Image>
        <h1>{user.username}</h1>
        <h2>{user.email}</h2>
        <button onClick={auth.signOut}>Sign Out</button>
      </S.Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getApiClient(ctx)
  const { "nextauth.token": token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const userId = c.decryptObject(token)
  const { data } = await apiClient.get(`/users/${userId}`)

  return { props: { user: data } }
}
