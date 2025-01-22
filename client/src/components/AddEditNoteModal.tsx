import { Button, Form, Modal } from "react-bootstrap";
import { NoteModel } from "../models/Note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notesApi";
import * as NotesApi from "../network/notesApi"

interface AddEditNoteModalProps {
    noteToEdit?: NoteModel
    onDismiss: () => void
    onNoteSave: (note: NoteModel) => void
}

export default function AddEditNoteModal({noteToEdit, onDismiss, onNoteSave}: AddEditNoteModalProps) {

    const { register, handleSubmit, formState : { errors, isSubmitting } } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || "",
        }
    })

    async function onFormSubmit(input: NoteInput) {
        try{
            let noteResponse: NoteModel;
            if(noteToEdit){
                noteResponse = await NotesApi.updateNote(noteToEdit._id, input)
            }else{
                noteResponse = await NotesApi.createNotes(input)
            }
            onNoteSave(noteResponse)
        }
        catch(error){
            console.log(error)
            alert(error)
        }
    }


    return <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>
                {noteToEdit ? "Edit Note" : "Add Note"}
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form id="addEditNoteForm" onSubmit={handleSubmit(onFormSubmit)}>
                <Form.Group className="mb-2">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Title"
                        isInvalid={!!errors.title}
                        {...register("title", { required: "Required"})}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Text</Form.Label>
                    <Form.Control 
                    as="textarea" 
                    rows={5} 
                    type="text" 
                    placeholder="Text"
                    {...register("text")}/>
                </Form.Group>
            </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>Save</Button>
        </Modal.Footer>
    </Modal>
}