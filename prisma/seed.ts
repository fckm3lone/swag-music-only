import prisma from "./prisma-client";
import {hashSync} from "bcryptjs";
import {
    attributeGroups,
    attributes,
    brands,
    categories,
    colors,
    productAttributes,
    productImages,
    products,
    types
} from './constants';

async function up() {

    const admin = await prisma.user.upsert({
      where: { email: 'ilalov@mail.ru' },
      update: {},
      create: {
        fullName: 'Albert Ilalov',
        email: 'ilalov@mail.ru',
        password: hashSync('1111', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    });

    const user = await prisma.user.upsert({
      where: { email: 'timofeev@mail.ru' },
      update: {},
      create: {
        fullName: 'Danis Timofeev 77',
        email: 'timofeev@mail.ru',
        password: hashSync('3333', 10),
        verified: new Date(),
        role: 'USER',
      },
    });


    await prisma.cart.createMany({
      data: [
        {
          userId: admin.id,
          token: '7bd02c94-872c-4c01-a157-f9422ce8ec3b',
          totalAmount: 0.0,
        },
      ],
    });



    // Создание категорий
    await prisma.category.createMany({ data: categories });

    // Создание брендов
    await prisma.brand.createMany({ data: brands });

    // Создание цветов
    await prisma.color.createMany({ data: colors });

    // Создание типов
    await prisma.type.createMany({ data: types });

    // Создание групп атрибутов
    await prisma.attributeGroup.createMany({ data: attributeGroups });

    // Создание атрибутов
    await prisma.attribute.createMany({ data: attributes });

    // Создание продуктов
    await prisma.product.createMany({ data: products });

    // Создание изображений продуктов
    await prisma.productImage.createMany({ data: productImages });

    // Создание атрибутов продуктов
    await prisma.productAttribute.createMany({ data: productAttributes });

}

async function main() {

    try {

        // Быстро чистим всё и сбрасываем автоинкременты (PostgreSQL)
        try {
          await prisma.$executeRawUnsafe(`
            TRUNCATE TABLE
              "CartItem",
              "OrderItem",
              "Order",
              "VerificationCode",
              "ProductAttribute",
              "ProductImage",
              "Product",
              "Attribute",
              "AttributeGroup",
              "Type",
              "Color",
              "Brand",
              "Category",
              "Cart",
              "User"
            RESTART IDENTITY CASCADE;
          `);
        } catch (e) {
          // Фоллбэк для SQLite/других провайдеров — порядок важен
          await prisma.$transaction([
            prisma.cartItem.deleteMany(),
            prisma.orderItem.deleteMany(),
            prisma.order.deleteMany(),
            prisma.verificationCode.deleteMany(),
            prisma.productAttribute.deleteMany(),
            prisma.productImage.deleteMany(),
            prisma.product.deleteMany(),
            prisma.attribute.deleteMany(),
            prisma.attributeGroup.deleteMany(),
            prisma.type.deleteMany(),
            prisma.color.deleteMany(),
            prisma.brand.deleteMany(),
            prisma.category.deleteMany(),
            prisma.cart.deleteMany(),
            prisma.user.deleteMany(),
          ]);
        }

        await up();
    } catch (e) {
        console.error(e);
    }
}

main()
    .then(async ()=> {
        await prisma.$disconnect();
    }).catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
});