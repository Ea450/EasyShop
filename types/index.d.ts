interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}
type User = {
    name: string;
    email: string;
    image?: string;
    accountId: string;
};