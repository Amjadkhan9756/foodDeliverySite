import TryCatch from "../middlewares/trycatch.js";
import Restaurant from "../models/restaurant.js";
import AuthanticatedRequest from "../middlewares/auth.js";
import getBuffer from "../config/datauri.js";
import axios from "axios";



export const addRestaurant = TryCatch(async (req: AuthanticatedRequest, res) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({
            messaage: "Unauthorized"
        })
    }

    const existingRestaunrant = await Restaurant.findOne({
        owner: user._id,
    })

    if (existingRestaunrant) {
        return res.status(400).json({
            message: "You already have this restaurant"
        })

    }


    const { name, description, latitude, longitude, formattedAddress, phone } = req.body;


    if (!name || !latitude || !longitude) {
        return res.status(400).json({
            message: "All fields are required "
        })
    }


    const { file } = req.body;

    if (!file) {
        return res.status(400).json({
            message: "Image is required"
        })
    }

    const fileBuffer = getBuffer(file);

    if (!fileBuffer?.content) {

        return res.status(400).json({
            message: "failed to create file buffer"
        })
    }

    const { data: uploadResult } = await
        axios.post(`${process.env.UTILS_SERVICE}/api/upload`,
            {

                Buffer: fileBuffer.content,

            });



    const restaurant = await Restaurant.create({
        name,
        description,
        phone,
        image: uploadResult._url,
        ownerId: user._id,
        autoLocation: {
            type: "Point",
            contents: [Number(longitude), Number(latitude)],
            formattedAddress,
        },
    });

    return res.status(201).json({
        message: "Restaurant created successfully",
        restaurant,
    });





















});
