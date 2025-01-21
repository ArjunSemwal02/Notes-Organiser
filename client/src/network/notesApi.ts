import { NoteModel } from "../models/Note"

async function fetchAPI(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init)
    if(response.ok) return response
    else {
        const errorBody = await response.json()
        const errorMessage = errorBody.error
        throw Error(errorMessage)
    }
}

export async function fetchNotes(): Promise<NoteModel[]>{
    const response = await fetchAPI("http://localhost:5999/api/notes", {method: "GET"})
    return response.json()
}

export interface NoteInput {
    title: string
    text?: string
}

export async function createNotes(note: NoteInput): Promise<NoteModel> {
    const response = await fetchAPI("http://localhost:5999/api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    })
    return response.json()
}

export  async function deleteNotes(noteId: string) {
    await fetchAPI("http://localhost:5999/api/notes/" + noteId, { method: "DELETE"})
}