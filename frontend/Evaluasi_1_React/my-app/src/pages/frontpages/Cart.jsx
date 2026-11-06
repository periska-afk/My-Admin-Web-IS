import { useCart } from "../../utils/CartContext";

export default function CartPage() {
  const { cart, updateQty, removeFromCart } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16">
        <div className="bg-pink-50 border border-pink-100 rounded-3xl p-10 text-center shadow-sm">
          <div className="text-5xl mb-4">
            🛍️
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Keranjang Kamu Kosong
          </h1>

          <p className="text-gray-500">
            Belum ada produk GlowSkin yang ditambahkan ke keranjang.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <p className="text-pink-500 font-semibold mb-1">
          GLOW YOUR WAY ✨
        </p>

        <h1 className="text-3xl font-bold text-gray-800">
          Keranjang Belanja
        </h1>

        <p className="text-gray-500 mt-1">
          Periksa kembali produk yang ingin kamu beli.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Daftar Produk */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-pink-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                {/* Informasi Produk */}
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-pink-50 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="font-semibold text-gray-800">
                      {item.name}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.category_name}
                    </p>

                    <p className="text-pink-600 font-bold mt-2">
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                {/* Quantity dan Delete */}
                <div className="flex items-center justify-between sm:justify-end gap-3">

                  <div className="flex items-center border border-pink-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() =>
                        updateQty(item.id, item.qty - 1)
                      }
                      className="w-9 h-9 bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors"
                    >
                      −
                    </button>

                    <span className="w-10 text-center font-medium text-gray-700">
                      {item.qty}
                    </span>

                    <button
                      onClick={() =>
                        updateQty(item.id, item.qty + 1)
                      }
                      className="w-9 h-9 bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-3 py-2 text-sm text-red-500 border border-red-100 rounded-xl hover:bg-red-50 transition-colors"
                  >
                    Hapus
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ringkasan */}
        <div className="bg-pink-50 border border-pink-100 rounded-2xl p-6 h-fit shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Ringkasan Belanja
          </h2>

          <div className="flex justify-between text-gray-600 mb-3">
            <span>Total Produk</span>

            <span>
              {cart.reduce(
                (total, item) => total + item.qty,
                0
              )}{" "}
              item
            </span>
          </div>

          <div className="border-t border-pink-200 pt-4 flex justify-between items-center">
            <span className="font-semibold text-gray-700">
              Total
            </span>

            <span className="text-xl font-bold text-pink-600">
              Rp {totalPrice.toLocaleString("id-ID")}
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Ongkos kirim akan dihitung pada halaman checkout.
          </p>
        </div>

      </div>
    </div>
  );
}