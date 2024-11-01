import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  client_url: process.env.CLIENT_URL,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRE_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRE_IN,
  reset_pass_link: process.env.RESET_PASS_LINK,
  emailSender: {
    email: process.env.EMAIL,
    app_pass: process.env.APP_PASS
},
ssl: {
  store_id: process.env.STORE_ID,
  store_pass: process.env.STORE_PASS,
  success_url: process.env.SUCCESS_URL,
  cancel_url: process.env.CANCEL_URL,
  fail_url: process.env.FAIL_URL,
  ssl_payment_api: process.env.SSL_PAYMENT_API,
  ssl_validation_api: process.env.SSL_VALIDATION_API
}
};
