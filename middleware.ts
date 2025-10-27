// middleware.ts

export const runtime = "nodejs";

import {getToken} from "next-auth/jwt";
import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";

export async function middleware(req: NextRequest) {
    // getToken сам прочитает токен из cookie next-auth
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    // если токен отсутствует или просрочен
    if (!token) {
        const res = NextResponse.redirect(new URL("/?notAuth", req.url));
        res.cookies.delete("next-auth.session-token");
        res.cookies.delete("__Secure-next-auth.session-token");
        return res;
    }

    // токен есть и валиден → пропускаем дальше
    return NextResponse.next();
}

export const config = {
    matcher: ["/profile/:path*", "/order/:path*"],
};