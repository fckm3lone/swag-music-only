import type {AuthOptions} from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/prisma/prisma-client"
import {compare, hashSync} from "bcrypt"
import {UserRole} from "@prisma/client"

export const authOptions: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    name: profile.name || profile.login,
                    email: profile.email,
                    role: "USER" as UserRole,
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<any> {
                if (!credentials) return null

                const findUser = await prisma.user.findFirst({
                    where: { email: credentials.email.toString() },
                })
                if (!findUser) throw new Error("Invalid e-mail or password")

                const isPasswordValid = await compare(
                    credentials.password,
                    findUser.password
                )
                if (!isPasswordValid) throw new Error("Invalid e-mail or password")
                if (!findUser.verified) throw new Error("The user is not verified")

                return {
                    id: findUser.id.toString(),
                    email: findUser.email,
                    fullName: findUser.fullName,
                    role: findUser.role,
                }
            },
        }),
    ],
    secret: process.env.NEXT_AUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account }) {
            try {
                if (account?.provider === "credentials") return true
                if (!user.email) return false

                const findUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            {
                                provider: account?.provider,
                                providerId: account?.providerAccountId,
                            },
                            { email: user.email },
                        ],
                    },
                })
                if (findUser) {
                    await prisma.user.update({
                        where: { id: findUser.id },
                        data: {
                            provider: account?.provider,
                            providerId: account?.providerAccountId,
                        },
                    })
                    return true
                }

                if (!user.email || !account?.providerAccountId) return false

                await prisma.user.create({
                    data: {
                        email: user.email,
                        fullName: user.name || "User #" + account.providerAccountId,
                        password: hashSync(account.providerAccountId, 10),
                        verified: new Date(),
                        provider: account.provider,
                        providerId: account.providerAccountId,
                    },
                })

                return true
            } catch (error) {
                console.error("Error SIGN IN", error)
                return false
            }
        },

        async jwt({ token }) {
            if (!token.email) return token
            const findUser = await prisma.user.findFirst({
                where: { email: token.email },
            })

            if (findUser) {
                token.id = findUser.id.toString()
                token.email = findUser.email
                token.fullName = findUser.fullName
                token.role = findUser.role
            }

            return token
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role
            }
            return session
        },
    },
}