import { useEffect, useState } from "react";
import api from "../../libs/axios";
import toast from "react-hot-toast";

type Kinerja = {
  nama: string;
  jumlahSiswa: number;
  totalNilai: number;
  targetNilai: number;
  progress: string; // persen
};

const KinerjaGuru = () => {
  const [data, setData] = useState<Kinerja[]>([]);
  const [filteredData, setFilteredData] = useState<Kinerja[]>([]);
  const [search, setSearch] = useState("");

  const fetchKinerja = async () => {
    try {
      const res = await api.get("/guru/kinerja");
      const hasil = res.data.data || [];
      setData(hasil);
      setFilteredData(hasil);
    } catch (err) {
      toast.error("Gagal memuat data kinerja guru");
    }
  };

  useEffect(() => {
    fetchKinerja();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    const filtered = data.filter((guru) =>
      guru.nama.toLowerCase().includes(lower)
    );
    setFilteredData(filtered);
  }, [search, data]);

  return (
    <div className="min-h-screen bg-[#f4f4f9] px-4 py-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Kinerja Guru</h2>

      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Cari nama guru..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full max-w-md"
        />
      </div>

      <div className="overflow-x-auto rounded">
        <table className="min-w-full bg-white border border-gray-300 text-left shadow">
          <thead>
            <tr className="bg-blue-900 text-white text-sm">
              <th className="px-4 py-2 border text-center">No</th>
              <th className="px-4 py-2 border text-center">Nama Guru</th>
              <th className="px-4 py-2 border text-center">Jumlah Siswa</th>
              <th className="px-4 py-2 border text-center">Total Nilai</th>
              <th className="px-4 py-2 border text-center">Target</th>
              <th className="px-4 py-2 border text-center">Progress</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  Tidak ada guru yang ditemukan.
                </td>
              </tr>
            ) : (
              filteredData.map((guru, i) => (
                <tr key={i} className="hover:bg-blue-50 text-sm">
                  <td className="px-4 py-2 border text-center">{i + 1}</td>
                  <td className="px-4 py-2 border">{guru.nama}</td>
                  <td className="px-4 py-2 border text-center">
                    {guru.jumlahSiswa}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {guru.totalNilai}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {guru.targetNilai}
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="w-full bg-red-200 h-4 rounded">
                      <div
                        className="bg-green-600 h-4 rounded text-white text-xs text-center"
                        style={{ width: `${guru.progress}%` }}
                      >
                        {guru.progress}%
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KinerjaGuru;
