import { apiClient } from "@/api-client";
import { AddIssueFormSchemaType } from "@/features/assets/components/add-issue-model";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddIssue = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: AddIssueFormSchemaType) => {
            await apiClient.post("/assets/issues", data)
        },
        onError: (error) => {
            console.log("error", error);
            toast({
                variant: "destructive",
                title: error.message || "Something went wrong"
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["issues"] })
            toast({
                title: "Assets added  successfully"
            })
        }
    })
}