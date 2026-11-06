import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useProducts } from "../../utils/ProductContext";

export default function StorePage() {
  const { getProducts } = useProducts();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["store-products"],
    queryFn: () =>
      getProducts({
        page: 1,
        limit: 100,
        category_id: "",
        keyword: "",
        stock_status: "",
      }),
  });

  const products = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <p className="text-slate-600">Memuat produk...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <p className="text-red-600">Gagal memuat produk.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Toko My Admin
        </h1>
        <p className="text-slate-500 mt-1">
          Temukan produk yang kamu butuhkan.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <p className="text-slate-600">
            Belum ada produk yang tersedia.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                src={product.img_url}
                alt={product.name}
                className="w-full h-48 object-cover bg-slate-100"
              />

              <div className="p-4">
                <h2 className="font-semibold text-slate-800">
                  {product.name}
                </h2>

                <p className="text-blue-800 font-bold mt-2">
                  Rp{Number(product.price).toLocaleString("id-ID")}
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Stok: {product.stock}
                </p>

                <Link
                  to={`/product/${product.id}`}
                  className="block text-center bg-blue-800 text-white rounded-lg p-2 mt-4 hover:bg-blue-700 transition-colors"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
