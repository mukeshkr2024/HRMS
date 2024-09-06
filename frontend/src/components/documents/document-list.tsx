import { useState } from "react";
import { File as FileIcon } from "lucide-react";
import { DocumentItem } from "./document-item";

interface Folder {
    _id: string;
    name: string;
    createdAt: string;
}

interface File {
    name: string;
    createdAt: string;
}

interface DocumentListProps {
    data: {
        folders: Folder[];
        files: File[];
    };
}

export const DocumentList: React.FC<DocumentListProps> = ({ data }) => {
    const [selectedFolders, setSelectedFolders] = useState<number[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<number[]>([]);


    const handleFolderCheckboxChange = (index: number) => {
        setSelectedFolders(prevSelected =>
            prevSelected.includes(index)
                ? prevSelected.filter(item => item !== index)
                : [...prevSelected, index]
        );
    };

    const handleFileCheckboxChange = (index: number) => {
        setSelectedFiles(prevSelected =>
            prevSelected.includes(index)
                ? prevSelected.filter(item => item !== index)
                : [...prevSelected, index]
        );
    };

    return (
        <div className="w-full font-urbanist">
            <div className="flex w-full">
                {data?.folders?.length > 0 || data?.files?.length > 0 ? (
                    <div className="flex flex-col gap-y-3 w-full">
                        {data?.folders?.length > 0 && (
                            <div className="flex flex-col gap-y-3 w-full">
                                {data.folders.map((folder, index) => (
                                    <DocumentItem
                                        key={`folder-${index}`}
                                        id={folder?._id}
                                        name={folder.name}
                                        createdAt={folder.createdAt}
                                        isSelected={selectedFolders.includes(index)}
                                        onCheckboxChange={() => handleFolderCheckboxChange(index)}
                                        icon={<img src="/icons/folder-2.svg" alt="Folder icon" />}
                                        itemType="folder"
                                    />
                                ))}
                            </div>
                        )}

                        {data?.files?.length > 0 && (
                            <div className="flex flex-col gap-y-3 w-full">
                                {data.files.map((file, index) => (
                                    <DocumentItem
                                        key={`file-${index}`}
                                        name={file.name}
                                        createdAt={file.createdAt}
                                        isSelected={selectedFiles.includes(index)}
                                        onCheckboxChange={() => handleFileCheckboxChange(index)}
                                        icon={<FileIcon />}
                                        itemType="file"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div>No Documents</div>
                )}
            </div>
        </div>
    );
};
