import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

export default function CategoryPage() {
  const queryClient = useQueryClient();
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await apiClient.get("/categories");
      return response.data;
    },
  });

  const saveCategory = useMutation({
    mutationFn: async () => {
      if (editId) {
        return apiClient.put(`/categories/${editId}`, { category });
      }
      return apiClient.post("/categories", { category });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setCategory("");
      setEditId(null);
    },
    onError: (error) => {
      window.alert(error.response?.data?.message || "Kategori gagal disimpan.");
    },
  });

  const deleteCategory = useMutation({
    mutationFn: async (id) => apiClient.delete(`/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      window.alert(error.response?.data?.message || "Kategori gagal dihapus.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category.trim()) return;
    saveCategory.mutate();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        Manajemen Kategori
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-6 max-w-2xl"
      >
        <label className="block text-sm font-medium text-slate-600 mb-2">
          Nama Kategori
        </label>

        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Masukkan nama kategori"
          className="w-full border border-slate-300 rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saveCategory.isPending}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            {saveCategory.isPending
              ? "Menyimpan..."
              : editId
              ? "Simpan Perubahan"
              : "Tambah Kategori"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={() => {
                setCategory("");
                setEditId(null);
              }}
              className="border border-slate-300 text-slate-600 hover:bg-slate-100 px-5 py-2.5 rounded-lg"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <h2 className="font-semibold text-slate-700 p-5 border-b border-slate-200">
          Daftar Kategori
        </h2>

        {isLoading ? (
          <p className="p-5 text-slate-500">Memuat kategori...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-600 text-sm">
                <tr>
                  <th className="p-4">No</th>
                  <th className="p-4">Nama Kategori</th>
                  <th className="p-4">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((item, index) => (
                  <tr
                    key={item.category_id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="p-4 text-slate-600">{index + 1}</td>
                    <td className="p-4 font-medium text-slate-700">
                      {item.category}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setCategory(item.category);
                            setEditId(item.category_id);
                          }}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          disabled={deleteCategory.isPending}
                          onClick={() => {
                            if (window.confirm("Yakin ingin menghapus kategori ini?")) {
                              deleteCategory.mutate(item.category_id);
                            }
                          }}
                          className="text-red-500 hover:text-red-700 font-medium"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {categories.length === 0 && (
                  <tr>
                    <td colSpan="3" className="p-5 text-center text-slate-500">
                      Belum ada kategori.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
