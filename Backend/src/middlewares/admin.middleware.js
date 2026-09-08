
import { ApiError } from "../utils/apiError.js"

export const isAdmin = async (req, res, next) => {
 
    try {

        if (req.user?.role !== "Admin") {
            throw new ApiError(404, "Access Denied , Admin Only")
        }

        next()
    } catch (error) {
        throw new ApiError(500, "Something Went Wrong")
    }
}