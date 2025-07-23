import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../libs/axios";
import GetReport from "./GetReport";

interface Nilai {
  id: number;
  nilai: number;
  siswa: { nama: string };
  modul: { nama: string };
  createdAt: string;
}

const PenilaianMingguan = () => {
  const { siswaId } = useParams();
  const [rekap, setRekap] = useState<Record<string, { total: number; jumlah: number }>>({});
  const [namaSiswa, setNamaSiswa] = useState("");

  useEffect(() => {
    const fetchNilai = async () => {
      try {
        const { data } = await api.get(`/nilai?siswaId=${siswaId}`);
        const grouped: Record<string, { total: number; jumlah: number }> = {};

        data?.forEach((n: Nilai) => {
          const modul = n.modul?.nama || "Tidak diketahui";
          if (!grouped[modul]) grouped[modul] = { total: 0, jumlah: 0 };
          grouped[modul].total += n.nilai;
          grouped[modul].jumlah += 1;
        });

        setRekap(grouped);

        if (data?.length > 0) {
          setNamaSiswa(data[0]?.siswa?.nama);
        }
      } catch (err) {
        console.error("Gagal mengambil data nilai:", err);
      }
    };

    fetchNilai();
  }, [siswaId]);

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Rekap Penilaian Mingguan</h2>
      <p className="text-sm mb-4 text-gray-700">Siswa: <strong>{namaSiswa}</strong></p>

      {Object.keys(rekap).length === 0 && (
        <p className="text-sm text-gray-500 mb-4">Belum ada data penilaian untuk siswa ini.</p>
      )}

      {Object.keys(rekap).length > 0 && (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Modul</th>
              <th className="border p-2 text-center">Jumlah Penilaian</th>
              <th className="border p-2 text-center">Total Nilai</th>
              <th className="border p-2 text-center">Rata-rata</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(rekap).map(([modul, info], i) => (
              <tr key={i}>
                <td className="border px-2 py-1">{modul}</td>
                <td className="border px-2 py-1 text-center">{info.jumlah}</td>
                <td className="border px-2 py-1 text-center">{info.total}</td>
                <td className="border px-2 py-1 text-center">
                  {(info.total / info.jumlah).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-6">
        <h3 className="text-md font-semibold mb-2">Cetak Laporan Mingguan</h3>
        <GetReport siswaId={siswaId as string} kategori="mingguan" />
      </div>
    </div>
  );
};

export default PenilaianMingguan;
