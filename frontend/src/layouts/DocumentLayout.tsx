
import { useUploadFile } from "@/api/document/file/use-upload-file"
import { useCreateFolder } from "@/api/document/folder/use-create-folder"
import { FileUploadDialog } from "@/components/modal/add-new-file"
import { AddNewDialog } from "@/components/modal/add-new-model"
import { Button } from "@/components/ui/button"
import { useDocumentStore } from "@/context/use-document"
import { CirclePlus, FilePlus } from "lucide-react"
import { Outlet } from "react-router-dom"

const folders = [
    {
        id: 1,
        name: "All Files"
    }, {
        id: 2,
        name: "Signature Files"
    }, {
        id: 3,
        name: "Documents"
    }, {
        id: 4,
        name: "Documents"
    },
]

export const DocumentLayout = () => {

    const { currentFolderId } = useDocumentStore()
    const createFolderMutation = useCreateFolder(currentFolderId!)
    const uploadFileMutation = useUploadFile(currentFolderId!)

    const handleCreateFolder = (values: any) => {
        console.log(values);
        createFolderMutation.mutate(values)
    }

    const handleFileUpload = (values: { file: File | null }) => {
        console.log(values.file);

        if (values.file) {
            uploadFileMutation.mutate({ file: values.file });
        } else {
            console.error("No file selected");
        }
    };
    return (
        <div className="w-full flex flex-col gap-y-4">
            <div className="mt-6">
                <div className="flex items-center gap-4">
                    <div className="flex gap-2.5">
                        <img src="/icons/monitor-mobbile.svg" alt=""
                            className="size-7"
                        />
                        <span className="text-[#333333] font-semibold text-lg">Files</span>
                    </div>
                    <FileUploadDialog
                        label="Upload Your File"
                        formItemLabel="Select File"
                        onSubmit={handleFileUpload}
                    >
                        <Button
                            variant="addAction"
                            className="h-8 gap-2.5"
                        >
                            <CirclePlus size={18} /> Add a File
                        </Button>
                    </FileUploadDialog>

                    <AddNewDialog
                        fieldName="name"
                        placeholder="Folder name"
                        label="Add New Folder"
                        formItemLabel="Name"
                        onSubmit={handleCreateFolder}
                    >
                        <Button
                            className="font-normal flex items-center justify-center gap-x-2 bg-[#1FBE8E] h-8 hover:bg-[#1FBE8E] text-[#313131]  shadow-sm"
                        >
                            <FilePlus
                                size={18}
                            />
                        </Button>
                    </AddNewDialog>
                </div>
            </div>
            <div className="flex gap-8 w-full">
                <div className="bg-[#F7F8FA] rounded-md w-[280px] min-h-[400px]">
                    <div className="p-6 flex flex-col gap-y-4">
                        {
                            folders.map(folder => (
                                <div className="flex items-center gap-4">
                                    <img src="/icons/folder-2.svg" alt="" />
                                    <h4 className="text-[#313131] font-normal text-base">{folder.name}</h4>
                                </div>
                            ))
                        }
                    </div>
                    <div>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    )
}
