import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-05-28.basil',
});

export async function POST(req: NextRequest) {
    const { cartProducts } = await req.json();


    const line_items = cartProducts.map((product: CartProduct) => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: product.title,
                images: [product.image],
            },
            unit_amount: Math.round(product.price * 100),
        },
        quantity: product.quntity ?? 1,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${req.nextUrl.origin}/success`,
        cancel_url: `${req.nextUrl.origin}/cart`,
    });

    return NextResponse.json({ url: session.url });
}