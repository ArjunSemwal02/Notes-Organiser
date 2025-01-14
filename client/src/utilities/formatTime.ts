export function formatTime(date: string): string{
    return new Date(date).toLocaleString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    })
}