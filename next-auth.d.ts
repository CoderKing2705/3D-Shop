import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id?: int | null;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string | null;
        };
    }

    interface User {
        role?: string | null;
    }

    interface JWT {
        role?: string | null;
    }
}
