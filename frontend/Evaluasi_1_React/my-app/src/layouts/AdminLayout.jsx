import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-800 text-white p-6">

        <h1 className="text-2xl font-bold mb-8">
          Admin Panel
        </h1>

        <nav className="space-y-3">

          <Link
            to="/admin"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Products
          </Link>

        </nav>

      </aside>

      {/* Konten utama */}
      <main className="ml-64 p-6">

        <Outlet />

      </main>

    </div>
  );
}