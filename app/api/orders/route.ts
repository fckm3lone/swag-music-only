import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/prisma-client";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/constants/authOptions";

// Получение информации о заказе пользователя по userId
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;

    if (!userId) {
        return NextResponse.json({
            error: "Пользователь не авторизован",
        }, { status: 400 });
    }

    try {
        const order = await prisma.order.findMany({
            where: { userId: Number(userId) },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                images: {
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!order || order.length === 0) {
            return NextResponse.json({ error: "Заказ не найден" }, { status: 404 });
        }

        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        console.error("Ошибка при получении заказа:", error);
        return NextResponse.json(
            { error: "Не удалось получить заказ" },
            { status: 500 }
        );
    }
}

// Создание нового заказа
export async function POST(req: NextRequest) {
    try {
        const { fullName, email, phone, adress, deliveryTime} = await req.json();
        const session = await getServerSession(authOptions);

        if (!session) {
            return new Response("Unauthorized", { status: 401 });
        }

        const userId = session.user.id;

        if (!userId) {
            return NextResponse.json({
                error: "Пользователь не авторизован",
            }, { status: 400 });
        }

        // Получаем корзину пользователя
        const cart = await prisma.cart.findUnique({
            where: { userId: parseInt(userId) },
            include: { items: {
                include: {
                    product: true
                }
                } }
        });

        if (!cart || cart.items.length === 0) {
            return NextResponse.json({
                error: "Корзина пуста",
            }, { status: 400 });
        }

        // Создаем новый заказ
        const order = await prisma.order.create({
            data: {
                userId: parseInt(userId),
                totalAmount: cart.totalAmount,
                totalCount: cart.totalCount,
                fullName,
                email,
                phone,
                adress,
                deliveryTime,
                items: {
                    create: cart.items.map(item => ({
                        productId: item.productId,
                        name: item.product.name,
                        quantity: item.quantity,
                    })),
                },
            },
        });

        // Очистить корзину после оформления заказа
        await prisma.cart.update({
            where: { id: cart.id },
            data: {
                totalAmount: 0,
                totalCount: 0,
                items: {
                    deleteMany: {},
                },
            },
        });

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error("Ошибка при создании заказа:", error);
        return NextResponse.json(
            { error: "Не удалось создать заказ" },
            { status: 500 }
        );
    }
}

// Обновление статуса заказа
export async function PATCH(req: NextRequest) {
    const { orderId, status } = await req.json();

    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
        });

        if (!order) {
            return NextResponse.json({ error: "Заказ не найден" }, { status: 404 });
        }

        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: { status },
        });

        return NextResponse.json(updatedOrder, { status: 200 });
    } catch (error) {
        console.error("Ошибка обновления статуса заказа:", error);
        return NextResponse.json(
            { error: "Не удалось обновить статус заказа" },
            { status: 500 }
        );
    }
}