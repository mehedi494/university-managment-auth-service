import dotenv from 'dotenv'
import Path from 'path'
dotenv.config({ path: Path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
}
