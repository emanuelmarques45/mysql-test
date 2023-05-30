import type { NextApiRequest, NextApiResponse } from "next"

import { query } from "../../../lib/services/db"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const querySql = "SELECT * FROM user where id = ?"
      const [rows] = await query(querySql, [req.query.id])

      const thereIsUser = rows.length

      if (thereIsUser) return res.status(200).json(rows[0])

      return res.status(200).json({ message: "No users found" })

    default:
      return res.status(405).json({ message: "Method not allowed" })
  }
}
