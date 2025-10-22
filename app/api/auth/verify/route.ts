import prisma from "@/prisma/prisma-client";
import {NextRequest, NextResponse} from "next/server";

export async function GET (req:NextRequest){

    try {
        const code = req.nextUrl.searchParams.get('code');
        if (!code) {
           return NextResponse.json({error: 'incorrect code'}, {status:400});
        }

        const verificationCode = await prisma.verificationCode.findFirst({
            where: {
                code,
            }
        });

        if (!verificationCode) {
            return NextResponse.json({error: 'incorrect code'}, {status:400});
        }
        await prisma.user.update({
            where:{
                id: Number(verificationCode.userId),
            },
            data: {
                verified: new Date()
            }
        })

        await prisma.verificationCode.delete({
            where: {
                id: verificationCode.id
            }
        })

        return NextResponse.redirect(new URL("/?verified", req.url))

    } catch (err) {
        console.log("[VERIFY GET] server error", err);
    }
}