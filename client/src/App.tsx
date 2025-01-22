import { useEffect, useState } from "react"
import { NoteModel } from "./models/Note"
import { Note } from "./components/Note"
import { Button, Col, Container, Row } from "react-bootstrap"
import Classes from "./styles/NotesPage.module.css"
import * as NotesAPI from "./network/notesApi"
import AddNoteModal from "./components/AddEditNoteModal"
import { FaPlus } from "react-icons/fa"
import AddEditNoteModal from "./components/AddEditNoteModal"

export default function App() {

 const [notes, setNotes] = useState<NoteModel[]>([])

 const [showAddNoteModal, setShowAddNoteModal] = useState(false)

 const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null)

 useEffect(() => {
  async function loadNotes () {
    try{
     const notes = await NotesAPI.fetchNotes()
      setNotes(notes)
    }
    catch(error){
      console.error(error)
      alert(error)
    }
  }
  loadNotes()
 }, [])

async function deleteNote(note: NoteModel) {
  try {
    await NotesAPI.deleteNotes(note._id)
    setNotes(notes.filter(existingNote => existingNote._id !== note._id))
  } catch (error) {
    console.error(error)
    alert(error)
  }
}

  return (
    <Container>
      <Button className="mt-2 d-flex align-items-center gap-2"
        onClick={() => setShowAddNoteModal(true)}>
        <FaPlus />
        Add new note
      </Button>
      <Row xl={3} md={2} lg={1} className="mt-1 g-3">
        {notes.map(note => (
          <Col>
            <Note key={note._id} 
              note={note} 
              pageStyle={Classes.note}
              onNoteClicked={setNoteToEdit}
              onDeleteNote={deleteNote}/>
          </Col>
        ))}
      </Row>
      { showAddNoteModal && <AddNoteModal 
      onDismiss={() => setShowAddNoteModal(false)} 
      onNoteSave={(newNote) => {
        setNotes([...notes, newNote])
        setShowAddNoteModal(false)
      }}/> }
      { noteToEdit && 
      <AddEditNoteModal noteToEdit={noteToEdit} onDismiss={() => setNoteToEdit(null)} onNoteSave={(updatedNote) => {
        setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote))
        setNoteToEdit(null)
      }}/>
      }
    </Container>
  )
}