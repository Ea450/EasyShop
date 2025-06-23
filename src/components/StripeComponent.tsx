'use client';

import { useState } from "react";

const StripeComponent = ({ totalPrice, cartProducts }: StripeComponentProps) => {
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const tax = totalPrice * 0.30; // Assuming a tax rate of 15%

    const handleCheckout = async () => {
        setCheckoutLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cartProducts }),
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                setError("Stripe session could not be created.");
            }
        } catch (error) {
            setError("An error occurred during checkout.");
            console.error("Checkout error:", error);
        }
        setCheckoutLoading(false);
    };

    return (
        <div className="w-full text-center mt-4 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-yellow-600 mb-4">
                Your Cart Summary
            </h2>
            <div className="w-[300px] bg-white shadow-md rounded-lg p-4 flex justify-center items-center mt-2 flex-col">
                <span className="font-bold text-lg">
                    Your Total Tax: <span className="text-yellow-600">${tax.toFixed(2)}</span>
                </span>
                <span className="font-bold text-lg">
                    Your Total Cash: <span className="text-yellow-600">${totalPrice.toFixed(2)}</span>
                </span>
                <button
                    className="button mt-4"
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                >
                    {checkoutLoading ? "Redirecting..." : "Purchase Now"}
                </button>
                {error && (
                    <div className="text-red-500 mt-2 text-sm">{error}</div>
                )}
            </div>
        </div>
    )
};
export default StripeComponent;   