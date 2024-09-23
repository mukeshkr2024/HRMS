import { apiClient } from "@/api-client";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UploadFileData {
    file: File;
}

export const useUploadFile = (folderId?: string, employee?: string) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UploadFileData) => {
            console.log(data);

            const queryParams = new URLSearchParams();
            if (folderId) {
                queryParams.append('folderId', folderId);
            }
            if (employee) {
                queryParams.append('employee', employee);
            }
            const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';

            const formData = new FormData();
            formData.append('file', data.file);

            await apiClient.post(`/documents/file/upload${queryString}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        },
        onError: (error: any) => {
            const message = getErrorMessage(error)

            toast({
                variant: "destructive",
                title: message
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
