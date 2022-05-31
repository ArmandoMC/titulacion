const path = require('path');
require('dotenv').config({ path: '.env' });

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  jwtRecoverySecret:process.env.JWT_RECOVERY_SECRET,
  smtpEmail: process.env.SMTP_EMAIL,
  smtpPassword: process.env.SMTP_PASSWORD,
  cloudName:process.env.CLOUDINARY_CLOUD_NAME,
  cloudApiKey:process.env.CLOUDINARY_API_KEY,
  cloudApiSecret:process.env.CLOUDINARY_API_SECRET

}

module.exports = { config };
