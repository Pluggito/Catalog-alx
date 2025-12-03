import { Star } from 'lucide-react';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onClick: (id: number) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  // safe fallbacks
  const price = Number(product.price || 0);
  const rating = typeof product.rating === "number" ? product.rating.toFixed(1) : "0.0";
  const image = product.image || "/placeholder.png";

  return (
    <div 
      onClick={() => onClick(product.id)}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img 
          src={image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="flex-1 line-clamp-2">{product.name}</h3>
        </div>
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-gray-600">{rating}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-black">₦{price.toLocaleString("en-NG", { maximumFractionDigits: 0 })}</span>
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
}
