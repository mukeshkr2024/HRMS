import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { EditEmployeeFormSchemaType } from "@/pages/empoyeeId/EmployeeIdPage";
import { useToast } from "@/components/ui/use-toast";

export const useUpdateEmployeeInfo = (employeeId: string) => {
    const queryClient = useQueryClient();
    const {
        toast
    } = useToast();

    return useMutation({
        mutationFn: async (infoData: EditEmployeeFormSchemaType) => {
            const { data } = await apiClient.put(`/employees/${employeeId}`, infoData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employee"] })
            toast({
                title: "Employee details updated successfully"
            })
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Something went wrong, please try again",
            })
        }
    });
};
