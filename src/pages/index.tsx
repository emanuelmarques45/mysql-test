import { useAuth } from "@/contexts/AuthContext"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head"

import { set, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import c from "@/lib/utils/crypt"
import { parseCookies } from "nookies"
import { useState } from "react"

const validationSchema = z.object({
  email_username: z
    .string()
    .min(1, { message: "Field email/username is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
})

type ValidationSchema = z.infer<typeof validationSchema>

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const auth = useAuth()
  const [serverError, setServerError] = useState<string>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({ resolver: zodResolver(validationSchema) })

  async function handleSubmitForm({
    email_username,
    password,
  }: ValidationSchema) {
    const encryptedPassword = c.encryptString(password)
    try {
      await auth.signIn({ email: email_username, password: encryptedPassword })
    } catch (error: any) {
      setServerError(error.message as string)
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form action="#" onSubmit={handleSubmit(handleSubmitForm)}>
        <fieldset
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            height: "70svh",
          }}
        >
          <legend>Log in</legend>
          <input
            type="text"
            placeholder="Insira seu email ou nome de usuário"
            {...register("email_username")}
            autoFocus
          />
          <input
            type="password"
            placeholder="Insira sua senha"
            {...register("password")}
          />
        </fieldset>
        <button>Log in</button>
      </form>
      {serverError}
      {errors.password && (
        <p style={{ color: "black" }}> {errors.password.message} </p>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} }
}
