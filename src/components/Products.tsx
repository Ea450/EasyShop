import { getProducts } from "@/lib/actions/product.action"
import Image from "next/image";


const Products = async () => {
    const Products = await getProducts();
    return (
        <div className="max-w-4xl mx-auto p-4">
            {Products.map((product) => (
                <div key={product.id}>
                    <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
                    <div className="flex gap-6">
                        <Image src={product.image} alt={product.title} className="object-contain rounded-xl" width={110} height={110} />
                        <div>
                            <p className="text-xl font-semibold text-green-700">{product.description}</p>
                            <p className="mt-4 text-gray-700">Price: {product.price}$</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Products