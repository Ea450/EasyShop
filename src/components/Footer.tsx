import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (
        <div>

            <footer className="text-white bg-yellow-700 py-4 w-full mt-8 shadow-lg flex justify-center items-center">
                <Link href="/">
                    <Image src={"/images/easyshop.png"} alt="Logo" width={60} height={50} />
                </Link>
                <div className="text-center w-full">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Islam Ahmed. All rights reserved.
                    </p>
                </div>
                <Link href="/https://github.com/Ea450/EasyShop" className="ml-4 text-sm text-white hover:underline">
                    <Image src={"/images/github.png"} alt="github" width={36} height={36} />
                </Link>
            </footer>
        </div>
    )
}

export default Footer