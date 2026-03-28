import express from "express"

const router = express.Router()

router.post('/', (req, res) => {
    res.send("Create student")
});

router.get('/', (req, res) => {
    res.send("Get student")
});

router
    .route('/:id')
        .get((res, req) =>{
            res.send(req.params.id)
        })

export default router;