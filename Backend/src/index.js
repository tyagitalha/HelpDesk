
import dotenv from "./utils/env.js"
import connectDB from "./db/index.js"
import app from "./app.js"



connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server is running on PORT : ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log('mongoDB connection failed', error)
    }
    )
