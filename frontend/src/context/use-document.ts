import { create } from "zustand";

interface DocumentState {
    currentFolderId: string | null;
    setCurrentFolderId: (folderId: string | null) => void;
    previousFolder: {
        name: string;
        parentId?: { _id: string };
    } | null;
    setPreviousFolder: (folder: { name: string; parentId?: { _id: string } } | null) => void;
    selectedFolders: string[];
    selectedFiles: string[];
    toggleFolderSelection: (id: string) => void;
    toggleFileSelection: (id: string) => void;
}

export const useDocumentStore = create<DocumentState>((set) => ({
    currentFolderId: null,
    setCurrentFolderId: (folderId: string | null) => set({ currentFolderId: folderId }),
    previousFolder: null,
    setPreviousFolder: (folder: { name: string; parentId?: { _id: string } } | null) => set({ previousFolder: folder }),
    selectedFolders: [],
    selectedFiles: [],
    toggleFolderSelection: (id: string) => set(state => {
        const newSelection = state.selectedFolders.includes(id)
            ? state.selectedFolders.filter(folderId => folderId !== id)
            : [...state.selectedFolders, id];
        return { selectedFolders: newSelection };
    }),
    toggleFileSelection: (id: string) => set(state => {
        const newSelection = state.selectedFiles.includes(id)
            ? state.selectedFiles.filter(fileId => fileId !== id)
            : [...state.selectedFiles, id];
        return { selectedFiles: newSelection };
    }),
}));
