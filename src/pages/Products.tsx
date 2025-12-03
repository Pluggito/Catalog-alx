import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { Product } from "../types/product";
import Title from "../components/Title";
import { ProductCard } from "../components/ProductCard";
import { addToCart } from "../redux/cartSlice";
import { Star } from "lucide-react";
import type { RootState } from "../redux/store";

const Products = () => {
  const { productId } = useParams<{ productId?: string }>();
  const prodId = Number(productId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products: Product[] = useSelector((state: RootState) => state.products.items ?? []);
  const product = products.find((p) => p.id === prodId);

  const [quantity, setQuantity] = useState<number>(() => 1);

  // Related products (same category, exclude current)
  const related = useMemo(() => {
    if (!product) return [];
    return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [products, product]);

  const handleAddToCart = () => {
    if (!product) return;
    // dispatch addToCart quantity times (cart slice adds one per call)
    for (let i = 0; i < Math.max(1, quantity); i++) {
      dispatch(addToCart(product));
    }
    // optional: navigate to cart or show feedback
    navigate("/cart");
  };

  if (!products || products.length === 0) {
    return <div className="p-8 text-center">Loading product…</div>;
  }

  if (!product) {
    return <div className="p-8 text-center text-gray-600">Product not found.</div>;
  }

  // Safe fallbacks to avoid runtime errors if some fields are missing
  const safePrice = Number(product.price || 0);
  const priceText = safePrice.toLocaleString("en-NG", { maximumFractionDigits: 0 });
  const safeRating = typeof product.rating === "number" ? product.rating.toFixed(1) : "N/A";
  const imageSrc = product.image || "/placeholder.png";

  return (
    <div className="border-t pt-8 px-4">
      <div className="text-2xl mb-4">
        <Title text1={"PRODUCT "} text2={"DETAILS"} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Images */}
        <div className="flex-1">
          <img src={imageSrc} alt={product.name || "product"} className="w-full h-auto object-cover rounded" />
        </div>

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium mb-2">{product.name || "Unnamed product"}</h1>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-semibold">₦{priceText}</span>
            <span className="text-sm text-gray-600">· {product.category ?? "Uncategorized"}</span>
            <span className="ml-auto text-sm text-gray-600"><Star className="fill-amber-400" strokeOpacity={0}/>Rating: {safeRating}</span>
          </div>

          <p className="text-gray-700 mb-6">{product.description ?? "No description available."}</p>

          <div className="flex items-center gap-3 mb-6">
            <label className="text-sm">Quantity</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
              className="w-20 border px-2 py-1 rounded"
              title="Select quantity"
              placeholder="Quantity"
            />
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-5 py-2 rounded text-sm ml-4"
            >
              ADD TO CART
            </button>
          </div>

          <hr className="mb-6" />
          <div className="text-sm text-gray-500">
            <p>100% Original Product</p>
            <p>Cash on delivery available</p>
            <p>Easy return and exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-medium mb-4">Related products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((rp) => (
              <ProductCard
                key={rp.id}
                product={rp}
                onClick={(id) => navigate(`/product/${id}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;