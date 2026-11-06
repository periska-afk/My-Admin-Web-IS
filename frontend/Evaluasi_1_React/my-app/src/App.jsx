import CategoryPage from "./pages/adminpages/CategoryPage";
import StorePage from "./pages/frontpages/StorePage";
import ProductsPage from "./pages/adminpages/ProductsPage";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import AdminLayout from "./pages/AdminLayout";
import AboutPage from "./pages/adminpages/AboutPage";
import ProductForm from "./pages/adminpages/ProductForm";
import ProductEdit from "./pages/adminpages/ProductEdit";

import ProductDetail from "./pages/frontpages/ProductDetail";
import Cart from "./pages/frontpages/Cart.jsx";
import Checkout from "./pages/frontpages/Checkout";

export default function App() {
  return (
    <Routes>
      {/* Halaman utama langsung menampilkan Dashboard Admin */}
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="products/create" element={<ProductForm />} />
        <Route path="edit-product/:id" element={<ProductEdit />} />
      </Route>

      {/* Halaman detail dan transaksi */}
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/store" element={<StorePage />} />

      {/* Alamat dashboard admin lama tetap bisa digunakan */}
      <Route path="/admin" element={<AdminLayout />}>
      <Route path="categories" element={<CategoryPage />} />
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="products" element={<ProductsPage />} />
  <Route path="about" element={<AboutPage />} />
  <Route path="products/create" element={<ProductForm />} />
  <Route path="edit-product/:id" element={<ProductEdit />} />
    </Route>
    </Routes>
  );
}
