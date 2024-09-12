import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { EmployeeFormSchemaType } from "@/pages/my-info/MyInfoPage";

export const useUpdateMyInfo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (infoData: EmployeeFormSchemaType) => {
            const { data } = await apiClient.put(`/employees/my-info`, infoData);
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
