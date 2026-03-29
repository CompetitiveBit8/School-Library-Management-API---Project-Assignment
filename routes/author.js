import Author from "../models/authorModel.js"
import express from "express"

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { newAuthor, bio } = req.body
        //confirm if the name inputted exists already
        const authorExists = await Author.findOne({name: newAuthor})
        
        if (authorExists){ 
          return res.status(401).json({"message": `Library attendant, ${newAuthor} already exists`})
        }
        //if not
        const newAuthorSave = new Author({
            name: newAuthor,
            bio: bio
        });

        const savedAuthor = await newAuthorSave.save()

        return res.status(201).json(savedAuthor);

    } catch (error) {
        res.status(500).json({error : error.message})
    }
});

router.get('/', async (req, res) => {
    try {
        const allAuthors = await Author.find()
        
        if (!allAuthors || allAuthors.length === 0){
            res.send("There are currently no authors in the recoord")
        }
        res.send(`${allAuthors}`)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

router
    .route('/:id')
        .get(async (req, res) =>{
            try {
                const id = req.params.id
                const getAuthor = await Author.findById(id)

                if (!getAuthor){
                    return res.status(500).json({"message":"No author with that Id"})
                }
                
                return res.send(`${getAuthor}`)
            } catch (error) {
                res.status(500).json({error: error.message})
            }
        })
        .put(async (req, res) =>{
            try {
                const authorId = req.params.id
                const { name, bio } = req.body

                const updateAuthor = await Author.findByIdAndUpdate(authorId, { name: name, bio: bio })
                
                if (!updateAuthor){
                    return res.status(500).json({"message":"No author with that Id"})
                }
                return res.send(`${updateAuthor}`)
            } catch (error) {
                return res.status(500).json({error: error.message})
            }
        })
        .delete(async (req, res) =>{
            try {
                const deletAuthor =  await Author.findByIdAndDelete(`${req.params.id}`)
                
                if (!deletAuthor){
                    return res.status(500).json({"message":"No author with that Id"})
                }
                return res.send(`User deleted`)
            } catch (error) {
                return res.status(500).json({error: error.message})
            }
});




export default router;