import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ActionSchema = new Schema({
    name: String
})

const Action = mongoose.model("Action", ActionSchema);

export default Action;

