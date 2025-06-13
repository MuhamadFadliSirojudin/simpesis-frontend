import { useEffect, useState } from "react";
import api from "../../libs/axios";
import toast from "react-hot-toast";

type Kinerja = {
  nama: string;
  jumlahSiswa: number;
  totalNilai: number;
  targetNilai: number;
  progress: string; // dalam persen, misal "66.7"
};

const KinerjaGuru = () => {
  const [data, setData] = useState<Kinerja[]>([]);

  const fetchKinerja = async () => {
    try {
      const res = await api.get("/guru/kinerja");
      setData(res.data.data || []);
    } catch (err) {
      toast.error("Gagal memuat data kinerja guru");
    }
  };

  useEffect(() => {
    fetchKinerja();
  }, []);

  return (
    <div className="min-h-[100vh] h-full w-full flex flex-col items-center gap-5 justify-around bg-[#f4f4f9] p-10 px-4 py-6">
      <div className="overflow-x-auto rounded w-full"></div>
      <h2 className="text-xl text-center font-semibold mb-6">Kinerja Guru</h2>

      <table className="min-w-full bg-white border border-gray-300 text-left">
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
          {data.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500">
                Tidak ada data guru ditemukan.
              </td>
            </tr>
          ) : (
            data.map((guru, i) => (
              <tr key={i} className="hover:bg-blue-50 text-sm">
                <td className="px-4 py-2 border text-center">{i + 1}</td>
                <td className="px-4 py-2 border">{guru.nama}</td>
                <td className="px-4 py-2 border text-center">{guru.jumlahSiswa}</td>
                <td className="px-4 py-2 border text-center">{guru.totalNilai}</td>
                <td className="px-4 py-2 border text-center">{guru.targetNilai}</td>
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
  );
};

export default KinerjaGuru;
