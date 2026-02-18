"use server"

import {Prisma} from "@prisma/client";
import {getUserSession} from "@/lib/get-user-session";
import {hashSync} from "bcryptjs";
import prisma from "@/prisma/prisma-client";
import {cookies} from "next/headers";

export async function updateUserInfo (body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession()
        if(!currentUser) throw new Error("User not found")

        const findUser = await prisma.user.findFirst({
            where:
                {id: Number(currentUser.id)}
        })


            await prisma.user.update({
                where: {
                    id: Number(currentUser.id),
                },
                data: {
                    fullName: body.fullName,
                    email: body.email,
                    password: body.password ? hashSync(body.password as string, 10) : findUser?.password
                }
            })
        }

    catch (error) {
        console.error('Error [UPDATE_USER]', error);
        throw error;
    }
}

export async function registerUser (body: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            }})
        if (user) {
            throw new Error("User already exists")
        }
const createdUser = await prisma.user.create({
    data: {
        email: body.email,
        fullName: body.fullName,
        verified: new Date(),
        password: hashSync(body.password, 10),
    }
})
const cookieStore = await cookies();
const cartToken = cookieStore.get("cartToken")?.value;

if (cartToken) {
  await prisma.cart.updateMany({
    where: {
      token: cartToken,
      userId: null,
    },
    data: {
      userId: createdUser.id,
    },
  });
}
        return { success: true };

    //     const code = Math.floor(100000 + Math.random() * 900000).toString();
    //     await prisma.verificationCode.create({
    //         data: {
    //             userId: createdUser.id,
    //             code: code,
    //             type: "E-MAIL CONFIRMATION"
    //         }
    //     })
    //
    //     await sendEmail(
    //         createdUser.email,
    //         "SWAG MUSIC ONLY / Verify account",
    //         VerificationUserTemplate({code})
    //     )
    //
    //     return { success: true };
    //
        } catch (err:any) {
        console.error('Error [CREATE_USER]', err);
        return {success: false, message: err.message};
    }
}
