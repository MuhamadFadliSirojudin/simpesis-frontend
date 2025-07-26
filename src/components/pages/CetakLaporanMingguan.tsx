import { useEffect, useRef, useState } from "react";
import Button from "../fragments/Button";
import DropdownSiswa from "../fragments/DropdownSiswa";
import api from "../../libs/axios";
import { useReactToPrint } from "react-to-print";
import { Siswa } from "../../types"; // ✅ pakai tipe global

interface RekapItem {
  mingguKe: number;
  modul: string;
  kegiatan: string;
  jumlah: number;
  rataRata: number;
}

const CetakLaporanMingguan = () => {
  const [listSiswa, setListSiswa] = useState<Siswa[]>([]);
  const [selectedSiswa, setSelectedSiswa] = useState<number>(0);
  const [siswaDetail, setSiswaDetail] = useState<Siswa | null>(null);
  const [rekap, setRekap] = useState<RekapItem[]>([]);
  const [mingguKe, setMingguKe] = useState<number>(0);

  const componentRef = useRef<HTMLDivElement>(null);
  const tanggalCetak = new Date().toLocaleDateString("id-ID");

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  const fetchSiswa = async () => {
    const { data } = await api.get("/siswa");
    const addedData: Siswa[] = [
      { id: 0, nama: "Pilih Siswa", kelompok: "", semester: 0, totalNilai: 0 },
      ...data.data,
    ];
    setListSiswa(addedData);
  };

  const getLaporan = async () => {
    if (!selectedSiswa) return;
    const { data } = await api.get(`/rekap/mingguan-laporan?siswaId=${selectedSiswa}`);
    setSiswaDetail(data.siswa);
    setRekap(data.rekap);
    if (data.rekap.length > 0) setMingguKe(data.rekap[0].mingguKe);
  };

  useEffect(() => {
    fetchSiswa();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col gap-5 justify-start bg-[#f4f4f9] p-8">
      <div className="flex flex-col shadow-form-container w-full bg-white p-8 rounded-lg gap-5">
        <div className="flex flex-col w-full gap-2">
          <label className="text-base font-semibold">Pilih siswa</label>
          <DropdownSiswa
            options={listSiswa}
            value={selectedSiswa}
            onChange={setSelectedSiswa}
          />
        </div>

        <Button
          onClick={getLaporan}
          className="bg-blue-900 text-white hover:bg-blue-800 h-12"
        >
          Ambil Rekap Mingguan
        </Button>
      </div>

      {rekap.length > 0 && siswaDetail && (
        <>
          <div ref={componentRef} className="bg-white p-8 rounded-lg text-sm text-black max-w-4xl mx-auto">
            <h2 className="text-center text-lg font-bold mb-4">Laporan Penilaian Mingguan</h2>

            <div className="mb-4 space-y-1">
              <p><strong>Minggu Ke-:</strong> {mingguKe}</p>
              <p><strong>Nama Siswa:</strong> {siswaDetail.nama}</p>
              <p><strong>Wali Kelas:</strong> {siswaDetail.waliKelas || "-"}</p>
              <p><strong>Fase/Kelompok:</strong> {siswaDetail.kelompok || "-"}</p>
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
                <div className="h-16" />
                <p>({siswaDetail.waliKelas || "-"})</p>
              </div>
              <div className="text-center">
                <p>Bandung, {tanggalCetak}</p>
                <p>Kepala Sekolah</p>
                <div className="h-16" />
                <p>(___________________)</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-6 mt-6">
            <Button onClick={() => handlePrint()} className="bg-blue-900 text-white h-12">
              Cetak Laporan
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CetakLaporanMingguan;
