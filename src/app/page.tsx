import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {

  const user = await auth();
  if (user.isAuthenticated) redirect('/products')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
      <div>
        <Image src="/images/discount.png" alt="Shop Image" width={450} height={450} />
      </div>
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-2xl font-bold text-center text-yellow-600 p-2">Welcome to Our Easy Shop</h1>
        <p className="text-center mt-4">Your one-stop shop for all your needs ,makes your shoping easy and fast</p>
        <p className="text-center mt-4">Sign up to start shopping now!</p>
        <button className="button !w-fit px-5"><Link href={'/sign-in'}>
          Lets Start
        </Link></button>
      </div>

    </div>
  )
}

export default page