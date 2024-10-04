export const statusColor = (status: string) => {
    let color;

    switch (status) {
        case "pending":
            color = "#FFA500"; // Orange
            break;
        case "processing":
            color = "#00BFFF"; // Deep Sky Blue
            break;
        case "approved":
            color = "#28A745"; // Green
            break;
        case "rejected":
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

export const getErrorMessage = (error: any, defaultMessage: string = "Some went wrong, please try again later") => {
    return error?.response?.data?.message || defaultMessage;
};

export const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} year${interval === 1 ? '' : 's'} ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} month${interval === 1 ? '' : 's'} ago`;
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`;
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`;
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval} minute${interval === 1 ? '' : 's'} ago`;
    return 'just now';
};


export const formatDateToLocalString = (utcDateString: string, timeZone: string = 'Asia/Kolkata'): string => {
    const date = new Date(utcDateString);

    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: timeZone,
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return `${formattedDate}`;
};