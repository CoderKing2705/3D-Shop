// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ export this for getServerSession
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                const user = await prisma.users.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error("No user found");
                }
                
                if (!user.password) {
                    throw new Error("User has no password set");
                }

                const isValid = await compare(credentials.password, user.password);
                if (!isValid) {
                    throw new Error("Invalid password");
                }

                return { id: user.id, name: user.name, email: user.email };
            },
        }),
    ],
    pages: {
        signIn: "/auth/login", // ✅ make sure your login page path is correct
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

// ✅ Pass authOptions to NextAuth
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
