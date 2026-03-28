import Book from "../models/bookModel.js"

const borrowBook = (req, res) => {

//   return req.send("This is a confirmation")
  res.send(req.body.message)
};

// module.exports = {
//     borrowBook
// }

export default borrowBook;