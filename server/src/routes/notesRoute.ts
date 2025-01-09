import * as notesController from "../controllers/notesController"
import express from "express"

const router = express.Router()

router.get('/', notesController.getNotes)

router.get('/:noteId', notesController.getNote)

router.post('/', notesController.createNote)

router.patch('/:noteId', notesController.updateNote)

export default router