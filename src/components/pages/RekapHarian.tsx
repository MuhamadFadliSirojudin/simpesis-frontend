// RekapHarian.tsx

import { useState, useEffect } from "react";
import api from "../../libs/axios";
import Button from "../fragments/Button";

interface SiswaRekap {
  id: number;
  nama: string;
  modul: string;
  jumlahNilai: number;
  rataRata: number;
}

const TabRekapHarian = ({ onLihatRekap, onCetakLaporan }: {
  onLihatRekap: (siswaId: number) => void;
  onCetakLaporan: (siswaId: number) => void;
}) => {
  const [dataSiswa, setDataSiswa] = useState<SiswaRekap[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/rekap/harian");
        const mapped = data.map((item: any) => ({
          id: item.id_siswa,
          nama: item.nama_siswa,
          modul: item.nama_modul,
          jumlahNilai: item.jumlah_nilai,
          rataRata: item.rata_rata,
        }));
        setDataSiswa(mapped);
      } catch (err) {
        console.error("Gagal mengambil data rekap harian:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full gap-10 shadow rounded-lg bg-[#f4f4f9] p-8">
      <h2 className="text-xl text-center font-semibold mb-4">Rekap Penilaian Harian</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border bg-white">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="border px-4 py-2 text-center">No</th>
              <th className="border px-4 py-2 text-center">Nama Siswa</th>
              <th className="border px-4 py-2 text-center">Nama Modul</th>
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
                <td className="border px-4 py-2">{siswa.modul}</td>
                <td className="border px-4 py-2 text-center">{siswa.jumlahNilai}</td>
                <td className="border px-4 py-2 text-center">
                  {siswa.rataRata !== undefined ? siswa.rataRata.toFixed(1) : '-'}
                </td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <Button
                    className="text-sm text-white cursor-pointer bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => onLihatRekap(siswa.id)}
                  >
                    🔍 Detail
                  </Button>
                  <Button
                    className="text-sm text-white cursor-pointer bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-700"
                    onClick={() => onCetakLaporan(siswa.id)}
                  >
                    🖨️ Print
                  </Button>
                </td>
              </tr>
            ))}
            {dataSiswa.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Tidak ada data rekap harian ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabRekapHarian;
