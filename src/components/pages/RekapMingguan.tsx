import { useState, useEffect } from "react";
import api from "../../libs/axios";
import Button from "../fragments/Button";

interface SiswaRekap {
  id: number;
  nama: string;
  jumlahNilai: number;
  rataRata: number;
}

const TabRekapMingguan = ({ onLihatRekap, onCetakLaporan }: {
  onLihatRekap: (siswaId: number) => void;
  onCetakLaporan: (siswaId: number) => void;
}) => {
  const [dataSiswa, setDataSiswa] = useState<SiswaRekap[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/rekap/mingguan");
        setDataSiswa(data);
      } catch (err) {
        console.error("Gagal mengambil data rekap mingguan:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full px-6 py-4 shadow rounded-lg">
      <h2 className="text-xl text-center font-semibold mb-4">Rekap Penilaian Mingguan</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="border px-4 py-2 text-center">No</th>
              <th className="border px-4 py-2 text-center">Nama Siswa</th>
              <th className="border px-4 py-2 text-center">Jumlah Nilai</th>
              <th className="border px-4 py-2 text-center">Rata-rata</th>
              <th className="border px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataSiswa.map((siswa, index) => (
              <tr key={siswa.id}>
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2">{siswa.nama}</td>
                <td className="border px-4 py-2 text-center">{siswa.jumlahNilai}</td>
                <td className="border px-4 py-2 text-center">{siswa.rataRata.toFixed(1)}</td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <Button
                    className="text-blue-600 hover:underline"
                    onClick={() => onLihatRekap(siswa.id)}
                  >
                    🔍 Lihat Rekap
                  </Button>
                  <Button
                    className="text-green-600 hover:underline"
                    onClick={() => onCetakLaporan(siswa.id)}
                  >
                    🖨️ Cetak Laporan
                  </Button>
                </td>
              </tr>
            ))}
            {dataSiswa.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Tidak ada data rekap mingguan ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabRekapMingguan;
