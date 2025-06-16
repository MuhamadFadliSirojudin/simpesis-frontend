import { useEffect, useState } from "react";
import api from "../../libs/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Guru = {
  id: number;
  nama: string;
  jumlahSiswa: number;
};

const DaftarGuru = () => {
  const [guruList, setGuruList] = useState<Guru[]>([]);
  const [filtered, setFiltered] = useState<Guru[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchGuru = async () => {
    try {
      const res = await api.get("/guru/daftar"); // Pastikan endpoint ini tersedia
      setGuruList(res.data.data || []);
      setFiltered(res.data.data || []);
    } catch (err) {
      toast.error("Gagal memuat daftar guru");
    }
  };

  const handleSelectGuru = (id: number) => {
    localStorage.setItem("guruId", id.toString()); // ✅ simpan ID ke localStorage
    navigate(`/siswa/${id}`); // arahkan ke halaman siswa
  };


  const handleSearch = (value: string) => {
    setSearch(value);
    const filteredData = guruList.filter((g) =>
      g.nama.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(filteredData);
  };

  useEffect(() => {
    fetchGuru();
  }, []);

  return (
    <div className="min-h-[100vh] h-full w-full flex flex-col items-center gap-5 justify-start bg-[#f4f4f9] p-10">
      <h2 className="text-2xl text-center font-semibold mb-6">Daftar Guru</h2>

      <input
        type="text"
        placeholder="Cari guru..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="border p-2 rounded w-full max-w-md mb-4"
      />

      <table className="min-w-full bg-white border border-gray-200 text-left">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="px-4 py-2 border text-center">No</th>
            <th className="px-4 py-2 border text-center">Nama Guru</th>
            <th className="px-4 py-2 border text-center">Jumlah Siswa</th>
            <th className="px-4 py-2 border text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                Tidak ada guru ditemukan.
              </td>
            </tr>
          ) : (
            filtered.map((guru, i) => (
              <tr key={guru.id} className="hover:bg-blue-50 transition">
                <td className="px-4 py-2 border text-center">{i + 1}</td>
                <td className="px-4 py-2 border">{guru.nama}</td>
                <td className="px-4 py-2 border text-center">{guru.jumlahSiswa}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleSelectGuru(guru.id)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 cursor-pointer"
                  >
                    Lihat Siswa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DaftarGuru;
