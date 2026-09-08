import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connectionDB = await mongoose.connect(process.env.MONGODB_ULI)
        console.log(`MongoDB conneccted || DB HOST :${connectionDB.connection.host}`)
    } catch (error) {
        console.log('MongoDB connection Fail',error);
        process.exit(1)
    }
}

export default connectDB