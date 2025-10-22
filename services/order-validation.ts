// order-validation.ts
import { useValidationStore } from "@/store/validationStore";

export function validateOrderData({
                                      firstName,
                                      lastName,
                                      email,
                                      phoneNumber,
                                      deliveryAdres,
                                      deliveryDate,
                                  }: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    deliveryAdres: string;
    deliveryDate: Date | undefined;
}): boolean {
    const { clearAll, setError } = useValidationStore.getState();
    clearAll(); // очищаем прошлые ошибки

    let hasErrors = false;

    if (!firstName.trim()) {
        setError("firstName", "Имя обязательно");
        hasErrors = true;
    }

    if (!lastName.trim()) {
        setError("lastName", "Фамилия обязательна");
        hasErrors = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setError("email", "Некорректный email");
        hasErrors = true;
    }

    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
        setError("phoneNumber", "Некорректный номер телефона");
        hasErrors = true;
    }

    if (!deliveryAdres.trim()) {
        setError("deliveryAdres", "Адрес обязателен");
        hasErrors = true;
    }

    if (!deliveryDate || deliveryDate < new Date()) {
        setError("deliveryDate", "Некорректная дата доставки");
        hasErrors = true;
    }

    return !hasErrors;
}