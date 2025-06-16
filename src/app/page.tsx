import Products from "@/components/Products"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

const page = async () => {

  const user = await auth();

  if (!user.isAuthenticated) redirect('/sign-in')

  return (
    <div>
      <Products />
    </div>
  )
}

export default page