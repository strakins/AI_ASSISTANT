import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('Mongoose is Connected to StrakinsAI')
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "ai_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;

        console.log('Mongodb Connected')
    } catch (error) {
        console.log(error)
    }
}