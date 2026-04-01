import express from "express"
import Book from "../models/bookModel.js"
import Student from "../models/studentModel.js";
import Author from "../models/authorModel.js";
import { borrowBook, returnBook } from "../controllers/BorrowAndReturn.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { title, isbn, authors, borrowStatus, borrowedBy, issuedBy , returnDate } = req.body
        
        const addNewBook = new Book({ 
            title,
            isbn,
            authors,
            borrowStatus,
            borrowedBy,
            issuedBy,
            returnDate
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
        res.json(bookSearch)
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
                return res.json(getBook)
            } catch (error) {
                res.status(500).json({error: error.message})
            }
        })
        .put(async (req, res) =>{
            try {
                const id = req.params.id
                const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true })
                return res.json(updatedBook)
            } catch (error) {
                return res.status(500).json({error: error.message})
            }
        })
        .delete(async (req, res) =>{
            try {
                const id = req.params.id
                await Book.findByIdAndDelete(id)
                return res.status(200).json({"message": "Record deleted"})
            } catch (error) {
                return res.status(500).json({error: error.message})
            }
        });

router.post('/:id/borrow', async (req, res) => {
  try {
    const { studentId, attendantId, returnDate, bookTitle } = req.body

    const bookAvailable = await Book.findOne({ title: bookTitle })

    if (!bookAvailable){
        return res.send("There is no such book in the library")
    };

    if (bookAvailable.borrowStatus === "OUT"){
        const bookBorrower = await Student.findById(bookAvailable.borrowedBy)
        return res.send(`The book has been lent out to ${bookBorrower}`)
    };

    return res.send("The book is IN")
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
});

export default router;