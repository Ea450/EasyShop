'use client'
import Image from "next/image"
import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { addToCart, addToFavorite, removeFromCart, removeFromFavorite } from "@/lib/actions/product.action";
import { usePathname } from "next/navigation";

const ProductCard = ({ id, price, title, description, image, loved }: ProductCardProps) => {
    const pathname = usePathname();

    const [liked, setLiked] = useState(loved);
    const discountedPrice = (price - (price * 30 / 100)).toFixed(2)
    const handleLiked = () => {
        if (liked) {
            setLiked(!loved);
            removeFromFavorite(id, pathname)
        } if (!liked) {
            setLiked(!loved)
            addToFavorite(id, pathname)
        }
    }
    return (
        <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white">
            <div className="relative ">
                <div className="w-full aspect-square flex items-center justify-center">
                    <Image src={image} alt="title" width={200} height={100} className="object-cover rounded-xl" />
                </div>
                {pathname === '/products' && <button
                    className="absolute top-2 left-2 flex items-center space-x-1 text-sm text-red-300 bg-white bg-opacity-75 px-2 py-1 rounded-full shadow"
                    onClick={handleLiked}
                >
                    <Heart className={cn('w-4 h-4 text-red-500', liked ? 'fill-red-500' : '')} />
                    <span className="font-medium">{liked ? "You love this!" : ""}</span>
                </button>}
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-lg font-bold text-gray-800">{(discountedPrice)}$</span>
                    <span className="line-through text-gray-400 text-sm">{price}$</span>
                </div>
                <p className="mt-2 text-gray-600 text-sm">
                    {description}
                </p>

                {pathname === '/cart' ? (<button className="button" onClick={() => removeFromCart(id, pathname)}>
                    Remove From Cart
                </button>
                ) : (<button className="button" onClick={() => addToCart(id)}>
                    Add To Cart
                </button>)}
                {pathname === '/favorite' && <button className="button" onClick={() => removeFromFavorite(id, pathname)}>
                    Remove from favorite
                </button>}
            </div>
        </div>
    );
}

export default ProductCard