import Products from "@/components/Products"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import '@syncfusion/ej2-base/styles/tailwind.css';       // Syncfusion core styles
import '@syncfusion/ej2-react-grids/styles/tailwind.css';

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