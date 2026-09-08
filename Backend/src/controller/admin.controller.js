import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Ticket } from "../models/ticket.model.js"
import { User } from "../models/user.model.js"


const allTicket = asyncHandler(async (req, res) => {
    const ticket = await Ticket.find()
        .populate("createdBy", "fullName")
        .populate("assignTo", "fullName email")
        .sort({ createdAt: -1 });
    
        
    if (!ticket) {
        throw new ApiError(404, "not access all ticket")
    }

    return res.status(200)
        .json(
            new ApiResponse(200, { Tickets: ticket }, "Get All Ticket")
        )
})


const oneticket = asyncHandler(async (req, res) => {
    const { ticketId } = req.params
    
    const ticket = await Ticket.find(
        {
            _id: ticketId
        }
    )
 

    return res.status(200)
        .json(
            new ApiResponse(200, { Tickets: ticket }, "Get One Ticket")
        )
})

const getTicket = asyncHandler(async (req, res) => {
    try {

        const { search, category, status, priority, page = 1, limit = 10 } = req.query

        const filter = {}

        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ]
        }

        if (category) filter.category = category.toLowerCase()
        if (status) filter.status = status.toLowerCase()
        if (priority) filter.priority = priority.toLowerCase()

        const pageNumber = Number(page)
        const limitNumber = Number(limit)

        const skip = (pageNumber - 1) * limitNumber
        const user = await User.find()

        filter.createdBy = user
        const ticket = await Ticket.find(filter)
            .populate("createdBy", "fullName email")
            .skip(skip)
            .limit(limitNumber)
            .sort({ createdAt: -1 })

        

        return res.status(200).json(new ApiResponse(200, { tickets: ticket }, "Tickets fetched successfully"))
    } catch (error) {
        throw error instanceof ApiError ? error : new ApiError(500, "Failed to fetch tickets")

    }
})

const update = asyncHandler(async (req, res) => {

    const { status, priority, assignTo } = req.body


    const { ticketId } = req.params

    const ticket = await Ticket.findOneAndUpdate(
        {
            _id: ticketId
        },
        {
            $set: {
                status,
                priority,
                assignTo
            }
        },
        {
            new: true,
            runValidators: true
        }
    )

    if (!ticket) {
        throw new ApiError(400, "ticket is invalid")
    }

    return res.status(200)
        .json(
            new ApiResponse(
                200, { Tickets: ticket }, "status chamge success fully"
            )
        )
})


const assignTicket = asyncHandler(async (req, res) => {

    const { ticketId } = req.params
   

    const user = await User.find(
        user?.role === "Admin"
    )

    const ticket = await Ticket.findOneAndUpdate(
        {
            _id: ticketId
        }, {
        $set: {
            assignTo: user._id
        }
    },
        {
            new: true

        }
    )

 

    if (!ticket) {
        throw new ApiError(400, "ticket are invalid ")
    }

    return res.status(200)
        .json(
            new ApiResponse(200, { Tickets: ticket }, "Assigne Ticket  success full")
        )
})


const allAdmin = asyncHandler(async (req, res) => {
    const user = await User.find(
        { role: "Admin" }
    )
   
    return res.status(200)
        .json(new ApiResponse(200, { Admin: user }, "All Admin fetch SuccessFully"))
})



export { allTicket, oneticket, update, assignTicket, getTicket, allAdmin }