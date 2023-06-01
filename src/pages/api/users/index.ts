import type { NextApiRequest, NextApiResponse } from "next"

import { query } from "@/lib/services/db"
import c from "@/lib/utils/crypt"

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
    const querySql = "SELECT password FROM user WHERE email = ? OR username = ?"
    const [rows] = await query(querySql, [email, email])

    if (rows?.length) {
      const { password: dbPassword } = rows[0]
      const decryptedDbPassword = c.decryptString(dbPassword)
      const decryptedPassword = c.decryptString(password)

      if (decryptedDbPassword === decryptedPassword) {
        const querySql =
          "SELECT id, name, username, email, avatar FROM user WHERE email = ? OR username = ?"
        const [rows] = await query(querySql, [email, email])
        const user = rows[0]
        const token = c.encryptObject(user.id)

        return res.status(200).json({ token, user })
      }

      res.status(401).json({ message: "Incorrect password" })
    }

    res.status(404).json({ message: "User not found" })
  }

  return res.status(405).json({ message: "Method not allowed" })
}
