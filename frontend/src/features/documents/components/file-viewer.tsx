import React, { useState } from "react";
import { Document, Page } from 'react-pdf';
import { Dialog, DialogContent, DialogTrigger } from "../../../components/ui/dialog";

interface Props {
    children: React.ReactNode;
    url: string;
    fileType: string;
    name: string;
}

export const FileViewer = ({ children, url, fileType, name }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const renderContent = () => {
        if (!url) return <p>No file to display</p>;

        if (fileType.startsWith("image/")) {
            return (
                <img
                    src={url}
                    alt="preview"
                    className="w-full max-h-[50vh] object-contain"
                />
            );
        }

        if (fileType.startsWith("video/")) {
            return (
                <video className="w-full h-auto max-h-[50vh]" controls>
                    <source src={url} type={fileType} />
                    Your browser does not support the video tag.
                </video>
            );
        }

        if (fileType === "application/pdf") {
            return (
                <Document file={url}>
                    <Page pageNumber={1} />
                </Document>
            );
        }

        if (fileType.startsWith("text/")) {
            return (
                <iframe
                    src={url}
                    className="w-full h-[50vh] border-none"
                    title="text-preview"
                />
            );
        }

        return <p className="text-center text-muted-foreground">Unsupported file type</p>;
    };

    const handleDownloadOrOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        // Create a download link for the image
        const downloadLink = document.createElement('a');
        downloadLink.href = url;

        // Set the download attribute to suggest a filename
        downloadLink.download = name || url.split('/').pop() || "downloaded_image";

        // Append the link, click to trigger download, and then remove it
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };


    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="h-[80vh] w-full sm:w-[90%] max-w-4xl flex flex-col items-center justify-center">
                <div className="w-full flex flex-col items-center">
                    <div className="mb-4 w-full">
                        {renderContent()}
                    </div>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={handleDownloadOrOpen}
                    >
                        {fileType.startsWith("image/") ? "Open Image" : "Download"}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
