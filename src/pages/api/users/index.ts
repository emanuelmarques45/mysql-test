import type { NextApiRequest, NextApiResponse } from "next"

import { query } from "../../../lib/services/db"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const querySql = "SELECT id, name, username, email, avatar FROM user"
    const [rows] = await query(querySql)

    const thereIsUser = rows.length

    if (thereIsUser) return res.status(200).json(rows)

    return res.status(204).json({ message: "No users found" })
  }
  if (req.method === "POST") {
    const { email, password } = req.body
    const querySql =
      "SELECT id, name, username, email, avatar FROM user WHERE email = ? AND password = ?"
    const [rows] = await query(querySql, [email, password])

    const thereIsUser = rows.length

    if (thereIsUser)
      return res.status(200).json({ token: "123", user: rows[0] })

    return res.status(404).json({ message: "User not found" })
  }
  return res.status(405).json({ message: "Method not allowed" })
}
