// hooks/useOrderValidation.ts

import {useValidationStore} from "@/store/validationStore";
import {createOrder, TValidationResult} from "@/services/order";

export function useOrderValidation() {
    const setValidationResult = useValidationStore((s)=>s.setValidationResult)
    const clearValidationResult = useValidationStore((s)=>s.clearValidationResult)

    const validateAndCreateOrder = async ():Promise<TValidationResult> => {
        const result = await createOrder();
        setValidationResult(result);
        if(result.success) clearValidationResult();

        return result;
    }

    return {validateAndCreateOrder};
}