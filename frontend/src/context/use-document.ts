import { create } from "zustand";

interface DocumentState {
    currentFolderId: string | null;
    setCurrentFolderId: (folderId: string | null) => void;
    previousFolder: string | null;
    setPreviousFolder: (folderId: string | null) => void;
}

export const useDocumentStore = create<DocumentState>(set => ({
    currentFolderId: null,
    setCurrentFolderId: (folderId: string | null) => set({ currentFolderId: folderId }),
    previousFolder: null,
    setPreviousFolder: (folderId: any) => set({ previousFolder: folderId })
}));
