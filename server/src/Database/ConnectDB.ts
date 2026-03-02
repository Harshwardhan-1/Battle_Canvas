import mongoose from 'mongoose';
import { MONGO_URL } from '../configs/env.config';
export const connectDB=async():Promise<void>=>{
try{
    await mongoose.connect(MONGO_URL as string);
    console.log('mongoDB ConnectedD');
}catch(err){
    console.error('mongoDB Connection Failed',err);
    process.exit(1);
}
};