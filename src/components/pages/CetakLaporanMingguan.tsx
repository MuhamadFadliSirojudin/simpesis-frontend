import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import api from "../../libs/axios";
import { Modul, Siswa } from "../../types"; // ✅ pakai tipe global
import Button from "../fragments/Button";
import Dropdown from "../fragments/Dropdown";
import DropdownSiswa from "../fragments/DropdownSiswa";

interface RekapItem {
  mingguKe: number;
  modul: string;
  kegiatan: string;
  jumlah: number;
  rataRata: number;
  walikelas: string
  nuptk: string
}

const CetakLaporanMingguan = () => {
  const [listSiswa, setListSiswa] = useState<Siswa[]>([]);
  const [listModul, setListModul] = useState<Modul[]>([]);
  const [selectedModul, setSelectedModul] = useState<number>(0);
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

  const fetchModul = async () => {
    const { data } = await api.get("/modul");
    const addedData: Modul[] = [
      { id: 0, penyusun: "kosong", topik: "Pilih Modul", tujuan: "kosong" },
      ...data.data,
    ];

    setListModul(addedData);
  };

  const getLaporan = async () => {
    if (!selectedSiswa) return;
    const { data } = await api.get(`/rekap/mingguan-laporan?siswaId=${selectedSiswa}`);
    setSiswaDetail(data.siswa);
    setRekap(data.rekap);
    if (data.rekap.length > 0) setMingguKe(data.rekap[0].mingguKe);
  };

  useEffect(() => {
    fetchModul();
    fetchSiswa();
  }, []);

  return (
    <div className="min-h-[100vh] w-full flex flex-col items-center gap-5 justify-between bg-[#f4f4f9] p-8">
      <div className="flex flex-col justify-between shadow-form-container w-full bg-white p-[2rem] rounded-lg text-[#333] gap-7">
        <div className="flex gap-10 justify-end items-end">
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="nama" className="text-base font-semibold">
              Pilih Siswa
            </label>
            <DropdownSiswa
              options={listSiswa}
              value={selectedSiswa}
              onChange={setSelectedSiswa}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="topik" className="text-base font-semibold">
              Pilih Modul
            </label>
            <Dropdown
              options={listModul}
              value={selectedModul}
              onChange={setSelectedModul}
            />
          </div>
        </div>
        <Button
          type="button"
          variant="custom"
          onClick={getLaporan}
          className="bg-blue-900 text-sm text-nowrap text-white hover:bg-blue-800 cursor-pointer h-12 px-15"
        >
          Ambil Rekap Mingguan
        </Button>
      </div>

      {rekap.length > 0 && siswaDetail && (
        <>
          <div ref={componentRef} className="w-full flex flex-col gap-5 py-10 px-10">
            <h2 className="text-center text-lg font-bold mb-4">Laporan Penilaian Mingguan</h2>
            <table className="w-full min-w-full bg-white border border-gray-400 rounded-xl shadow">
              <tbody className="mb-4 space-y-1">
                <tr className="h-16 border-b border-gray-400">
                  <td className="align-top w-[35%] px-4 py-2">Minggu Ke-</td>
                  <td className="align-top px-4 py-2">{mingguKe}</td>
                </tr>
                <tr className="h-16 border-b border-gray-400">
                  <td className="align-top w-[35%] px-4 py-2">Wali Kelas</td>
                  <td className="align-top px-4 py-2">{siswaDetail.waliKelas || "-"}</td>
                </tr><tr className="h-16 border-b border-gray-400">
                  <td className="align-top w-[35%] px-4 py-2">Fase/Kelompok</td>
                  <td className="align-top px-4 py-2">{siswaDetail.kelompok || "-"}</td>
                </tr>
                <tr className="h-16 border-b border-gray-400">
                  <td className="align-top w-[35%] px-4 py-2">Nama Siswa</td>
                  <td className="align-top px-4 py-2">{siswaDetail.nama}</td>
                </tr>
                <tr className="h-16 border-b border-gray-400">
                  <td className="align-top w-[35%] px-4 py-2">Tanggal Cetak</td>
                  <td className="align-top px-4 py-2">{tanggalCetak}</td>
                </tr>
              </tbody>
            </table>

            <table className="table-auto w-full border bg-white">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="border px-4 py-2 text-center">No</th>
                  <th className="border px-4 py-2 text-center">Nama Modul</th>
                  <th className="border px-4 py-2 text-center">Kegiatan Pembelajaran</th>
                  <th className="border px-4 py-2 text-center">Jumlah Penilaian</th>
                  <th className="border px-4 py-2 text-center">Rata-rata Nilai</th>
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
            
            {/*Area tanda tangan*/}
            <div className="w-full flex justify-around items-start pt-10">
              <div className="flex flex-col items-center text-xl gap-1">
                <p >Mengetahui :</p>
                <p >Kepala Sekolah</p>
                <div className="h-20" /> {/* Spacer tanda tangan */}
                <p className="font-semibold">Putri Irma Susanti, M.Pd.</p>
                <p className="font-semibold">NUPTK. 3859764665300042</p>
              </div>

              {/* Kolom Wali Kelas */}
              <div className="flex flex-col items-center text-xl gap-1">
                <p className="font-semibold">&nbsp;</p>
                <p >Tasikmalaya, {tanggalCetak}</p>
                <p >Wali Kelas,</p>
                <div className="h-20" /> {/* Spacer tanda tangan */}
                <p className="font-semibold">{siswaDetail.waliKelas || "-"}</p>
                <p className="font-semibold">NUPTK. {}</p>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end gap-10">
            <Button onClick={() => handlePrint()} className="h-12">
              Print Laporan
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CetakLaporanMingguan;
