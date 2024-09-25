import { useDocumentStore } from "@/context/use-document";
import { useGetDocuments } from "@/features/documents/api/use-get-documents";
import { DocumentList } from "@/features/documents/components/document-list";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const EmployeeDocumentList = () => {
    const { employeeId } = useParams()

    const { currentFolderId, setPreviousFolder } = useDocumentStore();
    const { data, isLoading } = useGetDocuments(currentFolderId || "", employeeId);

    useEffect(() => {
        if (data?.documents?.parentFolder) {
            setPreviousFolder(data.documents.parentFolder);
        }
    }, [data, setPreviousFolder]);

    if (isLoading) {
        return (
            <div className="h-full pt-20 w-full flex items-center justify-center">
                <Loader className="animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="w-full">
            <DocumentList data={data?.documents} />
        </div>
    );
}
