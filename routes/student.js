import express from "express"
import Student from "../models/studentModel.js"

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { studentName, studentEmail } = req.body

        // const studentId = 

        const studentExists = await Student.findOne({name: studentName})

        if (studentExists) {
            return res.status(401).json({"message": "Student name already exists"})
        };
        const newStudentsSave = new Student({
            name: studentName,
            email: studentEmail
        });

        const savedStudent = await newStudentsSave.save()
        return res.status(201).json(savedStudent)
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

router.get('/', async (req, res) => {
    try {
        const getStudents = await Student.find()

        if (getStudents.length === 0 ) {
            return res.status(500).json({"message": "There are no students records yet. Be the first"})
        }
    return res.status(200).json(getStudents)

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
});

router
    .route('/:id')
        .get(async (req, res) =>{
            try {
            const id = req.params.id;

            const getStudentById = await Student.findById(id);
            
            if(!getStudentById){
            return res.status(500).json({"message": "No student with that Id"});
            };
            return res.send(getStudentById);
            } catch (error) {
                return res.status(500).json({error: error.message})
            }
        });

export default router;