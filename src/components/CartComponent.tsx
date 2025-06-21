'use client'
import { quntityDercrease, quntityInrcrease, removeFromCart } from "@/lib/actions/product.action"
import Image from "next/image"
import { usePathname } from "next/navigation"

const CartComponent = ({ id, description, image, price, title, quntity }: ProductCardProps) => {
    const discountedPrice = (price - (price * 30 / 100)).toFixed(2)
    const pathname = usePathname();
    return (
        <div>
            <div className="w-[300px] bg-white shadow-md rounded-lg p-4 flex flex-col items-center" key={id}>
                <Image src={image} alt={title} width={200} height={200} className=" object-cover rounded-md mb-4" />
                <div className="flex flex-col items-center text-center h-[180px]" >
                    <p className="font-bold text-xl">{title}</p>
                    <p className="text-gray-500">{description}</p>
                </div>
                <div className="flex items-center justify-between w-full mt-4">
                    <span className="text-lg font-bold text-green-900">{(Number(discountedPrice) * quntity!).toFixed(2)}$</span>
                    <div className="flex items-center space-x-2">
                        {quntity! > 0 && (
                            <button onClick={() => quntityDercrease(id, quntity!, pathname)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">-</button>
                        )}
                        <span className="text-lg">{quntity}</span>
                        {quntity! < 10 && (
                            <button onClick={() => quntityInrcrease(id, quntity!, pathname)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">+</button>
                        )}
                    </div>
                </div>
                <button className="mt-4 w-full bg-yellow-800 text-white border border-yellow-800 hover:border-yellow-800 py-2 rounded-full text-sm hover:bg-white hover:text-yellow-800 transition cursor-pointer" onClick={() => removeFromCart(id, pathname)}>
                    Remove from cart
                </button>
            </div>
            <div >

            </div>
        </div>
    )
}

export default CartComponent