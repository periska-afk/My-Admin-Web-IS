import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useProducts } from "../../utils/ProductContext";

export default function ProductsPage() {
  const { deleteProduct, getProducts, getCategories } = useProducts();

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [page, setPage] = useState(1);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const {
    data: productResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", page, searchCategory, searchKeyword, stockFilter],
    queryFn: () =>
      getProducts({
        page,
        limit: 10,
        category_id: searchCategory,
        keyword: searchKeyword,
        stock_status: stockFilter,
      }),
  });

  const products = productResponse?.data ?? [];
  const lastPage = productResponse?.meta?.last_page ?? 1;

  const handleSearch = () => {
    setPage(1);
    setSearchKeyword(keyword);
    setSearchCategory(category);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin ingin menghapus produk ini?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct.mutateAsync(id);
      window.alert("Produk berhasil dihapus.");
    } catch (error) {
      window.alert("Terjadi kesalahan saat menghapus produk.");
    }
  };

  if (isLoading) {
    return <div className="p-6 text-slate-500">Memuat produk...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Gagal memuat produk.</div>;
  }

  const inputStyle =
    "border border-slate-300 rounded-lg p-2.5 bg-white text-slate-700 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400";

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Manajemen Produk
        </h1>

        <Link
          to="/admin/products/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition"
        >
          + Tambah Produk
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mb-6">
        <h2 className="font-semibold text-slate-700 mb-4">
          Pencarian dan Filter
        </h2>

        <div className="flex flex-wrap gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputStyle}
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.category}
              </option>
            ))}
          </select>

          <select
            value={stockFilter}
            onChange={(e) => {
              setStockFilter(e.target.value);
              setPage(1);
            }}
            className={inputStyle}
          >
            <option value="">Semua Stok</option>
            <option value="tersedia">Stok Tersedia</option>
            <option value="habis">Stok Habis</option>
          </select>

          <input
            type="text"
            placeholder="Cari nama produk..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className={`${inputStyle} flex-1 min-w-48`}
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
          >
            Cari
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <h2 className="font-semibold text-slate-700">
            Daftar Produk
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-600 text-sm">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Gambar</th>
                <th className="p-4">Nama</th>
                <th className="p-4">Harga</th>
                <th className="p-4">Stok</th>
                <th className="p-4">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {products.length > 0 ? (
                products.map((p, index) => (
                  <tr
                    key={p.id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="p-4 text-slate-600">
                      {(page - 1) * 10 + index + 1}
                    </td>

                    <td className="p-4">
                      <img
                        src={p.img_url}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                      />
                    </td>

                    <td className="p-4 font-medium text-slate-700">
                      {p.name}
                    </td>

                    <td className="p-4 text-slate-600">
                      Rp{Number(p.price).toLocaleString("id-ID")}
                    </td>

                    <td className="p-4 text-slate-600">{p.stock}</td>

                    <td className="p-4">
                      <div className="flex gap-3">
                        <Link
                          to={`/admin/edit-product/${p.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-red-500 hover:text-red-700 font-medium"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="p-6 text-center text-slate-500"
                  >
                    Produk tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 p-5 border-t border-slate-200">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${
              page === 1
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Sebelumnya
          </button>

          {Array.from({ length: lastPage }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`border px-3 py-2 rounded-lg text-sm font-medium ${
                  page === pageNumber
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
                }`}
              >
                {pageNumber}
              </button>
            )
          )}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, lastPage))}
            disabled={page === lastPage}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${
              page === lastPage
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Berikutnya
          </button>
        </div>
      </div>
    </div>
  );
}
