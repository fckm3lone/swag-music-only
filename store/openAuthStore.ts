import {create} from "zustand";

interface IOpenAuthStore {
    isOpen: boolean,
    setIsOpen: (isOpen:boolean) =>void
}

export const useOpenAuthStore = create<IOpenAuthStore>((set)=>
    ({
        isOpen: false,
        setIsOpen: (isOpen)=>set({isOpen}),
}))