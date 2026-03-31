import express from 'express';
import Book from "../models/bookModel.js";

const router = express.Router();

const borrowBook = async (req, res) => {
  try {
    const { bookId, borrowStatus, borrowedBy, issuedBy, returnDate } = req.body
    
    const book = await Book.findById(bookId)

    if (!book){
      return res.status(500).json({"message": "The library does not have a book with that name"})
    };

    book.borrowStatus = borrowStatus;
    book.borrowedBy = borrowedBy;
    book.issuedBy = issuedBy;
    book.returnDate = returnDate;

    await book.save();

    return res.status(200).json({
      message: "Book borrowed successfully",
      data: book
    })
    
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
};

// Return Book Endpoint
router.post('/books/:id/return', async (req, res) => {
    try {
        // 1. Get book ID from params
        const { id } = req.params;

        // 2. Find the book
        const book = await Book.findById(id);

        // 3. Check if book exists
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // 4. Ensure book is currently borrowed
        if (book.borrowStatus !== "OUT") {
            return res.status(400).json({ message: "Book is not currently borrowed" });
        }

        // 5. Reset book fields
        book.borrowStatus = "IN";
        book.borrowedBy = null;
        book.issuedBy = null;
        book.returnDate = null;

        // 6. Save changes
        await book.save();

        res.status(200).json({
            message: "Book returned successfully",
            data: book
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export { borrowBook };
export default router;