import express from "express"
import { v4 as uuidv4 } from 'uuid'
import LibraryAttendant from "../models/libraryAttendantModel.js";

const router = express.Router()

router.post('/', async (req, res) => {
 try {
        const newAttendant = req.body.newAttendant
        // const {newAttendant, staffId} = req.body
        // const staffId = uuidv4();
        
        //confirm if the name inputted exists already
        const attendantExists = await LibraryAttendant.findOne({name: newAttendant})
        

        if (attendantExists){ 
          return res.status(401).json({"message": `Library, ${newAttendant} already exists`})
        }
        
        //if not
        const newAttendantSave = new LibraryAttendant({
            name: newAttendant
        });

        const savedAttendant = await newAttendantSave.save()

        return res.status(201).json(savedAttendant);

    } catch (error) {
        res.status(500).json({error : error.message})
    }
});

router.get('/', async (req, res) => {
    try {
        const allAttendants = await LibraryAttendant.find()
        
        if (!allAttendants || allAttendants.length === 0){
            res.send("There are currently no library attendants in the recoord")
        }
        res.send(`${allAttendants}`)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

export default router;