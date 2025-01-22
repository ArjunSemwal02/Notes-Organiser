import { Card } from "react-bootstrap"
import { NoteModel } from "../models/Note"
import Classes from "../styles/Note.module.css"
import { formatTime } from "../utilities/formatTime"
import { MdDelete } from "react-icons/md"

interface NoteProps {
    note: NoteModel
    onNoteClicked: (note: NoteModel) => void
    pageStyle?: string
    onDeleteNote: (note: NoteModel) => void
}

export function Note({ note, pageStyle, onNoteClicked, onDeleteNote }: NoteProps){
    const {_id, title, text, createdAt, updatedAt} = note

    return (
        <Card 
            key={_id} 
            className={`${Classes.noteCard} ${pageStyle}`} 
            style={{
                background: "#CD5C5C", 
                height: "15rem",
                minWidth: "150px"}}
            onClick={() => onNoteClicked(note)}>
            <Card.Body className={Classes.cardBody} 
                        style={{maskImage: "linearGradient(180deg black 80%, transparent)"}}>
                <Card.Title className="d-flex align-items-center" style={{color: "#660000"}}>
                    {title}
                    <MdDelete className="ms-auto"
                    onClick={
                        (e) => {
                          onDeleteNote(note) 
                          e.stopPropagation()
                        }}/>
                </Card.Title>
                <Card.Text className={Classes.noteText} >
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted" style={{fontSize: ".9rem", alignSelf: "end"}}>
                    {(updatedAt > createdAt) ? `Updated at: ${formatTime(updatedAt)}` : `Created at: ${formatTime(createdAt)}`}
            </Card.Footer>
        </Card>
    )
}