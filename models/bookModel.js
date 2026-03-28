import mongoose from "mongoose";
import Author from "./authorModel.js";
import Student from "./studentModel.js"
import LibraryAttendant from "./libraryAttendantModel.js"


const BookSchema = mongoose.Schema({
    title:{
        type: String,
        required:[true, "Book title is required"]
    },
    isbn:{
        type: String,
        unique: true
    },
    authors:{
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author"}]
    },
    borrowStatus:{
        type: String,
        enum: ["IN", "OUT"],
        default: "IN"
    },
    borrowedBy:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Student",
        default: null
    },
    issuedBy:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "LibraryAttendant",
        default: null
    },
    returnDate:{
        type: Date,
        default: null
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const Book = mongoose.model("Book", BookSchema);

export default Book;