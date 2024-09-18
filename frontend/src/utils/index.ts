export const statusColor = (status: string) => {
    let color;

    switch (status) {
        case "pending":
            color = "#FFA500"; // Orange
            break;
        case "processing":
            color = "#00BFFF"; // Deep Sky Blue
            break;
        case "success":
            color = "#28A745"; // Green
            break;
        case "failed":
            color = "#DC3545"; // Red
            break;
        default:
            color = "#000000"; // Default color (black)
    }

    return color;
}

export function formatDate(dateString: Date): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
}
