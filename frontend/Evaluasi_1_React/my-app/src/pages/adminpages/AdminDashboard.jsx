import { useQuery } from "@tanstack/react-query";
import { useProducts } from "../../utils/ProductContext";

export default function AdminDashboard() {
  const { getProducts, getCategories } = useProducts();

  const { data: productResponse, isLoading: loadingProducts } = useQuery({
    queryKey: ["dashboard-products"],
    queryFn: () =>
      getProducts({
        page: 1,
        limit: 1000,
        category_id: "",
        keyword: "",
        stock_status: "",
      }),
  });

  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const products = productResponse?.data ?? [];
  const totalProducts = productResponse?.meta?.total ?? products.length;
  const totalCategories = categories.length;
  const outOfStock = products.filter(
    (product) => Number(product.stock) <= 0
  ).length;
  const availableStock = products.filter(
    (product) => Number(product.stock) > 0
  ).length;

  const cards = [
    { title: "Total Produk", value: totalProducts },
    { title: "Total Kategori", value: totalCategories },
    { title: "Produk Tersedia", value: availableStock },
    { title: "Stok Habis", value: outOfStock },
  ];

  if (loadingProducts || loadingCategories) {
    return (
      <div className="p-6 text-slate-500">
        Memuat data dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Ringkasan informasi aplikasi My Admin.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200"
          >
            <p className="text-sm font-medium text-slate-500">
              {card.title}
            </p>
            <h2 className="text-3xl font-bold text-blue-700 mt-3">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-3">
          Informasi Aplikasi
        </h2>
        <p className="text-slate-600 leading-relaxed">
          Selamat datang di My Admin. Aplikasi ini digunakan untuk
          mengelola data produk dan kategori toko.
        </p>
      </div>
    </div>
  );
}
