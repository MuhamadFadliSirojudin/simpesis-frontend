import { useEffect, useState } from "react";
import TambahGuru from "../fragments/TambahGuru";
import api from "../../libs/axios";
import toast from "react-hot-toast";

const Menu = () => {
  const [listGuru, setListGuru] = useState<any[]>([]);

  const fetchGuru = async () => {
    try {
      const res = await api.get("/guru");
      setListGuru(res.data);
    } catch (err) {
      toast.error("Gagal mengambil data guru");
    }
  };

  useEffect(() => {
    fetchGuru();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/guru/${id}`);
      toast.success("Guru berhasil dihapus");
      fetchGuru();
    } catch (err) {
      toast.error("Gagal menghapus guru");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Menu - Tambah Guru</h1>
      <TambahGuru onSuccess={fetchGuru} />

      <h2 className="text-xl font-semibold mt-10 mb-4">Daftar Guru</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">NUPTK</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {listGuru.map((guru) => (
            <tr key={guru.id} className="border-t">
              <td className="px-4 py-2">{guru.nama}</td>
              <td className="px-4 py-2">{guru.username}</td>
              <td className="px-4 py-2">{guru.nuptk}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDelete(guru.id)}
                  className="text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Menu;
