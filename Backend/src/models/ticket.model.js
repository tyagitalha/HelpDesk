import mongoose, { Schema } from "mongoose";


const ticketSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
            trim: true,
            enum: ["hardware", "software", "network", "account", "other"]
        },
        priority: {
            type: String,
            required: true,
            trim: true,
            enum: ["high", "medium", "low"]
        },
        status: {
            type: String,
            enum: ["open", "in-progress", "resolved", "closed"],
            default: "open"
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        assignTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

export const Ticket = mongoose.model("Ticket", ticketSchema)