import { apiClient } from "@/api-client";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateAssessmentParams {
    data: any;
    id: string;
}

export const useUpdateAssessment = (memberId?: string) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ data, id }: UpdateAssessmentParams) => {
            const endpoint = memberId
                ? `/assessments/${id}?memberId=${memberId}`
                : `/assessments/${id}`;
            return apiClient.put(endpoint, data);
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast({
                variant: "destructive",
                title: message,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["assessment"]
            });
            toast({
                title: "Assessment updated successfully",
            });
        },
    });
};
