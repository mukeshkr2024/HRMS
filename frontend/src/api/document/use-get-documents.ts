import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../api-client"

export const useGetDocuments = (folderId?: string, employee?: string) => {
    return useQuery({
        queryKey: ["documents", folderId],
        queryFn: async () => {
            const queryParams = new URLSearchParams();
            if (folderId) {
                queryParams.append('folderId', folderId);
            }
            if (employee) {
                queryParams.append('employee', employee);
            }

            const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';

            const { data } = await apiClient.get(`/documents${queryString}`);
            return data;
        },
    });
}
