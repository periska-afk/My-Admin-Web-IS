import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";

export default function ProductCard({ p }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border border-pink-100 rounded-2xl p-4 
    shadow-sm hover:shadow-lg transition-shadow">
      
      {/* Gambar Produk */}
      <div className="w-full h-48 bg-pink-50 rounded-xl overflow-hidden mb-4">
        <img
          src={p.img}
          alt={p.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Nama Produk */}
      <h2 className="font-semibold text-lg text-gray-800">
        {p.name}
      </h2>

      {/* Kategori */}
      <p className="text-sm text-gray-500 mt-1">
        {p.category_name}
      </p>

      {/* Harga */}
      <p className="text-pink-600 font-bold mt-2">
        Rp {p.price.toLocaleString("id-ID")}
      </p>

      {/* Rating */}
      <p className="text-yellow-500 mt-1">
        ⭐ {p.rating}/5
      </p>

      {/* Stok */}
      <p className="text-sm text-gray-500 mt-1">
        Stok: {p.stock}
      </p>

      {/* Link Detail */}
      <Link
        to={`/product/${p.slug}`}
        state={p}
        className="text-pink-600 hover:text-pink-700 hover:underline mt-3 block"
      >
        Lihat Detail
      </Link>

      {/* Tombol Keranjang */}
      <button
        onClick={() => addToCart(p)}
        className="w-full mt-3 px-4 py-2 bg-pink-500 text-white rounded-xl
         hover:bg-pink-600 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}