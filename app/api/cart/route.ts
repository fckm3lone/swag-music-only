import {NextRequest, NextResponse} from "next/server";
import prisma, {withRetry} from "@/prisma/prisma-client";
import {randomUUID} from "crypto";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/constants/authOptions";

// Вспомогательная функция для получения корзины по userId или token
import type {Cart} from "@prisma/client";

async function getOrCreateCart({
                                 userId,
                                 token,
                               }: {
  userId?: number;
  token?: string;
}): Promise<{ cart: Cart; token: string; isNewToken: boolean }> {
  let isNewToken = false;
  let currentToken = token ?? randomUUID();

  let cart: Cart | null

  if (userId) {

    cart = await prisma.cart.findFirst({ where: { userId } });

    if (cart) {

      currentToken = cart.token;
    } else {

      const tokenCart = token
          ? await prisma.cart.findUnique({ where: { token } })
          : null;

      if (tokenCart && !tokenCart.userId) {

        cart = await prisma.cart.update({
          where: { id: tokenCart.id },
          data: { userId },
        });
        currentToken = cart.token;
      } else {

        isNewToken = !token;
        cart = await prisma.cart.create({
          data: { token: currentToken, userId },
        });
      }
    }
  } else {

    cart = await prisma.cart.findUnique({ where: { token: currentToken } });

    if (!cart) {
      isNewToken = !token;
      cart = await prisma.cart.create({ data: { token: currentToken } });
    }
  }

  return { cart, token: currentToken, isNewToken };
}

// Получить корзину с синхронизацией userId и cartToken
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  let userId: number | undefined = undefined;
  let token = req.cookies.get("cartToken")?.value;
  if (session && session.user && session.user.id) {
    userId = Number(session.user.id);
  }
  let cart: Cart | null
  let isNewToken = false;
  try {
    // Синхронизируем корзину
    const result = await getOrCreateCart({ userId, token });
    cart = result.cart;
    token = result.token;
    isNewToken = result.isNewToken;
    // Получаем корзину с товарами
    const cartWithItems = await withRetry(() =>
      prisma.cart.findUnique({
        where: { id: cart!.id },
        include: {
          items: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              product: {
                include: {
                  images: {
                    take: 1,
                    orderBy: { id: "asc" },
                  },
                },
              },
            },
          },
        },
      })
    );
    const response = NextResponse.json(cartWithItems, { status: 200 });
    // Сохраняем token для обратной совместимости
    if (isNewToken || token !== req.cookies.get("cartToken")?.value) {
      response.cookies.set("cartToken", token, {
        path: "/",
        httpOnly: true,
      });
    }
    return response;
  } catch (error) {
    console.error("Ошибка при получении корзины:", error);
    return NextResponse.json(
      { error: "Не удалось получить корзину" },
      { status: 500 }
    );
  }
}

// Добавить товар в корзину с синхронизацией userId и cartToken
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    let userId: number | undefined = undefined;
    let token = req.cookies.get("cartToken")?.value;
    if (session && session.user && session.user.id) {
      userId = Number(session.user.id);
    }
    // Синхронизируем корзину
    const { cart, token: newToken, isNewToken } = await getOrCreateCart({ userId, token });
    token = newToken;

    const { productId, quantity } = await req.json();


    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, price: true },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Продукт не найден" },
        { status: 404 }
      );
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    let item;
    if (existingItem) {
      if (existingItem.quantity >= 10) {
        return NextResponse.json(
          { error: "Максимальное количество товара - 10" },
          { status: 400 }
        );
      }

      item = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: { increment: quantity ?? 1 } },
      });
    } else {
      item = await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity: quantity ?? 1 },
      });
    }

    // Пересчитываем totalCount и totalAmount
    const cartItems = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: { product: { select: { price: true } } },
    });

    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0
    );

    // Обновляем totalCount и totalAmount в таблице cart
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        totalCount,
        totalAmount: totalAmount.toFixed(2),
      },
    });

    const response = NextResponse.json(item, { status: 201 });
    if (isNewToken) {
      response.cookies.set("cartToken", token, {
        path: "/",
        httpOnly: true,
      });
    }
    return response;
  } catch (error) {
    console.error("Ошибка при добавлении товара в корзину:", error);
    return NextResponse.json(
      { error: "Не удалось добавить товар в корзину" },
      { status: 500 }
    );
  }
}

// Обновить корзину с синхронизацией userId и cartToken
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    let userId: number | undefined = undefined;
    let token = req.cookies.get("cartToken")?.value;
    if (session && session.user && session.user.id) {
      userId = Number(session.user.id);
    }
    // Синхронизируем корзину
    const { cart, token: newToken, isNewToken } = await getOrCreateCart({ userId, token });
    token = newToken;

    const { cartItemId, action } = await req.json();
    // action = "increment" | "decrement"

    const existingItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { product: { select: { price: true } } },
    });

    if (!existingItem || existingItem.cartId !== cart.id) {
      return NextResponse.json(
        { error: "Товар не найден в корзине" },
        { status: 404 }
      );
    }

    let updatedItem;
    if (action === "increment") {
      if (existingItem.quantity >= 10) {
        return NextResponse.json(
          { error: "Максимальное количество товара - 10" },
          { status: 400 }
        );
      }
      updatedItem = await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity: { increment: 1 } },
      });
    } else if (action === "decrement") {
      if (existingItem.quantity <= 1) {
        await prisma.cartItem.delete({
          where: { id: cartItemId },
        });
        // Пересчитываем totalCount и totalAmount после удаления
        const cartItems = await prisma.cartItem.findMany({
          where: { cartId: cart.id },
          include: { product: { select: { price: true } } },
        });
        const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = cartItems.reduce(
          (sum, item) => sum + Number(item.product.price) * item.quantity,
          0
        );
        await prisma.cart.update({
          where: { id: cart.id },
          data: {
            totalCount,
            totalAmount: totalAmount.toFixed(2),
          },
        });
        const response = NextResponse.json({
          success: true,
          deleted: true,
        });
        if (isNewToken) {
          response.cookies.set("cartToken", token, {
            path: "/",
            httpOnly: true,
          });
        }
        return response;
      }
      updatedItem = await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity: { decrement: 1 } },
      });
    } else {
      return NextResponse.json(
        { error: "Неверное действие" },
        { status: 400 }
      );
    }

    // Пересчитываем totalCount и totalAmount после обновления
    const cartItems = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: { product: { select: { price: true } } },
    });
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0
    );
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        totalCount: totalCount,
        totalAmount: totalAmount.toFixed(2),
      },
    });
    const response = NextResponse.json(updatedItem);
    if (isNewToken) {
      response.cookies.set("cartToken", token, {
        path: "/",
        httpOnly: true,
      });
    }
    return response;
  } catch (error) {
    console.error("Ошибка обновления корзины:", error);
    return NextResponse.json(
      { error: "Не удалось обновить корзину" },
      { status: 500 }
    );
  }
}