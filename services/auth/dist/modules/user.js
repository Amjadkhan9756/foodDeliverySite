import mongoose, { Schema } from "mongoose";
const schema = new Schema({
    name: {
        type: "String",
        require: "true"
    },
    email: {
        type: "String",
        require: "true"
    },
    image: {
        type: "String",
        require: "true"
    },
    role: {
        type: "String",
        require: "true"
    }
}, {
    timestamps: true
});
const User = mongoose.model("User", schema);
export default User;
