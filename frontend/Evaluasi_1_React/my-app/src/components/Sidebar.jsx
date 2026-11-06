
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const menuClass =
    "block p-3 rounded-lg text-slate-700 hover:bg-blue-100 hover:text-blue-800 transition";

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");

    if (confirmLogout) {
      navigate("/");
    }
  };

  return (
    <div
      className={`${
        sidebarOpen ? "block" : "hidden"
      } md:block w-64 bg-slate-50 border-r border-slate-200 shadow-sm`}
    >
      <div className="p-4 font-bold text-xl text-blue-900 border-b border-slate-200">
        My Admin
      </div>

      <nav className="flex flex-col p-4 space-y-2">
        <Link to="/admin/dashboard" className={menuClass}>
          Dashboard
        </Link>

        <Link to="/admin/products" className={menuClass}>
          Products
        </Link>

        <Link to="/store" className={menuClass}>
          Lihat Toko
        </Link>

        <Link to="/admin/products/create" className={menuClass}>
          Input Data
        </Link>

        <Link to="/admin/categories" className={menuClass}>
          Input Category
        </Link>

        <Link to="/admin/about" className={menuClass}>
          About
        </Link>

        <button
          onClick={handleLogout}
          className="text-left p-3 rounded-lg text-red-700 hover:bg-red-100 transition"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
