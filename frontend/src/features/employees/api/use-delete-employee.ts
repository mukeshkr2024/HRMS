import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../api-client";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/utils";

export const useUpdateDeleteEmployee = (employeeId: string) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async () => {
            await apiClient.delete(`/employees/${employeeId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] });
            toast({
                title: "Employee deleted successfully",
            });
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast({
                variant: "destructive",
                title: message,
            });
        },
    });
};
