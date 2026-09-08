import { ApiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { Comment } from "../models/comment.model.js"

const createComment = asyncHandler(async (req, res) => {

    const { message } = req.body

    const userId = req.user?._id
    const { ticketId } = req.params

    const comment = await Comment.create(
        {
            message,
            author: userId,
            ticket: ticketId

        }
    )



    console.log("comment", comment);

    const createdComment = await Comment.findById(comment._id)

    if (!createdComment) {
        throw new ApiError(500, "Something went Wrong")
    }

    return res.status(200)
        .json(new ApiResponse(200, { Message: message }, "Comment create SuccessFull"))

})

const getAllComment = asyncHandler(async (req, res) => {

    const { ticketId } = req.params
    const comment = await Comment.find({
        ticket: ticketId,
    })
        .populate("author", "fullName role")
        .sort({ createdAt: 1 });

    return res.status(200)
        .json(new ApiResponse(200, { Comment: comment }, "Get All Comments"))
})


const commentDelete = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const role = req.user.role

    const { commentId } = req.params
    const comment = null
    if (role === "Admin") {
        let bcomment = await Comment.findByIdAndDelete(commentId)
    } else if (role === "user") {
        let comment = await Comment.findOneAndDelete(
            {
                _id: commentId,
                author: userId
            }
        )
    }

    return res.status(200)
        .json(new ApiResponse(200, { Comment: comment }, "Comment delete success"))
})
export { createComment, getAllComment, commentDelete }