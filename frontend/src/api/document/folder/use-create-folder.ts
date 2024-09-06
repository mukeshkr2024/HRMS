import { apiClient } from "@/api/api-client";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateFolder = (folderId?: string) => {
    const { toast } = useToast()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: any) => {
            const queryParam = folderId ? `?folderId=${folderId}` : '';
            await apiClient.post(`/documents/folder/create${queryParam}`, data)
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
                title: "Task created successfully"
            })
        }
    })
}