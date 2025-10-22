import {create} from 'zustand'

interface IOrderState {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    deliveryAdres: string;
    deliveryDate: Date | undefined;
    deliveryCost: number;

    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setEmail: (email: string) => void;
    setPhoneNumber: (phone: string) => void;
    setDeliveryAdres: (adres: string) => void;
    setDeliveryDate: (date: Date) => void;
    clearOrderStore: () => void;


}

const initialState = {
    firstName:"",
    lastName:"",
    email: "",
    phoneNumber: "",
    deliveryAdres: "",
    deliveryDate: undefined,
    deliveryCost: 120,
};

export const useOrderStore = create<IOrderState>((set) => ({
    ...initialState,

    setFirstName: (firstName) => set({firstName:firstName}),
    setLastName: (lastName) => set({lastName:lastName}),
    setEmail: (email) => set({email:email}),
    setPhoneNumber: (phoneNumber) => set({phoneNumber:phoneNumber}),
    setDeliveryAdres: (deliveryAdres) => set({deliveryAdres:deliveryAdres}),
    setDeliveryDate: (deliveryDate) => set({deliveryDate:deliveryDate}),
    clearOrderStore: ()=> set(initialState)


    })

)