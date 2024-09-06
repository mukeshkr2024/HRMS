import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../api-client"

export const useGetDocuments = (folderId?: string) => {
    return useQuery({
        queryKey: ["documents", folderId],
        queryFn: async () => {
            const queryParam = folderId ? `?folderId=${folderId}` : '';
            const { data } = await apiClient.get(`/documents${queryParam}`);
            return data;
        },
        // enabled: !!folderId || folderId === undefined, // only fetch if folderId is defined or if it is undefined
    });
}
