import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session = await getServerSession(authOptions); // Ensure you have a session management system in place

  if(!session) {
    redirect('/auth/login');
  }

  redirect('/products');
}
