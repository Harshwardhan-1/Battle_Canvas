import express  , {Request , Response} from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true})); 
app.use(cookieParser());

app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
}))
import addUserRoutes from "./Routes/userRoutes";
app.get("/"  , (req : Request, res : Response)=>{
  res.send("hii harsh here")
})

app.use('/api/user',addUserRoutes);
export default app;