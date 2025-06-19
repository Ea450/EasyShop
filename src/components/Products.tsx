import { getProducts } from "@/lib/actions/product.action"
import Pager from "./ProductsPager";



const Products = async () => {

    const Products = await getProducts();
    return (
        <div className="p-4">
            <Pager productsNumber={Products.length} Products={Products} />
        </div>
    )
}

export default Products