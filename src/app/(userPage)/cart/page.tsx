
import CartComponent from "@/components/CartComponent";
import StripeComponent from "@/components/StripeComponent";
import { getCartProducts } from "@/lib/actions/product.action"
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const Cart = async () => {

    const { userId } = await auth()
    if (!userId) redirect('/sign-in')
    const cartProductGroups = await getCartProducts(userId);
    const cartProducts: Product[] = cartProductGroups.flatMap(group => group.products);
    const totalPrice = cartProducts.reduce(
        (sum, product) => sum + product.price * (product.quntity ?? 1),
        0
    );
    return (
        <>
            <div className="p-6 md:flex gap-6 flex-wrap justify-center">
                <div>
                    {cartProducts.length === 0 && (
                        <div>
                            <Image src='/images/oops.jpg' alt="oops" width={330} height={330} />
                            <h1 className="text-xl font-bold text-yellow-600 mt-[50%]">
                                You didn&apos;t have any products in your cart
                            </h1>
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-center flex-wrap gap-4">
                    {cartProducts.map(({ id, title, price, description, image, loved, category, quntity }) => (
                        <CartComponent
                            key={id}
                            id={id}
                            title={title}
                            price={price}
                            description={description}
                            image={image}
                            loved={loved}
                            category={category}
                            quntity={quntity}
                        />
                    ))}
                </div>
                {cartProducts.length > 0 && (
                    <StripeComponent totalPrice={totalPrice} cartProducts={cartProducts} />
                )}
            </div>
        </>
    )
}

export default Cart