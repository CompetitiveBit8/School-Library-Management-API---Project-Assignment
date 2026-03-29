import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
// const { v4: uuidv4 } = require('uuid');

const LibraryAttendantSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "author name is required"]
    },

    stafftId:{
        type: String,
        unique: true,
        default: uuidv4
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const LibraryAttendant = mongoose.model("LibraryAttendant", LibraryAttendantSchema);

export default LibraryAttendant;