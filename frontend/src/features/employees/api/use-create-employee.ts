import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../api-client";
import { getErrorMessage } from "@/utils";
import { EmployeeFormSchemaType } from "../new";

export const useCreateEmployee = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (values: EmployeeFormSchemaType) => {
            await apiClient.post("/employees/create", values);
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast({
                variant: "destructive",
                title: message,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["goals"] });
            toast({
                title: "Employee created successfully",
            });
        },
    });
};
