'use client'
import { PagerComponent } from "@syncfusion/ej2-react-grids"
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense('Ngo9BigBOggjHTQxAR8/V1NNaF1cXGJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWXlfd3ZXRmJZUkJzXUVWYUA=');

const ProductsPager = ({ productsNumber, Products }: ProductsPagerProps) => {
    const searchParams = useSearchParams();
    const initialPage = Number(searchParams.get('page') || '1')
    const start = (initialPage - 1) * 8;
    const end = start + 8;

    const [currentPage, setCurrentPage] = useState(initialPage);
    const pagedProducts = Products.slice(start, end);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);

        window.location.search = `?page=${page}`
    }


    return (

        <section>
            <div className="flex flex-wrap gap-2 items-center justify-center">
                {pagedProducts.map(({ id, title, price, category, description, image }: Product) => (
                    <div key={id} className="flex gap-2 ">
                        <ProductCard id={id} title={title} price={price} category={category} description={description} image={image} />
                    </div>
                ))}
            </div>
            <PagerComponent
                totalRecordsCount={productsNumber}
                pageSize={8}
                currentPage={currentPage}
                click={(args) => handlePageChange(args.currentPage)}
            // cssClass="custom-pager"
            />
        </section>

    )
}

export default ProductsPager