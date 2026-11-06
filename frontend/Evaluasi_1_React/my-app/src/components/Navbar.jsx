import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";

export default function Navbar() {
  const { totalQty } = useCart();

  return (
    <nav className="bg-pink-50 border-b border-pink-200 shadow-sm px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-pink-600"
        >
          GlowSkin
        </Link>

        {/* Menu Navigasi */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="px-4 py-2 rounded-xl text-gray-700 hover:bg-white hover:text-pink-600 transition-colors"
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="px-4 py-2 rounded-xl text-gray-700 hover:bg-white hover:text-pink-600 transition-colors"
          >
            Keranjang

            {totalQty > 0 && (
              <span className="ml-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                {totalQty}
              </span>
            )}
          </Link>

          <Link
            to="/checkout"
            className="px-4 py-2 rounded-xl text-gray-700 hover:bg-white hover:text-pink-600 transition-colors"
          >
            Checkout
          </Link>
        </div>
      </div>
    </nav>
  );
}