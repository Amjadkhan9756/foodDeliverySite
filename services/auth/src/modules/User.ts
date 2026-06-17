import mongoose,{Document,Schema} from "mongoose";


export interface IUser extends Document {
    name:"String",
    email:"String",
    image:"String",
    role:"String",

}

const schema:Schema<IUser> = new Schema(
    {
        name:{
            type:"String",
            require:"true"
        },
        email:{
            type:"String",
            require:"true"
        },
        image:{
            type:"String",
            require:"true"
        },
        role:{
            type:"String",
            require:"true"
        }
    },{
        timestamps:true
    }
);

const User = mongoose.model<IUser>("User", schema);

export default User;