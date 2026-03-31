import mongoose from "mongoose";

const LibraryAttendantSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "author name is required"]
    },

    createdAt:{
        type: Date,
        default: Date.now
    }
});

const LibraryAttendant = mongoose.model("LibraryAttendant", LibraryAttendantSchema);

export default LibraryAttendant;