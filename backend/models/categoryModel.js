import mongoose from "mongoose";

const {Schema} = mongoose;
const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 32
    }
})

export default mongoose.model('Category', categorySchema);