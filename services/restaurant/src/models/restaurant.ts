import mongoose, { Schema, Document, BooleanExpression } from "mongoose";

export interface IRestaurant extends Document {
    name: string,

    description?: string,
    image: string,
    ownerId: string,
    phone: number
    isVerified: Boolean;

    autoLocation: {
        type: "Point",
        coordinates: [number, number], //[longitude, latitude]
        formattedAddress:string,


    },
    isOpen:boolean;
    createdAt:Date;


}


const schema = new Schema<IRestaurant>({
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
    isOpen:{
        type:Boolean,
        default:false   
    }

},
{
    timestamps:true
});


schema.index({ "autoLocation.coordinates": "2dsphere" });

export default mongoose.model<IRestaurant>("Restaurant", schema);

