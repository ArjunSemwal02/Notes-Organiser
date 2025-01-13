import { Card } from "react-bootstrap"
import { NoteModel } from "../models/Note"
import styles from "../styles/Note.module.css"

interface NoteProps {
    note: NoteModel
}

export function Note({ note }: NoteProps){
    const {_id, title, text, createdAt, updatedAt} = note
    return (
        <Card key={_id} className={styles.noteCard} style={{color: "#660000", background: "#CD5C5C"}}>
            <Card.Title>
                {title}
            </Card.Title>
            <Card.Body className={styles.noteText}>
                {text}
            </Card.Body>
            <Card.Footer>
                {(updatedAt > createdAt) ? `Updated at: ${updatedAt}` : `Created at: ${createdAt}`}
            </Card.Footer>
        </Card>
    )
}