export const WEBHOOK_URL = process.env.NODE_ENV === 'production' 
  ? 'https://base-crate.vercel.app/api/webhook'
  : 'http://localhost:3001/api/webhook'; 