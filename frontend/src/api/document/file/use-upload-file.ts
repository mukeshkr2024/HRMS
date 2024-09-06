import { apiClient } from "@/api/api-client";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UploadFileData {
    file: File;
}

export const useUploadFile = (folderId?: string) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UploadFileData) => {
            console.log(data);

            const formData = new FormData();
            formData.append('file', data.file);
            const queryParam = folderId ? `?folderId=${folderId}` : '';

            await apiClient.post(`/documents/file/upload${queryParam}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        },
        onError: (error: any) => {
            console.error("Upload error:", error);
            toast({
                variant: "destructive",
                title: typeof error.message === "string" ? error.message : "An error occurred",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
            toast({
                title: "File uploaded successfully",
            });
        },
    });
};
