// services/order.ts
import {axiosInstance} from "@/services/axiosInstance";
import {ApiRoutes} from "@/services/constants";
import {useCartStore} from "@/store/cartStore";
import {useOrderStore} from "@/store/orderStore";
import {Order} from "@prisma/client";
import {OrderWithImage} from "@/types/order";

// ===== Тип результата валидации =====
export type TValidationResult = {
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

};

// ===== API методы =====

// Получить все заказы пользователя
export async function getOrders(): Promise<OrderWithImage[]> {
    const { data } = await axiosInstance.get<OrderWithImage[]>(ApiRoutes.ORDER_API, {
        withCredentials: true,
    });
    return data;
}

// Создать новый заказ с валидацией
export async function createOrder(): Promise<TValidationResult> {
    const { firstName, lastName, email, phoneNumber, deliveryAdres, deliveryDate } = useOrderStore.getState();
    const {cart} = useCartStore.getState();
    const fullName = `${firstName} ${lastName}`.trim();

    const validation: TValidationResult = {
        isCartEmpty: false,
        success: true,
        isFirstName: true,
        isLastName: true,
        isEmail: true,
        isPhoneNumber: true,
        isDeliveryAdres: true,
        isDeliveryDate: true,
    };

    if(!cart || cart.items.length===0) {
        validation.success = false;
        validation.isCartEmpty = true;
        return validation;
    }

    if (!firstName.trim()) {
        validation.success = false;
        validation.isFirstName = false;
        validation.messageFirstName = "Имя обязательно";
    }

    if (!lastName.trim()) {
        validation.success = false;
        validation.isLastName = false;
        validation.messageLastName = "Фамилия обязательна";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        validation.success = false;
        validation.isEmail = false;
        validation.messageEmail = "Некорректный email";
    }

    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
        validation.success = false;
        validation.isPhoneNumber = false;
        validation.messagePhoneNumber = "Некорректный номер телефона";
    }

    if (!deliveryAdres.trim()) {
        validation.success = false;
        validation.isDeliveryAdres = false;
        validation.messageDeliveryAdres = "Адрес обязателен";
    }

    if (!deliveryDate || deliveryDate < new Date()) {
        validation.success = false;
        validation.isDeliveryDate = false;
        validation.messageDeliveryDate = "Некорректная дата доставки";
    }

    if (!validation.success) {
        
        return validation;
    }

    const { data } = await axiosInstance.post<Order>(
        ApiRoutes.ORDER_API,
        {
            fullName,
            email,
            phone: phoneNumber,
            adress: deliveryAdres,
            deliveryTime: deliveryDate,
        },
        { withCredentials: true }
    );

    useCartStore.getState().clearCart();


    setTimeout(async () => {
        try {
            await updateOrderStatus(data.id, "PAID");
        } catch (err) {
            console.error("Ошибка автообновления статуса:", err);
        }
    }, 20000);

    return { success: true,
        isCartEmpty: false
        // order: data
        };
}

// Обновить статус заказа
export async function updateOrderStatus(
    orderId: number,
    status: "PENDING" | "PAID" | "CANCELED"
): Promise<Order> {
    const { data } = await axiosInstance.patch<Order>(
        ApiRoutes.ORDER_API,
        { orderId, status },
        { withCredentials: true }
    );
    return data;
}