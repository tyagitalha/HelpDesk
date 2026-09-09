import { ApiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { Comment } from "../models/comment.model.js"
import { Ticket } from "../models/ticket.model.js";

const createComment = asyncHandler(async (req, res) => {
    const { message } = req.body;
    const userId = req.user?._id;
    const userRole = req.user?.role;
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
        throw new ApiError(404, "Ticket not found");
    }

    // Normal user → sirf apne ticket par comment
    // Admin → kisi bhi ticket par comment
    if (
        userRole !== "Admin" &&
        ticket.createdBy.toString() !== userId.toString()
    ) {
        throw new ApiError(403, "You cannot comment on this ticket");
    }

    const comment = await Comment.create({
        message,
        author: userId,
        ticket: ticketId
    });

    const createdComment = await Comment.findById(comment._id);

    if (!createdComment) {
        throw new ApiError(500, "Something went wrong");
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            { comment: createdComment },
            "Comment created successfully"
        )
    );
});

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