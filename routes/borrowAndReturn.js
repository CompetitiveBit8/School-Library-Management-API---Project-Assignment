import { borrowBook, returnBook } from "../controllers/BorrowAndReturn";
import express from "express";

const router = express.Router();

router.post("/borrow", borrowBook);

router.post("/return/:id", returnBook);

export default router;