type NoteProps = {
    id: string
    title?: string
    text?: string
    createdAt?: string
}

export function Note({id, title, text, createdAt}: NoteProps){
    return <div className="flex flex-col">
        {id} {title} {text} {createdAt}
    </div>
}