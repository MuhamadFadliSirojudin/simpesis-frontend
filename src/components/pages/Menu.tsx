import { useState } from "react";
import KelolaGuru from "../fragments/KelolaGuru";
import KinerjaGuru from "../fragments/KinerjaGuru";
import KelolaAdmin from "../fragments/KelolaAdmin";

const Menu = () => {
  const [activeTab, setActiveTab] = useState<"tambah" | "kinerja" | "admin">("tambah");

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Menu</h1>

      {/* Tombol Tab */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("tambah")}
          className={`py-2 px-4 rounded ${
            activeTab === "tambah"
              ? "bg-blue-900 text-white hover:bg-blue-800 cursor-pointer"
              : "bg-gray-200 text-black"
          }`}
        >
          Kelola Guru
        </button>
        <button
          onClick={() => setActiveTab("kinerja")}
          className={`py-2 px-4 rounded ${
            activeTab === "kinerja"
              ? "bg-blue-900 text-white hover:bg-blue-800 cursor-pointer"
              : "bg-gray-200 text-black"
          }`}
        >
          Kinerja Guru
        </button>
        <button
          onClick={() => setActiveTab("admin")}
          className={`py-2 px-4 rounded ${
            activeTab === "admin"
              ? "bg-blue-900 text-white hover:bg-blue-800 cursor-pointer"
              : "bg-gray-200 text-black"
          }`}
        >
          Kelola Admin
        </button>
      </div>

      {/* Konten berdasarkan tab aktif */}
      <div className="mt-6">
        {activeTab === "tambah" && <KelolaGuru />}
        {activeTab === "kinerja" && <KinerjaGuru />}
        {activeTab === "admin" && <KelolaAdmin />}
      </div>
    </div>
  );
};

export default Menu;
