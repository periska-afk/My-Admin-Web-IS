export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          About
        </h1>
        <p className="text-slate-500 mt-1">
          Informasi mengenai aplikasi My Admin.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-blue-800 mb-3">
          My Admin App
        </h2>

        <p className="text-slate-600 leading-relaxed">
          My Admin merupakan aplikasi web untuk mengelola data produk dan
          kategori toko. Aplikasi ini menggunakan React sebagai frontend
          dan Laravel REST API sebagai backend.
        </p>
      </div>
    </div>
  );
}
