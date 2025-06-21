'use client'
import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import ProductCard from "./ProductCard";
import ReactPaginate from "react-paginate";



const ProductsPager = ({ Products }: ProductsPagerProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialPage = Number(searchParams.get('page') || '1')
    const start = (initialPage - 1) * 6;
    const end = start + 6;

    const [currentPage, setCurrentPage] = useState(initialPage);
    const pagedProducts = Products.slice(start, end);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        router.push(`?page=${page}`);
    }


    return (

        <section>
            <div className="flex flex-wrap gap-2 items-center justify-center">
                {pagedProducts.map(({ id, title, price, category, description, image, loved }: Product) => (
                    <div key={id} className="flex gap-2 ">
                        <ProductCard id={id} title={title} price={price} category={category} description={description} image={image} loved={loved} />
                    </div>
                ))}
            </div>
            <ReactPaginate
                pageCount={10}
                pageRangeDisplayed={10}
                onPageChange={(args) => handlePageChange(args.selected + 1)}
                containerClassName="flex space-x-4"
                activeClassName="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                className="flex items-center justify-center mt-4 space-x-4 cursor-pointer"
            />

        </section>

    )
}

export default ProductsPager