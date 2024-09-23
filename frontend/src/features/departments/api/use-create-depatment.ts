import { apiClient } from "@/api-client";
import { DepartMentFormSchemaType } from "@/features/profiles/components/add-new-model";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils";

export const useCreateDepartment = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: DepartMentFormSchemaType) => {
            await apiClient.post("/departments/create", data)
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
                title: "Department created successfully"
            })
        }
    })
}