import app from './app';
import { connectDB } from './Database/ConnectDB';
import { PORT } from './configs/env.config';

app.listen(PORT,async()=>{
   console.log(`Server is listening to http://localhost:${PORT}`);
   await connectDB();
});