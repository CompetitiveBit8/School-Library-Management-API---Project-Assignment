import Book from "../models/bookModel.js"

exports.borrowBook = async (req, res) => {
  try {
    const { bookTitle, borrowStatus, borrowedBy, issuedBy, returnDate } = req.body
    
    const setReturn = await Book.findOne({title: bookTitle})

    if (!setReturn){
      return res.status(500).json({"message": "The library does not have a book with that name"})
    };
    const saveChanges = setReturn({
      borrowStatus, borrowBook,
      borrowedBy: borrowedBy,
      issuedBy: issuedBy,
      returnDate: returnDate
    })

  } catch (error) {
    return res.status(500).json({error: error.message})
  }
};

// module.exports = {
//     borrowBook
// }

export default borrowBook;