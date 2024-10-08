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
    resetSelections: () => void;  // Reset selected folders and files when navigating to a new folder or file list.
}

export const useDocumentStore = create<DocumentState>((set) => ({
    currentFolderId: null,
    setCurrentFolderId: (folderId: string | null) => {
        set({
            currentFolderId: folderId,
            previousFolder: folderId ? undefined : null, // Clear previous folder at root
        });
    },
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
    resetSelections: () => set({ selectedFolders: [], selectedFiles: [] }),
}));
