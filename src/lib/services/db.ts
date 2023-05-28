import mysql, { RowDataPacket } from "mysql2/promise"

export async function query(query: string, values: any[] = []) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectTimeout: 10000,
  })

  try {
    const [rows, fields] = (await connection.query(
      query,
      values
    )) as RowDataPacket[]

    connection.end()
    return [rows, fields]
  } catch (error) {
    // @ts-ignore
    throw new Error(error.message)
  }
}
