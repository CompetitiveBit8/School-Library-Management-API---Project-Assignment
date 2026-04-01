import express from "express"
import mongoose from "mongoose";
import author from "./routes/author.js"
import book from "./routes/books.js"
import student from "./routes/student.js"
// import borrowReturn from "./routes/borrowAndReturn"
import libraryAttendant from "./routes/libraryAttendant.js"
   
const app = express()
app.use(express.json())


app.get('/', (req, res) => {
    res.send("Welcome to the homepage");
});


//routes
app.use('/author', author);
app.use('/books', book);
app.use('/student', student);
app.use('/Attendant', libraryAttendant);
// app.use('/borrowandreturn', borrowReturn);


//connection to mongose database
mongoose.connect("mongodb://localhost:27017/").then(() => {
    //server connection
    console.log("Connected to the library database");
    app.listen(3000, () => {
        console.log("Server running live");
    });
}).catch(() => {
    console.log("connection failed");
});