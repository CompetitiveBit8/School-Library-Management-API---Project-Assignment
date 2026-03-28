import mongoose from "mongoose";

const LibraryAttendantSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "author name is required"]
    },

    stafftId:{
        type: String,
        unique: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const LibraryAttendant = mongoose.model("LibraryAttendant", LibraryAttendantSchema);

export default LibraryAttendant;