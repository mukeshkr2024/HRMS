import { useDocumentStore } from "@/context/use-document";
import { File as FileIcon, Folder } from "lucide-react";
import { DocumentItem } from "./document-item";

interface Folder {
    _id: string;
    name: string;
    createdAt: string;
}

interface File {
    name: string;
    createdAt: string;
    url: string;
    fileType: string;
    _id: string;
}

interface DocumentListProps {
    data: {
        folders: Folder[];
        files: File[];
    };
}

export const DocumentList: React.FC<DocumentListProps> = ({ data }) => {
    const { selectedFolders, selectedFiles, toggleFolderSelection, toggleFileSelection } = useDocumentStore();

    return (
        <div className="w-full font-urbanist overflow-y-auto custom-scrollbar">
            <div className="flex w-full">
                {data?.folders?.length > 0 || data?.files?.length > 0 ? (
                    <div className="flex flex-col gap-y-3 w-full">
                        {data?.folders?.length > 0 && (
                            <div className="flex flex-col gap-y-3 w-full">
                                {data.folders.map((folder) => (
                                    <DocumentItem
                                        key={folder._id}
                                        id={folder._id}
                                        name={folder.name}
                                        createdAt={folder.createdAt}
                                        isSelected={selectedFolders.includes(folder._id)}
                                        onCheckboxChange={() => toggleFolderSelection(folder._id)}
                                        icon={<Folder />}
                                        itemType="folder"
                                    />
                                ))}
                            </div>
                        )}

                        {data?.files?.length > 0 && (
                            <div className="flex flex-col gap-y-3 w-full">
                                {data.files.map((file) => (
                                    <DocumentItem
                                        key={file._id}
                                        name={file.name}
                                        createdAt={file.createdAt}
                                        isSelected={selectedFiles.includes(file._id)}
                                        onCheckboxChange={() => toggleFileSelection(file._id)}
                                        icon={<FileIcon />}
                                        itemType="file"
                                        url={file.url}
                                        fileType={file.fileType}
                                        id={file._id}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-20 w-full text-muted-foreground text-center">No Documents</div>
                )}
            </div>
        </div>
    );
};
