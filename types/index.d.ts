interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    loved: boolean;
    quntity?: number;
}
type User = {
    name: string;
    email: string;
    image?: string;
    accountId: string;
};
interface ProductCardProps {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    loved: boolean;
    quntity?: number;
}
interface ProductsPagerProps {
    productsNumber: number;
    Products: Product[];
}
type CartProduct = {
    title: string;
    image: string;
    price: number;
    quntity?: number;
};

interface StripeComponentProps {
    totalPrice: number;
    cartProducts: Product[];
};