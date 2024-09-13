import React, { useState } from "react";
import { Document, Page } from 'react-pdf';
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

interface Props {
    children: React.ReactNode;
    url: string;
    fileType: string;
}

export const FileViewer = ({ children, url, fileType }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const renderContent = () => {
        if (!url) return <p>No file to display</p>;

        if (fileType.startsWith("image/")) {
            return <img src={url} alt="preview" style={{ width: '100%', maxHeight: '400px' }} />;
        }

        if (fileType.startsWith("video/")) {
            return (
                <video width="100%" height="400px" controls>
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
            return <iframe src={url} style={{ width: "100%", height: "400px" }} title="text-preview" />;
        }

        return <p>Unsupported file type</p>;
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = url;
        link.download = url.split('/').pop() || "file";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="h-[80%] w-[90%] max-w-4xl flex flex-col items-center justify-center">
                <div className="w-full flex flex-col items-center">
                    <div className="mb-4">
                        {renderContent()}
                    </div>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={handleDownload}
                    >
                        Download
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
