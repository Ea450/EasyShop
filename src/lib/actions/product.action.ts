'use server'
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase"
import { revalidatePath } from "next/cache";
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
            image: Array.isArray(image) ? image[0] : image,
            loved: false,
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
    await supabase.from('products').update({
        loved: true
    }).eq('id', productId)
    if (error) throw new Error(error.message);

}
export const removeFromFavorite = async (productId: number, path?: string) => {
    const userId = (await auth()).userId;
    const supabase = createSupabaseClient();
    const { error } = await supabase.from('favorite').delete().eq('id', productId).eq('user_id', userId)
    await supabase.from('products').update({
        loved: false
    }).eq('id', productId)
    if (error) throw new Error(error.message);
    if (path) revalidatePath(path);

}
export const getFavoriteProducts = async (userId: string) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from('favorite').select(`products:id (*)`).eq('user_id', userId);
    if (error) throw new Error(error.message);
    return data;
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
export const removeFromCart = async (productId: number, path: string) => {
    const userId = (await auth()).userId;
    const supabase = createSupabaseClient();
    const { error } = await supabase.from('cart').delete().eq('id', productId).eq('user_id', userId)
    await supabase.from('products').update({
        quntity: 1
    }).eq('id', productId)
    if (error) throw new Error(error.message);
    revalidatePath(path);
}
export const getCartProducts = async (userId: string) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from('cart').select(`products:id (*)`).eq('user_id', userId);

    if (error) throw new Error(error.message);
    return data;
}
export const quntityInrcrease = async (productId: number, quntity: number, path: string) => {
    const supabase = createSupabaseClient();
    const { error } = await supabase.from('products').update({
        quntity: quntity + 1
    }).eq('id', productId)
    if (error) throw new Error(error.message)
    revalidatePath(path);

}
export const quntityDercrease = async (productId: number, quntity: number, path: string) => {
    const supabase = createSupabaseClient();
    const { error } = await supabase.from('products').update({
        quntity: quntity - 1
    }).eq('id', productId)
    if (error) throw new Error(error.message)
    revalidatePath(path);

}