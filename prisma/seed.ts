import prisma from "./prisma-client";
import {hashSync} from "bcrypt";
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

    await prisma.user.createMany({
        data: [
            {
                fullName: 'Albert Ilalov',
                email: 'ilalov@mail.ru',
                password: hashSync('1111', 10),
                verified: new Date(),
                role: 'ADMIN',
            },

            {
                fullName: 'Danis Timofeev 77',
                email: 'timofeev@mail.ru',
                password: hashSync('3333', 10),
                verified: new Date(),
                role: 'USER',
            }
        ]
    })



    await prisma.cart.createMany({
        data : [
            {
            userId: 1,
            token: "7bd02c94-872c-4c01-a157-f9422ce8ec3b",
            totalAmount: 0.00,
        }
        ]
    })




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

        await prisma.productAttribute.deleteMany();
        await prisma.productImage.deleteMany();
        await prisma.product.deleteMany();
        await prisma.attribute.deleteMany();
        await prisma.attributeGroup.deleteMany();
        await prisma.type.deleteMany();
        await prisma.color.deleteMany();
        await prisma.brand.deleteMany();
        await prisma.category.deleteMany();
        await prisma.cart.deleteMany();
        await prisma.user.deleteMany();

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