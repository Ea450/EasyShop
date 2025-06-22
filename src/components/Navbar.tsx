'use client'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import Heart from "./icons/Heart"
import Cart from "./icons/Cart"
import { usePathname, useRouter } from "next/navigation"

const Navbar = () => {
    const router = useRouter()
    const pathname = usePathname();
    return (
        <div>
            <header className="flex items-center justify-between shadow-md min-h-[67px] shadow-[#eee] bg-white md:py-3 py-1.5 lg:px-16 md:px-8 px-3 relative z-20 overflow-x-clip">
                <Link href='/products' className="flex items-center">
                    <Image src='/images/easyshop2.png' alt="logo" width={36} height={36} />
                    <p className="text-bold text-yellow-700">EasyShop</p>
                </Link>
                <div className="flex justify-end items-center p-4 gap-4 h-16">
                    {(pathname !== '/' && pathname !== '/sign-in') && (
                        <div className="flex justify-end items-center p-4 gap-4 h-16">
                            <div onClick={() => router.push('/favorite')} >
                                <Heart />
                            </div>
                            <div onClick={() => router.push('/cart')} >
                                <Cart />
                            </div>
                        </div>
                    )}
                    <SignedOut>
                        <SignInButton />
                        <SignUpButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </header>
        </div>
    )
}

export default Navbar
