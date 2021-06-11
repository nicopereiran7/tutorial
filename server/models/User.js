import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    lastname: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

const User = mongoose.model("User", UserSchema);

export default User;