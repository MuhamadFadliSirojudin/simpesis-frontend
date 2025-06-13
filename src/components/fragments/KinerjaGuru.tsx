import { useEffect, useState } from "react";
import api from "../../libs/axios";
import toast from "react-hot-toast";

type Kinerja = {
  id: number;
  nama: string;
  totalSiswa: number;
  siswaDinilai: number;
  persentase: number;
};

const KinerjaGuru = () => {
  const [data, setData] = useState<Kinerja[]>([]);

  const fetchKinerja = async () => {
    try {
      const res = await api.get("/guru/kinerja");
      setData(res.data);
    } catch (err) {
      toast.error("Gagal memuat data kinerja guru");
    }
  };

  useEffect(() => {
    fetchKinerja();
  }, []);

  return (
    <div>
      <h2 className="text-xl text-center font-semibold mb-4">Kinerja Guru</h2>

      <table className="min-w-full bg-white border border-gray-200 text-left">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="px-4 py-2 text-center">Nama Guru</th>
            <th className="px-4 py-2 text-center">Jumlah Siswa</th>
            <th className="px-4 py-2 text-center">Siswa Dinilai</th>
            <th className="px-4 py-2 text-center">Progress</th>
          </tr>
        </thead>
        <tbody>
          {data.map((guru) => (
            <tr key={guru.id} className="hover:bg-blue-50 p-4 transition">
              <td className="px-4 py-2">{guru.nama}</td>
              <td className="px-4 py-2">{guru.totalSiswa}</td>
              <td className="px-4 py-2">{guru.siswaDinilai}</td>
              <td className="px-4 py-2">
                <div className="w-full bg-red-200 h-4 rounded">
                  <div
                    className="bg-green-600 h-4 rounded text-white text-xs text-center"
                    style={{ width: `${guru.persentase}%` }}
                  >
                    {guru.persentase}%
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KinerjaGuru;
