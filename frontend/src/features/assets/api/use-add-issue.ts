import { apiClient } from "@/api-client";
import { IssueFormSchemaType } from "@/features/assets/components/add-issue-model";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils";

export const useAddIssue = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: IssueFormSchemaType) => {
            await apiClient.post("/assets/issues", data)
        },
        onError: (error) => {
            const message = getErrorMessage(error)
            toast({
                variant: "destructive",
                title: message
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