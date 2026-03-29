import mongoose from "mongoose";


const BookSchema = mongoose.Schema({
    title:{
        type: String,
        required:[true, "Book title is required"]
    },
    isbn:{
        type: String,
        unique: true
    },
    authors:[
        { type: mongoose.Schema.Types.ObjectId, ref: "authorModel"}
    ],
    borrowStatus:{
        type: String,
        enum: ["IN", "OUT"],
        default: "IN"
    },
    borrowedBy:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "studentModel"
    },
    
    issuedBy:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "libraryAttendantModel"
        // default: null
    },
    returnDate:{
        type: Date
        // default: null
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const Book = mongoose.model("Book", BookSchema);

export default Book;