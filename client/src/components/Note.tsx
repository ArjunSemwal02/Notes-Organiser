import { Card } from "react-bootstrap"
import { NoteModel } from "../models/Note"
import Classes from "../styles/Note.module.css"
import { formatTime } from "../utilities/formatTime"

interface NoteProps {
    note: NoteModel
    pageStyle?: string
}

export function Note({ note, pageStyle }: NoteProps){
    const {_id, title, text, createdAt, updatedAt} = note

    return (
        <Card key={_id} className={`${Classes.noteCard} ${pageStyle}`} 
                        style={{
                            background: "#CD5C5C", 
                            height: "15rem",
                            minWidth: "150px"}}>
            <Card.Body className={Classes.cardBody} 
                        style={{maskImage: "linearGradient(180deg black 80%, transparent)"}}>
                <Card.Title style={{color: "#660000"}}>
                    {title}
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