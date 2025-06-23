export const dynamic = "force-dynamic";
import { getProducts } from "@/lib/actions/product.action"
import Pager from "../../../components/ProductsPager";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Advertisement from "@/components/Advertisement";



const Products = async () => {

    const Products = await getProducts();
    const user = await auth();

    if (!user.isAuthenticated) redirect('/sign-in')

    return (
        <div className="p-4">
            <Advertisement />
            <Pager productsNumber={Products.length} Products={Products} />
        </div>
    )
}

export default Products