import { useGetDocuments } from "@/api/document/use-get-documents";
import { DocumentList } from "@/components/documents/document-list";
import { useDocumentStore } from "@/context/use-document";
import { CircleArrowLeft } from "lucide-react";
import { useEffect } from "react";

export const FilesPage = () => {
    const { currentFolderId, setCurrentFolderId, setPreviousFolder, previousFolder } = useDocumentStore();

    const { data } = useGetDocuments(currentFolderId || "");

    useEffect(() => {
        if (data?.documents?.parentFolder) {
            setPreviousFolder(data.documents.parentFolder);
        }
    }, [data, setPreviousFolder]);

    const handleBackClick = () => {
        // @ts-ignore
        if (previousFolder?.parentId) {
            // @ts-ignore
            setCurrentFolderId(previousFolder.parentId._id);
        } else {
            setCurrentFolderId(null);
        }
    };

    return (
        <div className="w-full">
            {previousFolder && (
                <div>
                    <CircleArrowLeft
                        onClick={handleBackClick}
                        className="cursor-pointer"
                    />
                    {/*  @ts-ignore */}
                    <h3>{previousFolder.name}</h3>
                </div>
            )}
            <DocumentList data={data?.documents} />
        </div>
    );
};
