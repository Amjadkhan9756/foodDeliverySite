import mongoose, { Schema } from "mongoose";
const schema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        require: true
    },
    ownerId: {
        type: String,
    },
    phone: {
        type: String,
        require: true
    },
    isVerified: {
        type: Boolean,
        require: true
    },
    autoLocation: {
        type: {
            type: String,
            enum: "Point",
            require: true
        },
        coordinates: {
            type: [Number],
            require: true
        },
        formattedAddress: {
            type: String
        },
    },
    isOpen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
schema.index({ "autoLocation.coordinates": "2dsphere" });
export default mongoose.model("Restaurant", schema);
