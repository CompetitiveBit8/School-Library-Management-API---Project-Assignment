import mongoose from "mongoose";
import { uuid } from "uuidv4";

const StudentSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "author name is required"]
    },

    email:{
        type: String,
        unique: true
    },

    studentId:{
        type: String,
        unique: true,
        default: uuid
    },
    
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const Student = mongoose.model("Student", StudentSchema)

export default Student;