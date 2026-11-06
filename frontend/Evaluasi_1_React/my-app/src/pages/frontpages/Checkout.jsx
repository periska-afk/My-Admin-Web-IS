import { useState } from "react";
import { useCart } from "../../utils/CartContext";

export default function Checkout() {
  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("COD");
  const [success, setSuccess] = useState(false);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const shippingCost = 10000;
  const totalPrice = subtotal + shippingCost;

  const handleOrder = () => {
    if (!name || !phone || !address) {
      alert("Lengkapi informasi pengiriman terlebih dahulu.");
      return;
    }

    setSuccess(true);
    clearCart();
  };

  {/* =========================
      PESANAN BERHASIL
  ========================= */}
  if (success) {
    return (
      <div className="max-w-2xl mx-auto py-16">
        <div className="bg-pink-50 border border-pink-100 rounded-3xl p-10 text-center shadow-sm">

          <div className="text-5xl mb-5">
            ✨
          </div>

          <h1 className="text-3xl font-bold text-pink-600 mb-3">
            Pesanan Berhasil!
          </h1>

          <p className="text-gray-600 mb-5">
            Terima kasih, {name}. Pesanan kamu berhasil dibuat.
          </p>

          <div className="bg-white border border-pink-100 rounded-2xl p-4">
            <p className="text-sm text-gray-500">
              Metode pembayaran
            </p>

            <p className="font-semibold text-gray-800 mt-1">
              {payment}
            </p>
          </div>

        </div>
      </div>
    );
  }

  {/* =========================
      KERANJANG KOSONG
  ========================= */}
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <div className="bg-pink-50 border border-pink-100 rounded-3xl p-10 shadow-sm">

          <div className="text-5xl mb-4">
            🛍️
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Keranjang Kosong
          </h1>

          <p className="text-gray-500">
            Tidak ada produk yang bisa diproses.
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">

      {/* =========================
          HEADER
      ========================= */}
      <div className="mb-8">
        <p className="text-pink-500 font-semibold mb-1">
          COMPLETE YOUR ORDER ✨
        </p>

        <h1 className="text-3xl font-bold text-gray-800">
          Checkout Pesanan
        </h1>

        <p className="text-gray-500 mt-1">
          Lengkapi informasi pengiriman dan pilih metode pembayaran.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* =========================
            BAGIAN KIRI
        ========================= */}
        <div className="lg:col-span-2 space-y-6">

          {/* Informasi Pengiriman */}
          <div className="bg-white border border-pink-100 rounded-2xl p-6 shadow-sm">

            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Informasi Pengiriman
            </h2>

            <div className="space-y-5">

              {/* Nama */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Nama Penerima
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama penerima"
                  className="w-full border-2 border-pink-100 rounded-xl px-4 py-3 bg-pink-50/20 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
                />
              </div>

              {/* Nomor HP */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Nomor HP / WhatsApp
                </label>

                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Masukkan nomor HP"
                  className="w-full border-2 border-pink-100 rounded-xl px-4 py-3 bg-pink-50/20 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
                />
              </div>

              {/* Alamat */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Alamat Lengkap
                </label>

                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Masukkan alamat lengkap"
                  rows="4"
                  className="w-full border-2 border-pink-100 rounded-xl px-4 py-3 bg-pink-50/20 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition resize-none"
                />
              </div>

            </div>
          </div>

          {/* =========================
              METODE PEMBAYARAN
          ========================= */}
          <div className="bg-white border border-pink-100 rounded-2xl p-6 shadow-sm">

            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Metode Pembayaran
            </h2>

            <div className="space-y-3">

              {/* COD */}
              <label
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${
                  payment === "COD"
                    ? "border-pink-400 bg-pink-50"
                    : "border-gray-200 hover:border-pink-200"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={payment === "COD"}
                  onChange={(e) => setPayment(e.target.value)}
                  className="accent-pink-500"
                />

                <div>
                  <p className="font-medium text-gray-800">
                    COD
                  </p>

                  <p className="text-sm text-gray-500">
                    Bayar di tempat
                  </p>
                </div>
              </label>

              {/* Transfer Bank */}
              <label
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${
                  payment === "Transfer Bank"
                    ? "border-pink-400 bg-pink-50"
                    : "border-gray-200 hover:border-pink-200"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="Transfer Bank"
                  checked={payment === "Transfer Bank"}
                  onChange={(e) => setPayment(e.target.value)}
                  className="accent-pink-500"
                />

                <div>
                  <p className="font-medium text-gray-800">
                    Transfer Bank
                  </p>

                  <p className="text-sm text-gray-500">
                    Pembayaran melalui transfer bank
                  </p>
                </div>
              </label>

              {/* E-Wallet */}
              <label
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${
                  payment === "E-Wallet"
                    ? "border-pink-400 bg-pink-50"
                    : "border-gray-200 hover:border-pink-200"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="E-Wallet"
                  checked={payment === "E-Wallet"}
                  onChange={(e) => setPayment(e.target.value)}
                  className="accent-pink-500"
                />

                <div>
                  <p className="font-medium text-gray-800">
                    E-Wallet
                  </p>

                  <p className="text-sm text-gray-500">
                    Pembayaran melalui dompet digital
                  </p>
                </div>
              </label>

            </div>
          </div>
        </div>

        {/* =========================
            RINGKASAN PESANAN
        ========================= */}
        <div className="bg-pink-50 border border-pink-100 rounded-2xl p-6 h-fit shadow-sm">

          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Ringkasan Pesanan
          </h2>

          <div className="space-y-4">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3"
              >

                <div className="flex items-center gap-3 min-w-0">

                  <div className="w-14 h-14 bg-white rounded-xl overflow-hidden shrink-0">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium text-gray-800 truncate">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {item.qty} × Rp{" "}
                      {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>

                </div>

                <p className="font-medium text-gray-800 whitespace-nowrap">
                  Rp{" "}
                  {(item.price * item.qty).toLocaleString(
                    "id-ID"
                  )}
                </p>

              </div>
            ))}

          </div>

          {/* Harga */}
          <div className="border-t border-pink-200 mt-6 pt-4 space-y-3">

            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>

              <span>
                Rp {subtotal.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Ongkos Kirim</span>

              <span>
                Rp {shippingCost.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="border-t border-pink-200 pt-4 flex justify-between items-center">

              <span className="font-bold text-gray-800">
                Total Bayar
              </span>

              <span className="text-xl font-bold text-pink-600">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>

            </div>
          </div>

          {/* Tombol */}
          <button
            onClick={handleOrder}
            className="w-full mt-6 bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition-colors shadow-sm"
          >
            Buat Pesanan
          </button>

        </div>
      </div>
    </div>
  );
}