import { create } from "zustand";

interface DocumentState {
    currentFolderId: string | null;
    setCurrentFolderId: (folderId: string | null) => void;
    previousFolder: {
        name: string;
        parentId?: { _id: string };
    } | null;
    setPreviousFolder: (folder: { name: string; parentId?: { _id: string } } | null) => void;
}

export const useDocumentStore = create<DocumentState>((set) => ({
    currentFolderId: null,
    setCurrentFolderId: (folderId: string | null) => set({ currentFolderId: folderId }),
    previousFolder: null,
    setPreviousFolder: (folder: { name: string; parentId?: { _id: string } } | null) => set({ previousFolder: folder })
}));
