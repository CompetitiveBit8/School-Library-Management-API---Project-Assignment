import mongoose from "mongoose";

const BookAuthorRel = mongoose.Schema({
    book:{
        type: String,
        unique: true
    },
    author:{
        type: String,
        unique: true
    }
});


const BookStudentRel = mongoose.Schema({
    book:{
        type: String,
        unique: true
    },
    author:{
        type: String,
    }
});


const BookAttendantRel = mongoose.Schema({
    book:{
        type: String,
        unique: true
    },
    attendant:{
        type: String,
    }
});

const BookAuthor = mongoose.Schema("BookAuthor", BookAuthorRel);
const BookStudent = mongoose.Schema("BookStudent", BookStudentRel);
const BookAttendant = mongoose.Schema("BookAttendant", BookAttendantRel)

module.exports = {
    BookAuthor,
    BookStudent,
    BookAttendant
};