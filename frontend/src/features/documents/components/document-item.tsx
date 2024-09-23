import { useDocumentStore } from "@/context/use-document";
import { format } from "date-fns";
import { FileViewer } from "./file-viewer";

interface DocumentItemProps {
    id: string;
    name?: string;
    createdAt: string;
    isSelected: boolean;
    onCheckboxChange: () => void;
    icon: JSX.Element;
    itemType: 'folder' | 'file';
    url?: string;
    fileType?: string;
}

export const DocumentItem: React.FC<DocumentItemProps> = ({
    id,
    name,
    createdAt,
    isSelected,
    onCheckboxChange,
    icon,
    itemType,
    url,
    fileType
}) => {
    const { setCurrentFolderId } = useDocumentStore();
    return (
        <>
            {itemType === "folder" ? (
                <div className="flex border-b gap-4 items-center py-1.5 border-[#DDDBDB]">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={onCheckboxChange}
                        className="mr-2 cursor-pointer"
                    />
                    {icon}
                    <div
                        onClick={() => {
                            if (itemType === "folder") {
                                setCurrentFolderId(id);
                            }
                        }}
                        className="cursor-pointer"
                    >
                        <h3 className="text-black font-medium text-base">{name}</h3>
                        <p className="text-[#1FBE8E] text-xs font-normal">
                            Added {format(new Date(createdAt), "MM/dd/yyyy")} by John Doe
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex border-b gap-4 items-center py-1.5 border-[#DDDBDB]">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={onCheckboxChange}
                        className="mr-2 cursor-pointer"
                    />
                    {icon}
                    <FileViewer url={url!} fileType={fileType!} name={name!}>
                        <div className="cursor-pointer">
                            <h3 className="text-black font-medium text-base">{name}</h3>
                            <p className="text-[#1FBE8E] text-xs font-normal">
                                Added {format(new Date(createdAt), "MM/dd/yyyy")} by John Doe
                            </p>
                        </div>
                    </FileViewer>
                </div>
            )}
        </>
    );
};
