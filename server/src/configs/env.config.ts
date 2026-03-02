import dotenv from 'dotenv'
dotenv.config({
    path:`.env.${process.env.NODE_ENV || "devlopment"}.local`
})
export const {
MONGO_URL,
FRONTEND_URL,
JWT_SECRET,
GROQ_API_KEY,
PORT,
}=process.env;