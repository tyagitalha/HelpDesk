import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { User } from "../models/user.model.js"
const genreateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();


        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });
        // await user.save()

        return { accessToken, refreshToken };

    } catch (error) {
        console.log("TOKEN GENERATION ERROR:", error);

        throw new ApiError(
            500,
            "Something went wrong while generating access and refresh"
        );
    }
};

const registerUser = asyncHandler(async (req, res) => {

    const { fullName, email, username, password, role } = req.body

    if (
        [email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All field are invalid")
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (existedUser) {
        throw new ApiError(400, "username and email are already existed")
    }



    const options = {
        httpOnly: true,
        secure: true
    }

    const user = await User.create(
        {
            email,
            password,
            fullName,
            username: username.toLowerCase(),
            role,
        }
    )

    console.log("user", user);

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registring the user")
    }

    const { accessToken, refreshToken } = await genreateAccessAndRefreshToken(createdUser._id)



    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(
            200,
            { user: createdUser, accessToken, refreshToken },
            "User register SuccessFully"
        ))

})


const loginUser = asyncHandler(async (req, res) => {

    const { email, username, role, password } = req.body



    if (!(email || username)) {
        throw new ApiError(400, "email and username is invalid")
    }

    const user = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }


    const isPasswordvalid = await user.isPasswordCorrect(password)

    if (!isPasswordvalid) {
        throw new ApiError(400, "password is required")
    }

    const { accessToken, refreshToken } = await genreateAccessAndRefreshToken(user._id)



    const loggedInUser = await User.findById(user._id).select("-password -refreshToken").populate("fullName")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User login Successfully"
        ))
})

const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                refreshToken: undefined
            }
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .json(new ApiResponse(200, {}, "User loged Out"
        ))

})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200)
        .json(new ApiResponse(200, req.user, "current user fetched successfully"))
})


export { registerUser, loginUser, logout, getCurrentUser }