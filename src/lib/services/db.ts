import mysql, { RowDataPacket } from "mysql2/promise"

export async function query(query: string, values: any[] = []) {
  const connection = await mysql.createConnection(process.env.DATABASE_URL)

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
