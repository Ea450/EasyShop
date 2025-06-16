'use server'
import { createSupabaseClient } from "../supabase"

export const SaveProductToSupabase = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const products: Product[] = await response.json();
    const supabase = createSupabaseClient();
    for (const { id, title, price, description, category, image } of products) {
        const { error } = await supabase.from('products').insert({
            product_id: id,
            title: title,
            price: price,
            description: description,
            category: category,
            image: image
        }).select();
        if (error) throw new Error(error.message);
    }
}

export const getProducts = async () => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw new Error(error.message);
    return data;
}