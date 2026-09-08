import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
    {
        message: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        ticket: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ticket",
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Comment = mongoose.model("Comment", commentSchema)