import express from "express"
import Book from "../models/bookModel.js"
import Student from "../models/studentModel.js";
import Author from "../models/authorModel.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { title, isbn, authors, borrowStatus, borrowedBy, issuedBy , returnDate } = req.body
        
        const addNewBook = new Book({ 
            title: title,
            isbn: isbn,
            authors: authors,
            borrowStatus: borrowStatus,
            borrowedBy: borrowedBy,
            issuedBy: issuedBy,
            returnDate: returnDate
            });

        const saveBooks = await addNewBook.save()
        return res.status(201).json(saveBooks)

    } catch (error) {
        res.status(500).json({error: error.message})
    }    
});

router.get('/',  async(req, res) => {
    try {

        const bookSearch = await Book.find()
        if (!bookSearch || bookSearch.length === 0 ){
            return res.send(`There are no book currently available`)
        };
        res.send(`${bookSearch}`)
    } catch (error) {
        res.status(500).json({error: error.message})
    };
});

router
    .route('/:id')
        .get(async (req, res) =>{
            try {
                const id = req.params.id
                const getBook = await Book.findById(id)
                return res.send(`${getBook}`)
            } catch (error) {
                res.status(500).json({error: error.message})
            }
        })
        .put((req, res) =>{
            try {
                
            } catch (error) {
                return res.status(500).json({error: error.message})
            }
        })
        .delete((req, res) =>{
            const id = res.params.id

            const deletebook = Book.findByIdAndDelete({id})
            return res.status(201).json({"message": "Record deleted"})
});

router.post('/:id/borrow', (req, res) => {
  try {
    //   return req.send("This is a confirmation")
    const { studentId, attendantId, returnId, bookTitle } = req.body
    const bookAvailable = Book.findOne({title: bookTitle})

    if (!bookAvailable){
        return res.send("There is no such book in the library")
    };

    if (Book.borrowStatus === "OUT"){
        //find the ID of student that borrowed the book
        const studentId = bookStatus.borrowedBy
        const bookBorower = Student.findOne({name: studentId})

        return res.send(`The book has been lent out to ${bookBorower}`)  
        };


    return res.send("The book is IN")
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
});


export default router;