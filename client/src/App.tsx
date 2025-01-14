import { useEffect, useState } from "react"
import { NoteModel } from "./models/Note"
import { Note } from "./components/Note"
import { Col, Container, Row } from "react-bootstrap"
import Classes from "./styles/NotesPage.module.css"

export default function App() {
 const [notes, setNotes] = useState<NoteModel[]>([])

 useEffect(() => {
  async function loadNotes () {
    try{
      const response = await fetch("http://localhost:5999/api/notes", {method: "GET"})
      const notes = await response.json()
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
      <Row xl={3} md={2} lg={1} className="mt-1 g-3">
        {notes.map(note => (
          <Col>
            <Note key={note._id} 
              note={note} 
              pageStyle={Classes.note}/>
          </Col>
        ))}
      </Row>
    </Container>
  )
}