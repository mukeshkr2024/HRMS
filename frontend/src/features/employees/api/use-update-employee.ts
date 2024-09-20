import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../api-client";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/utils";
import { EditEmployeeFormSchemaType } from "@/features/employee/info";

export const useUpdateEmployeeInfo = (employeeId: string) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async (infoData: EditEmployeeFormSchemaType) => {
            const { data } = await apiClient.put(`/employees/${employeeId}`, infoData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employee"] });
            toast({
                title: "Employee details updated successfully",
            });
        },
        onError: (error) => {
            const message = getErrorMessage(error, "Something went wrong, please try again");
            toast({
                variant: "destructive",
                title: message,
            });
        },
    });
};
