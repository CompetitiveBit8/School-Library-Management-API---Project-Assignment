import mongoose from "mongoose";

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
        unique: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const Student = mongoose.model("Student", StudentSchema)

export default Student;