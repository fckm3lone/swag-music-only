// store/orderValidationStore.ts
import {create} from "zustand";
import {TValidationResult} from "@/services/order";

interface IValidationStore {
    isCartEmpty:boolean;
    success: boolean;
    isFirstName?: boolean;
    messageFirstName?: string;
    isLastName?: boolean;
    messageLastName?: string;
    isEmail?: boolean;
    messageEmail?: string;
    isPhoneNumber?: boolean;
    messagePhoneNumber?: string;
    isDeliveryAdres?: boolean;
    messageDeliveryAdres?: string;
    isDeliveryDate?: boolean;
    messageDeliveryDate?: string;

    setValidationResult: (validationResult: TValidationResult) => void;
    clearValidationResult: () => void;
}


const initialState = {
    isCartEmpty:false,
    success: true,
    isFirstName: true,
    messageFirstName: undefined,
    isLastName: true,
    messageLastName: undefined,
    isEmail: true,
    messageEmail: undefined,
    isPhoneNumber: true,
    messagePhoneNumber: undefined,
    isDeliveryAdres: true,
    messageDeliveryAdres: undefined,
    isDeliveryDate: true,
    messageDeliveryDate: undefined,
}


export const useValidationStore = create<IValidationStore>((set) => ({
    ...initialState,

    setValidationResult: (validationResult)=> set({...validationResult}),
    clearValidationResult: ()=>set(initialState),
}));