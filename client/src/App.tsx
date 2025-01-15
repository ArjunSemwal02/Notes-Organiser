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


  return (
    <Container>
      <Button onClick={() => setShowAddNoteModal(true)}>
        Add new note
      </Button>
      <Row xl={3} md={2} lg={1} className="mt-1 g-3">
        {notes.map(note => (
          <Col>
            <Note key={note._id} 
              note={note} 
              pageStyle={Classes.note}/>
          </Col>
        ))}
      </Row>
      { showAddNoteModal && <AddNoteModal onDismiss={() => setShowAddNoteModal(false)}/> }
    </Container>
  )
}