import { useUploadFile } from "@/features/documents/api/file/use-upload-file";
import { useCreateFolder } from "@/features/documents/api/folder/use-create-folder";
import { useDeleteDocument } from "@/features/documents/api/use-delete-document";
import { FileUploadDialog } from "@/components/modal/add-new-file";
import { AddNewDialog } from "@/components/modal/add-new-model";
import { Button } from "@/components/ui/button";
import { useDocumentStore } from "@/context/use-document";
import { CircleArrowLeft, CirclePlus, FilePlus, Folder, Trash } from "lucide-react";
import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { toast } from "../ui/use-toast";

const folders = [
    { id: 1, name: "All Files" },
];

export const DocumentLayout = () => {
    const { employeeId } = useParams()

    const { currentFolderId, selectedFolders, selectedFiles, setCurrentFolderId, previousFolder, setPreviousFolder, resetSelections } = useDocumentStore();
    const createFolderMutation = useCreateFolder(currentFolderId!, employeeId);
    const uploadFileMutation = useUploadFile(currentFolderId!, employeeId);
    const deleteDocumentMutation = useDeleteDocument();


    const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
    const [isUploadFileDialogOpen, setIsUploadFileDialogOpen] = useState(false);

    const handleCreateFolder = (values: any) => {
        createFolderMutation.mutate(values, {
            onSuccess: () => {
                setIsFolderDialogOpen(false);
            }
        });
    };

    console.log();


    const handleFileUpload = (values: { file: File | null }) => {
        const MAX_FILE_SIZE_MB = 10;
        const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
        const VIDEO_MIME_TYPES = ["video/mp4", "video/webm", "video/ogg"]; // Add any other video types you want to restrict

        if (values.file) {
            // Check file size
            if (values.file.size > MAX_FILE_SIZE_BYTES) {
                console.error("File size exceeds 10MB");
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Please select a file smaller than 10MB",
                });
                return; // Exit the function to prevent upload
            }

            // Check if the file is a video
            if (VIDEO_MIME_TYPES.includes(values.file.type)) {
                console.error("Video files are not allowed");
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Video files are not allowed. Please select another file.",
                });
                return; // Exit the function to prevent upload
            }

            uploadFileMutation.mutate({ file: values.file }, {
                onSuccess: () => {
                    setIsUploadFileDialogOpen(false);
                }
            });
        } else {
            console.error("No file selected");
            toast({
                variant: "destructive",
                title: "Error",
                description: "No file selected",
            });
        }
    };

    const handleDelete = () => {
        deleteDocumentMutation.mutate(
            {
                files: selectedFiles,
                folders: selectedFolders,
            }, {
            onSuccess: () => {
                resetSelections()
            }
        }
        )
    };

    const totalSelectedFiles = selectedFiles.length + selectedFolders.length

    const handleBackClick = () => {
        if (previousFolder && previousFolder.parentId) {
            // If there is a parent folder, navigate to the parent
            setCurrentFolderId(previousFolder.parentId._id);
        } else {
            // If there's no parent folder, we're back at the root directory
            setCurrentFolderId(null);
            setPreviousFolder(null); // Reset previous folder when at root
        }
    };


    console.log(previousFolder);


    return (
        <div className="w-full flex flex-col gap-y-4 relative">
            <div>
                <div className="flex items-center gap-4">
                    <div className="flex gap-2.5">
                        <img src="/icons/monitor-mobbile.svg" alt="" className="size-7" />
                        <span className="text-[#333333] font-semibold text-lg">Files</span>
                    </div>
                    <FileUploadDialog
                        label="Upload Your File"
                        formItemLabel="Select File"
                        onSubmit={handleFileUpload}
                        isOpen={isUploadFileDialogOpen}
                        setIsOpen={setIsUploadFileDialogOpen}
                        isPending={
                            uploadFileMutation.isPending
                        }
                    >
                        <Button variant="addAction" className="h-8 gap-2.5">
                            <CirclePlus size={18} /> Add a File
                        </Button>
                    </FileUploadDialog>

                    <AddNewDialog
                        fieldName="name"
                        placeholder="Folder name"
                        label="Add New Folder"
                        formItemLabel="Name"
                        onSubmit={handleCreateFolder}
                        isOpen={isFolderDialogOpen}
                        setIsOpen={setIsFolderDialogOpen}
                    >
                        <Button className="font-normal flex items-center justify-center gap-x-2 bg-[#1FBE8E] h-8 hover:bg-[#1FBE8E] text-[#313131] shadow-sm">
                            <FilePlus size={18} />
                        </Button>
                    </AddNewDialog>
                    {previousFolder && (
                        <div className="flex gap-2">
                            <CircleArrowLeft
                                onClick={handleBackClick}
                                className="cursor-pointer"
                            />
                            <h3>{previousFolder.name}</h3>
                        </div>
                    )}
                    {totalSelectedFiles > 0 && <>
                        <Button onClick={handleDelete}
                            disabled={deleteDocumentMutation.isPending}
                            className="bg-red-600 text-white h-8 flex items-center gap-2 ml-auto">
                            <Trash size={18} /> Delete
                        </Button>

                    </>
                    }
                </div>
            </div>
            <div className="flex gap-8 w-full">
                <div className="bg-[#F7F8FA] rounded-md w-[280px] h-[400px] hidden lg:block">
                    <div className="p-6 flex flex-col gap-y-4">
                        {folders.map(folder => (
                            <div key={folder.id} className="flex items-center gap-4">
                                <Folder />
                                <h4 className="text-[#313131] font-normal text-base">{folder.name}</h4>
                            </div>
                        ))}
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
};
