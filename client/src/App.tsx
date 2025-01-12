import { useEffect, useState } from "react"
import { NoteModel } from "./models/note"
import axios from "axios"

export default function App() {
 const [notes, setNotes] = useState<NoteModel[]>([])

 useEffect(() => {
  async function loadNotes () {
    try{
      const response = await fetch("http://localhost:5999/api/notes", {method: "GET"})
      const notes = await response.json()
      // console.log(notes)
      setNotes(notes)
    }
    catch(error){
      console.error(error)
      alert(error)
    }
  }
  loadNotes()
 }, [])


// useEffect(() => {
//   const url = 'http://localhost:5999/api/notes'
//   axios.get(url).then((response) => {
//     console.log(response.data)
//     // setNotes(response.data)
//   })
// }, [])


  return <div>
    {JSON.stringify(notes)}
    {/* {notes.map(note => note._id)} */}
  </div>
}