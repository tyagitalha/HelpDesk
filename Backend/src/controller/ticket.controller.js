
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js";
import { Ticket } from "../models/ticket.model.js";

const createTicket = asyncHandler(async (req, res) => {
    const { title, description, category, priority, status, createdBy } = req.body


    if (
        [title, description, category, priority].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All field are required")
    }

    console.log("BODY:", req.body)
    console.log("USER:", req.user)

    const ticket = await Ticket.create(
        {
            title,
            description,
            category,
            priority,
            createdBy: req.user?._id
        }
    )

    const createdTicket = await Ticket.findById(ticket._id)

    if (!createdTicket) {
        throw new ApiError(500, "something went wrong while creating a ticket ")
    }

    return res.status(200)
        .json(
            new ApiResponse(201, { tickets: createdTicket }, "ticket created successFully")
        )
})

const getAllTicket = asyncHandler(async (req, res) => {

    const user = req.user?._id

    if (!user) {
        throw new ApiError(401, "User id not Access")
    }

    const ticketId = await Ticket.find()
        .populate("createdBy", "fullName email")
        .populate("assignTo", "fullName email")
        .sort({ createdAt: -1 });

    console.log("ticket", ticketId);



    return res.status(200)
        .json(
            new ApiResponse(200, ticketId, "Access ALL ticket")
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

        //pagination calculation 

        const pageNumber = Number(page)
        const limitNumber = Number(limit)

        const skip = (pageNumber - 1) * limitNumber


        const user = req.user?._id

        filter.createdBy = user

        const ticket = await Ticket.find(filter)
            .skip(skip)
            .limit(limitNumber)
            .sort({ createdAt: -1 })

        console.log("filter:", filter);
        console.log("ticket:", ticket);




        return res.status(200).json(new ApiResponse(200, { tickets: ticket }, "Tickets fetched successfully"))
    } catch (error) {

        throw error instanceof ApiError ? error : new ApiError(500, "Failed to fetch tickets")
    }
})

const getOneTicket = asyncHandler(async (req, res) => {

    try {
        const user = req.user?._id
        const { ticketId } = req.params

        const ticket = await Ticket.findOne(
            {
                _id: ticketId,
                createdBy: user
            }
        )


        if (!ticket) {
            throw new ApiError(400, "ticket not find")
        }

        return res.status(200)
            .json(new ApiResponse(200, { tickets: ticket }, "Get One Ticket"))
    } catch (error) {
        throw new ApiError(404, "Failed to fetch tickets")
    }
})


const updateTicket = asyncHandler(async (req, res) => {
    const { title, description, priority, category } = req.body;

    const userId = req.user?._id;
    const { ticketId } = req.params;

    
    const ticket = await Ticket.findOneAndUpdate(
        {
            _id: ticketId,
            createdBy: userId,
        },
        {
            $set: {
                title,
                description,
                priority,
                category,
            },
        },
        {
            returnDocument: "after",
            runValidators: true,
        }
    );

    if (!ticket) {
        throw new ApiError(404, "Ticket not found or you are not authorized to update this ticket");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                ticket,
                "Ticket updated successfully"
            )
        );
});
const deleteTicket = asyncHandler(async (req, res) => {

    const userId = req.user?._id;
    const { ticketId } = req.params;

    const ticket = await Ticket.findOneAndDelete({
        _id: ticketId,
        createdBy: userId
    });

    if (!ticket) {
        throw new ApiError(
            404,
            "Ticket not found or you are not authorized"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Ticket deleted successfully"
        )
    );
});

export { createTicket, getAllTicket, getTicket, updateTicket, deleteTicket, getOneTicket }