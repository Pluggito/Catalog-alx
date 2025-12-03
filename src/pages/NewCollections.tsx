import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { Product } from "../types/product";
import { ProductCard } from "../components/ProductCard";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";

const NewCollections = () => {
    const navigate = useNavigate();

    const products: Product[] = useSelector(
        (state: RootState) => state.products.items
    );

    const handleProductClick = (id: number) => {
        navigate(`/product/${id}`);
    };

    const productsToShow = useMemo(() => products.slice(0, 8), [products]);

    return (
        <div className="px-4 py-6">
            <header className="text-center py-8 text-3xl">
                <Title text1={"NEW "} text2={"COLLECTIONS"} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700">
                    Discover our latest arrivals featuring trendy designs and premium quality.
                </p>
            </header>

            {productsToShow.length === 0 ? (
                <p className="text-gray-600">No new products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {productsToShow.map((p) => (
                        <ProductCard key={p.id} product={p} onClick={handleProductClick} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewCollections;
