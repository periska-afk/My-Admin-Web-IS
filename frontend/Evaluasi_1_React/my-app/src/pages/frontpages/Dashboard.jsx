import { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { products } from "../../utils/data";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = products.filter((item) => {
    const keywords = search.toLowerCase().trim().split(/\s+/);

    const productText = `
      ${item.name}
      ${item.category_name}
    `.toLowerCase();

    const matchSearch =
      search.trim() === "" ||
      keywords.every((keyword) =>
        productText.includes(keyword)
      );

    const matchCategory =
      category === "All" ||
      item.category_name === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-7xl mx-auto">

      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="bg-pink-50 border border-pink-100 rounded-3xl p-8 md:p-12 mb-10 shadow-sm">
        <p className="text-pink-500 font-semibold mb-2">
          GLOW WITH CONFIDENCE ✨
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          GlowSkin
        </h1>

        <p className="text-xl md:text-2xl font-medium text-gray-700 mt-2">
          Simple skincare for your everyday glow.
        </p>

        <p className="text-gray-600 mt-4 max-w-2xl">
          Temukan berbagai produk skincare untuk membantu
          merawat kulitmu setiap hari, mulai dari cleanser,
          toner, serum, hingga sunscreen.
        </p>
      </section>

      {/* =========================
          SEARCH SECTION
      ========================= */}
      <div className="bg-white border border-pink-100 rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div className="w-full md:max-w-xl">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cari Produk
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 text-lg">
                🔍
              </span>

              <input
                type="text"
                placeholder="Cari produk atau kategori..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border-2 border-pink-200 rounded-xl pl-11 pr-12 py-3 bg-pink-50/30 text-gray-700 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Menampilkan{" "}
            <span className="font-semibold text-pink-600">
              {filteredProducts.length}
            </span>{" "}
            produk
          </p>
        </div>
      </div>

      {/* =========================
          FILTER KATEGORI
      ========================= */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Kategori Produk
        </p>

        <div className="flex gap-2 flex-wrap">
          {[
            "All",
            "Cleanser",
            "Toner",
            "Serum",
            "Sunscreen",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-5 py-2 rounded-full border transition-colors ${
                category === item
                  ? "bg-pink-500 text-white border-pink-500 shadow-sm"
                  : "bg-white text-gray-700 border-pink-200 hover:bg-pink-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* =========================
          PRODUCT SECTION
      ========================= */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-800">
          Produk GlowSkin
        </h2>

        <p className="text-gray-500 mt-1">
          Pilih produk sesuai kebutuhan kulitmu.
        </p>
      </div>

      {/* =========================
          CONDITIONAL RENDERING
      ========================= */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              p={item}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-pink-100 shadow-sm">
          <p className="text-gray-500">
            Produk tidak ditemukan.
          </p>

          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
            className="mt-4 px-5 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600"
          >
            Tampilkan Semua Produk
          </button>
        </div>
      )}
    </div>
  );
}