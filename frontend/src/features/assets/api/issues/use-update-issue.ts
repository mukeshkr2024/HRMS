import { apiClient } from "@/api-client";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IssueFormSchemaType } from "../../components/add-issue-model";

export const useUpdateIssue = (id: string) => {

    const { toast } = useToast()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: IssueFormSchemaType) => {
            await apiClient.put(`/assets/issues/${id}`, data)
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
                title: "Issue updated successfully"
            })
        }
    })
}