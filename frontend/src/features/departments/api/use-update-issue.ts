import { apiClient } from "@/api-client";
import { useToast } from "@/components/ui/use-toast";
import { DepartMentFormSchemaType } from "@/features/profiles/components/add-new-model";
import { getErrorMessage } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useUpdateDepartment = (id: string) => {

    const { toast } = useToast()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: DepartMentFormSchemaType) => {
            await apiClient.put(`/departments/${id}`, data)
        },
        onError: (error) => {
            const message = getErrorMessage(error)
            toast({
                variant: "destructive",
                title: message
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["departments"] })
            toast({
                title: "Department updated successfully"
            })
        }
    })
}