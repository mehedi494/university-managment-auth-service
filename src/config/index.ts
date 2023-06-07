import dotenv from 'dotenv'
import Path from 'path'
dotenv.config({ path: Path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  default_user_password: process.env.DEFAULT_USER_PASSWORD,
}
