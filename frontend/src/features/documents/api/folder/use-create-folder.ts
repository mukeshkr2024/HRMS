import { apiClient } from "@/api-client";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateFolder = (folderId?: string, employee?: string) => {
    const { toast } = useToast()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: any) => {
            const queryParams = new URLSearchParams();
            if (folderId) {
                queryParams.append('folderId', folderId);
            }
            if (employee) {
                queryParams.append('employee', employee);
            }

            const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';

            await apiClient.post(`/documents/folder/create${queryString}`, data);
        },
        onError: (error) => {
            console.log("error", error);
            toast({
                variant: "destructive",
                title: error.message
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] })
            toast({
                title: "Folder created successfully"
            })
        }
    })
}