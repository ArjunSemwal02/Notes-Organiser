import { useEffect, useState } from "react"
import { NoteModel } from "./models/Note"
import { Note } from "./components/Note"

// import axios from "axios"

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


  return <div className="grid">
    {notes.map(note => (
      <Note key={note._id} note={note} />
    ))}
  </div>
}







// useEffect(() => {
//   const url = 'http://localhost:5999/api/notes'
//   axios.get(url).then((response) => {
//     console.log(response.data)
//     // setNotes(response.data)
//   })
// }, [])