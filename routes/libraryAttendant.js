import express from "express"

const router = express.Router()

router.post('/', (req, res) => {
    res.send("Create attendant")
});

router.get('/', (req, res) => {
    res.send("Get attendant")
});

export default router;