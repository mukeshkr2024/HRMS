import { apiClient } from "@/api/api-client";
import { DepartMentFormSchemaType } from "@/components/departments/add-new-model";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateDepartment = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: DepartMentFormSchemaType) => {
            await apiClient.post("/departments/create", data)
        },
        onError: (error) => {
            console.log("error", error);
            toast({
                variant: "destructive",
                title: error.message || "Something went wrong"
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