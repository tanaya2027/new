import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://tanaya123:tanaya123@cluster1.onmxr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1').then(()=> console.log("Database connected"));
    
}