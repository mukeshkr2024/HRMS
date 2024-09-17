import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { EditEmployeeFormSchemaType } from "@/pages/empoyeeId/EmployeeIdPage";

export const useUpdateEmployeeInfo = (employeeId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (infoData: EditEmployeeFormSchemaType) => {
            const { data } = await apiClient.put(`/employees/${employeeId}`, infoData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employee"] })
        },
        onError: () => {
            console.log("onError");
        }
    });
};
