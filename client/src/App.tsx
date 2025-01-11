import { useEffect, useState } from "react"
import { NoteModel } from "./models/note"
// import { Note } from "./components/Note"

export default function App() {
 const [notes, setNotes] = useState([])

 useEffect(() => {
  async function loadNotes () {
    try{
      const response = await fetch("/api/notes/", {method: "GET",  headers:{
        accept: 'application/json',
        'User-agent': 'learning app',
      }})
      const notes = await response.json()
      setNotes(notes)
    }
    catch(error){
      console.error(error)
      console.log(notes)
      // alert(error)
    }
  }
  loadNotes()
 }, [])

  return <div>
    {JSON.stringify(notes)}
    {/* <Note id={JSON.stringify(notes)}/> */}
  </div>
}