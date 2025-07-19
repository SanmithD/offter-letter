import mongoose from "mongoose";

export const dbConnect = async() =>{
    try {
        const response = await mongoose.connect(process.env.MONGO);
        console.log('DB Connected', response.connection.host);
    } catch (error) {
        console.log(error);
        process.exit();
    }
}