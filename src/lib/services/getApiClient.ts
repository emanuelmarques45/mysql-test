import axios from "axios"
import { GetServerSidePropsContext, PreviewData } from "next"
import { parseCookies } from "nookies"
import { ParsedUrlQuery } from "querystring"

export function getApiClient(
  ctx?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
  const { "nextauth.token": token } = parseCookies()

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  })

  // api.interceptors.request.use((config) => {
  //   console.log(config)
  //   return config
  // })

  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`

  return api
}
