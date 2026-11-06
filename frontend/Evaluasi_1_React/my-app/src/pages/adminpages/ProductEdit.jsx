import React, { useState, useEffect } from "react";
import { useProducts } from "../../utils/ProductContext";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductEdit() {
  const { id } = useParams();
  const { updateProduct, getProductById, getCategories } = useProducts();
  const navigate = useNavigate();

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
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        const product = res.data ?? res;

        setFormData({
          name: product.name || "",
          price: product.price ?? "",
          stock: product.stock ?? "",
          description: product.description || "",
          category_id: product.category_id ?? "",
          img: null,
        });

        setCurrentImage(product.img_url || "");
      } catch (err) {
        toast.error("Gagal memuat data produk.");
      }
    };

    fetchProduct();
  }, [id, getProductById]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "img" && value !== null) {
        data.append(key, value);
      }
    });

    if (formData.img instanceof File) {
      data.append("img", formData.img);
    }

    try {
      await updateProduct(id, data);
      toast.success("Produk berhasil diperbarui!");
      navigate("/admin/products");
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        toast.error("Periksa kembali data yang dimasukkan.");
      } else {
        toast.error("Gagal menyimpan produk.");
      }
    }
  };

  const previewImage = formData.img
    ? URL.createObjectURL(formData.img)
    : currentImage;

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-5"
      >
        <h2 className="text-xl font-semibold text-slate-700 border-b border-slate-200 pb-3">
          Edit Produk
        </h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-600">
            Nama Produk
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Masukkan nama produk"
            className="border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-600">
            Kategori
          </label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="border border-slate-300 rounded-lg p-2.5 bg-white outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          >
            <option value="">Pilih Kategori</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category}
              </option>
            ))}
          </select>
          {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id[0]}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-600">
            Harga
          </label>
          <input
            name="price"
            type="number"
            min="0"
            value={formData.price}
            onChange={handleChange}
            placeholder="Masukkan harga"
            className="border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price[0]}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-600">
            Stok
          </label>
          <input
            name="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Masukkan jumlah stok"
            className="border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          />
          {errors.stock && <p className="text-red-500 text-sm">{errors.stock[0]}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-600">
            Deskripsi
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tuliskan deskripsi produk"
            rows="3"
            className="border border-slate-300 rounded-lg p-2.5 resize-none outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-600">
            Gambar Produk
          </label>

          {previewImage && (
            <img
              src={previewImage}
              alt="Preview produk"
              className="w-32 h-32 object-cover rounded-lg border border-slate-200"
            />
          )}

          <div className="flex items-center gap-3 flex-wrap">
            <label className="cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium px-4 py-2 rounded-lg text-sm">
              Pilih File
              <input
                name="img"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleChange}
                className="hidden"
              />
            </label>

            <span className="text-sm text-slate-500">
              {formData.img instanceof File
                ? formData.img.name
                : "Gunakan gambar saat ini atau pilih gambar baru"}
            </span>
          </div>
          {errors.img && <p className="text-red-500 text-sm">{errors.img[0]}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition"
        >
          Update Produk
        </button>
      </form>
    </div>
  );
}
