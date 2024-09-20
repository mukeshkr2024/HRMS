import { useGetDocuments } from "@/features/documents/api/use-get-documents";
import { DocumentList } from "@/features/documents/components/document-list";
import { useDocumentStore } from "@/context/use-document";
import { CircleArrowLeft, Loader } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const EmployeeDocumentList = () => {
    const { employeeId } = useParams()

    const { currentFolderId, setCurrentFolderId, setPreviousFolder, previousFolder } = useDocumentStore();
    const { data, isLoading } = useGetDocuments(currentFolderId || "", employeeId);

    useEffect(() => {
        if (data?.documents?.parentFolder) {
            setPreviousFolder(data.documents.parentFolder);
        }
    }, [data, setPreviousFolder]);

    const handleBackClick = () => {
        if (previousFolder && previousFolder.parentId) {
            setCurrentFolderId(previousFolder.parentId._id);
        } else {
            setCurrentFolderId(null);
        }
    };
    if (isLoading) {
        return (
            <div className="h-full pt-20 w-full flex items-center justify-center">
                <Loader className="animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="w-full">
            {previousFolder && (
                <div className="absolute top-6 right-0 flex items-center gap-2.5">
                    <CircleArrowLeft
                        onClick={handleBackClick}
                        className="cursor-pointer"
                    />
                    <h3>{previousFolder.name}</h3>
                </div>
            )}
            <DocumentList data={data?.documents} />
        </div>
    );
}
