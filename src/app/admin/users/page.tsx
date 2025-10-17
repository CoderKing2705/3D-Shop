// app/admin/users/page.tsx
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminUsersPage() {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") redirect("/auth/login");

    const users = await prisma.users.findMany({ orderBy: { createdAt: "desc" } });

    return (
        <main className="min-h-screen p-8 text-white">
            <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

            <table className="w-full border-collapse border border-gray-700">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="p-3 border border-gray-700">Name</th>
                        <th className="p-3 border border-gray-700">Email</th>
                        <th className="p-3 border border-gray-700">Role</th>
                        <th className="p-3 border border-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id} className="text-center">
                            <td className="p-3 border border-gray-700">{u.name}</td>
                            <td className="p-3 border border-gray-700">{u.email}</td>
                            <td className="p-3 border border-gray-700">{u.role}</td>
                            <td className="p-3 border border-gray-700">
                                {u.role === "ADMIN" ? (
                                    <form action={`/api/admin/users/${u.id}/demote`} method="POST">
                                        <button className="bg-red-500 px-4 py-1 rounded text-white">
                                            Remove Admin
                                        </button>
                                    </form>
                                ) : (
                                    <form action={`/api/admin/users/${u.id}/promote`} method="POST">
                                        <button className="bg-green-500 px-4 py-1 rounded text-white">
                                            Make Admin
                                        </button>
                                    </form>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
