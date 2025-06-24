import ProductCard from "@/components/ProductCard"
import { getFavoriteProducts } from "@/lib/actions/product.action";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const favorite = async () => {
    const { userId } = await auth()
    if (!userId) redirect('/sign-in')
    const cartProductGroups = await getFavoriteProducts(userId);
    const cartProducts: Product[] = cartProductGroups.flatMap(group => group.products);
    return (
        <main className="p-6 md:flex gap-6 flex-wrap justify-center">
            <div>
                {cartProducts.length === 0 && (
                    <div>
                        <Image src='/images/oops.jpg' alt="oops" width={330} height={330} />
                        <h1 className="text-xl font-bold text-yellow-600 mt-[50%]">
                            You didn&apos;t have any products in your favorites
                        </h1>
                    </div>
                )}
            </div>
            {cartProducts.map(({ id, title, price, category, description, image, loved }) => (
                <ProductCard key={id} id={id} title={title} price={price} category={category} description={description} image={image} loved={loved} />
            ))}

        </main>
    )
}

export default favorite