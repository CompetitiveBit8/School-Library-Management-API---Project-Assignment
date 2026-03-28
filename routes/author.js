import Author from "../models/authorModel.js"
import express from "express"

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { newAuthor, bio } = req.body
        //confirm if the name inputted exists already
        const authorExists = await Author.findOne({name: newAuthor})
        
        if (authorExists){ 
          return res.status(401).json(`Author, ${newAuthor} already exists`)
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
                return res.send(`${getAuthor}`)
            } catch (error) {
                res.status(500).json({error: error.message})
            }
        })
        .put(async (req, res) =>{
            const authorId = req.params.id
            const { name, bio, createdAt } = req.body
            const updateAuthor = await Author.findByIdAndUpdate(authorId, { name: name, bio: bio })
            
            return res.send(`${updateAuthor}`)
        })
        .delete(async (req, res) =>{
            const deletAuthor =  await Author.findByIdAndDelete(`${req.params.id}`)
            return res.send(`User deleted`)
});




export default router;