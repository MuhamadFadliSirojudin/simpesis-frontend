// CetakLaporanMingguan.tsx
import React, { useEffect, useState } from "react";

interface RekapItem {
  mingguKe: number;
  modul: string;
  kegiatan: string;
  jumlah: number;
  rataRata: number;
}

interface CetakLaporanProps {
  siswaId: number;
  namaSiswa: string;
  waliKelas: string;
  fase: string;
  tujuanPembelajaran: string;
   kategori?: string;
}

const CetakLaporanMingguan: React.FC<CetakLaporanProps> = ({
  siswaId,
  namaSiswa,
  waliKelas,
  fase,
  tujuanPembelajaran,
}) => {
  const [rekap, setRekap] = useState<RekapItem[]>([]);
  const [mingguKe, setMingguKe] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/rekap/mingguan-by-siswa?siswaId=${siswaId}`);
        const data = await res.json();

        setRekap(data);
        if (data.length > 0) setMingguKe(data[0].mingguKe);
      } catch (error) {
        console.error("Gagal mengambil data rekap:", error);
      }
    };

    fetchData();
  }, [siswaId]);

  const tanggalCetak = new Date().toLocaleDateString("id-ID");

  return (
    <div id="area-cetak" className="p-6 max-w-3xl mx-auto text-sm text-black bg-white">
      <h2 className="text-center text-lg font-bold mb-4">Laporan Penilaian Mingguan</h2>

      <div className="mb-4 space-y-1">
        <p><strong>Minggu Ke-:</strong> {mingguKe}</p>
        <p><strong>Nama Siswa:</strong> {namaSiswa}</p>
        <p><strong>Wali Kelas:</strong> {waliKelas}</p>
        <p><strong>Fase/Kelompok:</strong> {fase}</p>
        <p><strong>Tujuan Pembelajaran:</strong> {tujuanPembelajaran}</p>
        <p><strong>Tanggal Cetak:</strong> {tanggalCetak}</p>
      </div>

      <table className="w-full border text-sm mb-6">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2 py-1">No</th>
            <th className="border px-2 py-1">Nama Modul</th>
            <th className="border px-2 py-1">Kegiatan Pembelajaran</th>
            <th className="border px-2 py-1">Jumlah Penilaian</th>
            <th className="border px-2 py-1">Rata-rata Nilai</th>
          </tr>
        </thead>
        <tbody>
          {rekap.map((item, index) => (
            <tr key={index}>
              <td className="border px-2 py-1 text-center">{index + 1}</td>
              <td className="border px-2 py-1">{item.modul}</td>
              <td className="border px-2 py-1">{item.kegiatan}</td>
              <td className="border px-2 py-1 text-center">{item.jumlah}</td>
              <td className="border px-2 py-1 text-center">{item.rataRata}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-12">
        <div className="text-center">
          <p>Wali Kelas</p>
          <div className="h-16"></div>
          <p>(___________________)</p>
        </div>
        <div className="text-center">
          <p>Bandung, {tanggalCetak}</p>
          <p>Kepala Sekolah</p>
          <div className="h-16"></div>
          <p>(___________________)</p>
        </div>
      </div>
        <button onClick={() => window.print()} className="btn btn-primary mt-4">
        Cetak Laporan
        </button>
    </div>
  );
};

export default CetakLaporanMingguan;
