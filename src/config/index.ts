import dotenv from 'dotenv';
import Path from 'path';
dotenv.config({ path: Path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  default_student_password: process.env.DEFAULT_STUDENT_PASSWORD,
  default_faculty_password: process.env.DEFAULT_FACULTY_PASSWORD,
  default_admin_password: process.env.DEFAULT_ADMIN_PASSWORD,
};
