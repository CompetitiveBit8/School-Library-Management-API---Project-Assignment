import mongoose from "mongoose";

const AuthorSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "author name is required"]
    },

    bio:{
        type: String,
    },

    createdAt:{
        type: Date,
        default: Date.now
    }
});

const Author = mongoose.model("Author", AuthorSchema)

export default Author;