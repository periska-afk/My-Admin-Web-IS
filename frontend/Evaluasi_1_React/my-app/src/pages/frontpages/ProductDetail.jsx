import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useProducts } from "../../utils/ProductContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { getProductById } = useProducts();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product-detail", id],
    queryFn: () => getProductById(id),
  });

  const p = product?.data ?? product;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !review.trim()) return;

    setReviews([
      ...reviews,
      {
        id: Date.now(),
        rating,
        review,
      },
    ]);

    setRating(0);
    setReview("");
  };

  if (isLoading) {
    return <p className="p-6 text-slate-600">Memuat produk...</p>;
  }

  if (isError || !p) {
    return <p className="p-6 text-slate-600">Produk tidak ditemukan.</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <Link
        to="/store"
        className="text-blue-800 hover:text-blue-600 hover:underline"
      >
        ← Kembali ke Toko
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <img
            src={p.img_url}
            alt={p.name}
            className="w-full h-80 object-contain"
          />

          <h1 className="text-2xl font-bold text-slate-800 mt-4">
            {p.name}
          </h1>

          <p className="text-2xl font-bold text-blue-800 mt-3">
            Rp{Number(p.price).toLocaleString("id-ID")}
          </p>

          <p className="text-slate-600 mt-3">
            Stok tersedia: {p.stock}
          </p>

          <p className="text-slate-600 mt-3">
            {p.description || "Belum ada deskripsi produk."}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            User Reviews
          </h2>

          {reviews.length === 0 ? (
            <p className="text-slate-500">Belum ada review.</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((r) => (
                <li
                  key={r.id}
                  className="border border-slate-200 rounded-lg p-4"
                >
                  <div className="text-yellow-500 mb-2">
                    {"★".repeat(r.rating)}
                    <span className="text-gray-300">
                      {"★".repeat(5 - r.rating)}
                    </span>
                  </div>
                  <p className="text-slate-700">{r.review}</p>
                </li>
              ))}
            </ul>
          )}

          <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-4">
            Berikan Review
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-700 mb-2">
                Rating:
              </label>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl ${
                      rating >= star ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Tulis pengalaman Anda..."
            />

            <button
              type="submit"
              className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
