import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useProducts } from "../../utils/ProductContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ProductForm() {
  const { addProduct, getCategories } = useProducts();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: "",
    description: "",
    img: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      await addProduct(data);
      toast.success("Produk berhasil disimpan!");
      setTimeout(() => navigate("/admin/dashboard"), 1000);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        toast.error("Periksa kembali data yang dimasukkan.");
      } else {
        toast.error("Gagal menyimpan produk.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-5"
      >
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-slate-800">
            Tambah Produk
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Masukkan informasi produk yang ingin ditambahkan.
          </p>
        </div>

        {/* Nama Produk */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Nama Produk
          </label>
          <input
            name="name"
            value={formData.name}
            placeholder="Masukkan nama produk"
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
          )}
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Pilih Kategori
          </label>
          <select
            name="category_id"
            onChange={handleChange}
            value={formData.category_id}
            className="w-full border border-slate-300 rounded-lg p-3 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">-- Pilih Kategori --</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.category}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category_id[0]}
            </p>
          )}
        </div>

        {/* Harga dan Stok */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Harga (Rp)
            </label>
            <input
              name="price"
              type="number"
              min="0"
              value={formData.price}
              placeholder="Contoh: 150000"
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Stok
            </label>
            <input
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              placeholder="Jumlah stok"
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">{errors.stock[0]}</p>
            )}
          </div>
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Deskripsi
          </label>
          <textarea
            name="description"
            value={formData.description}
            placeholder="Tuliskan deskripsi produk"
            onChange={handleChange}
            rows="3"
            className="w-full border border-slate-300 rounded-lg p-3 resize-none outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Gambar Produk */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Gambar Produk
          </label>

          <label className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 border border-blue-200 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-100 transition">
            Pilih File
            <input
              name="img"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleChange}
              className="hidden"
            />
          </label>

          <p className="text-sm text-slate-500 mt-2">
            {formData.img
              ? `File dipilih: ${formData.img.name}`
              : "Belum ada file yang dipilih"}
          </p>

          {formData.img && (
            <img
              src={URL.createObjectURL(formData.img)}
              alt="Preview produk"
              className="mt-3 w-32 h-32 object-cover rounded-lg border"
            />
          )}

          <p className="text-xs text-slate-400 mt-2">
            Format JPG, JPEG, atau PNG.
          </p>

          {errors.img && (
            <p className="text-red-500 text-sm mt-1">{errors.img[0]}</p>
          )}
        </div>

        {/* Tombol Simpan */}
        <button
          type="submit"
          className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 rounded-lg transition"
        >
          Simpan Produk
        </button>
      </form>
    </div>
  );
}
