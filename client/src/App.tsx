import { useEffect, useState } from "react"
import { NoteModel } from "./models/Note"
import { Note } from "./components/Note"
import { Button, Col, Container, Row } from "react-bootstrap"
import Classes from "./styles/NotesPage.module.css"
import * as NotesAPI from "./network/notesApi"
import AddNoteModal from "./components/AddNoteModal"

export default function App() {

 const [notes, setNotes] = useState<NoteModel[]>([])

 const [showAddNoteModal, setShowAddNoteModal] = useState(false)

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
      <Button className="mt-2"
        onClick={() => setShowAddNoteModal(true)}>
        Add new note
      </Button>
      <Row xl={3} md={2} lg={1} className="mt-1 g-3">
        {notes.map(note => (
          <Col>
            <Note key={note._id} 
              note={note} 
              pageStyle={Classes.note}
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
    </Container>
  )
}