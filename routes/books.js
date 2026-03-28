import express from "express"
import Book from "../models/bookModel.js"

const router = express.Router();

router.post('/', async (req, res) => {
    const { title, isbn, authors, borrowStatus,borrowedBy, issuedBy , returnDate, createdAt } = req.body

    const addNewBook = new Book({ 
        title: title,
        isbn: isbn,
        authors: authors,
        borrowStatus: borrowStatus,
        borrowStatus: borrowStatus, 
        issuedBy: issuedBy,
        returnDate: returnDate, 
        createdAt: createdAt
        });

    const saveBooks = addNewBook.save()

    return res.status(201).json(saveBooks)    
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
        .get((req, res) =>{
            res.send(req.params.id)
        })
        .post((req, res) =>{
            res.send(req.params.id)
        })
        .put((req, res) =>{
            res.send(req.params.id)
        })
        .delete((req, res) =>{
            res.send(req.params.id)
});

router.all('/:id/borrow', (req, res) => {
    res.send(`This is the borrow parameter with param as ${req.params.id} under borrow.`)
})


router.all('/:id/return', (req, res) => {  
    res.send(`This is the return parameter with param as ${req.params.id} under return.`)
})


export default router;