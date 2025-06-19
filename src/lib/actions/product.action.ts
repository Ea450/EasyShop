'use server'
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase"
// all products functions
export const SaveProductToSupabase = async () => {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');
    const products: Product[] = await response.json();
    const supabase = createSupabaseClient();
    for (const { id, title, price, description, category, image } of products) {
        const { error } = await supabase.from('products').insert({
            product_id: id,
            title: title,
            price: price,
            description: description,
            category: category,
            image: Array.isArray(image) ? image[0] : image
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
// favorite functions
export const addToFavorite = async (productId: number) => {
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const { error } = await supabase.from('favorite').insert({
        id: productId,
        user_id: userId,
        product_id: productId,
    });
    if (error) throw new Error(error.message);
}
export const removeFromFavorite = async (product_id: number) => {
    const userId = (await auth()).userId;
    const supabase = createSupabaseClient();
    const { error } = await supabase.from('favorite').delete().eq('id', product_id).eq('user_id', userId)
    if (error) throw new Error(error.message);
}

// cart functions
export const addToCart = async (productId: number) => {
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const { error } = await supabase.from('cart').insert({
        id: productId,
        user_id: userId,
        product_id: productId,
    });
    if (error) throw new Error(error.message);
}