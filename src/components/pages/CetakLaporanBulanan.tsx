import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import api from "../../libs/axios";
import { Siswa } from "../../types";
import Button from "../fragments/Button";
import DropdownSiswa from "../fragments/DropdownSiswa";
import TabelDetailBulanan from "../fragments/TabelDetailBulanan";

interface RekapItem {
  bulan: string;
  modul: string;
  jumlah: number;
  rataRata: number;
  kegiatanList: {
    nama: string;
    nilai: number;
  }[];
  walikelas: string;
  nuptk: string;
}

interface Props {
  siswaId?: number;
}

const CetakLaporanBulanan: React.FC<Props> = ({ siswaId }) => {
  const [listSiswa, setListSiswa] = useState<Siswa[]>([]);
  const [selectedSiswa, setSelectedSiswa] = useState<number>(0);
  const [siswaDetail, setSiswaDetail] = useState<Siswa | null>(null);
  const [rekap, setRekap] = useState<RekapItem[]>([]);
  const [bulan, setBulan] = useState<string>("Semua");

  const componentRef = useRef<HTMLDivElement>(null);
  const tanggalCetak = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
    const { data } = await api.get(`/rekap/bulanan-laporan?siswaId=${selectedSiswa}`);
    setSiswaDetail(data.siswa);
    setRekap(
      bulan === "Semua"
        ? data.rekap
        : data.rekap.filter((item: RekapItem) => item.bulan.toString() === bulan)
    );
  };

  useEffect(() => {
    fetchSiswa();
  }, []);

  useEffect(() => {
    if (siswaId) {
      setSelectedSiswa(siswaId);
    }
  }, [siswaId]);

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
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="bulan" className="text-base font-semibold">
              Filter Bulan
            </label>
            <select
              className="block w-full appearance-none bg-white border border-gray-400 text-black font-medium px-4 py-3 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-900 transition-all"
              value={bulan}
              onChange={(e) => setBulan(e.target.value)}
            >
              <option value="Semua" className="text-gray-800">Semua</option>
              <option value="Januari" className="text-gray-800">Januari</option>
              <option value="Februari" className="text-gray-800">Februari</option>
              <option value="Maret" className="text-gray-800">Maret</option>
              <option value="April" className="text-gray-800">April</option>
              <option value="Mei" className="text-gray-800">Mei</option>
              <option value="Juni" className="text-gray-800">Juni</option>
              <option value="Juli" className="text-gray-800">Juli</option>
              <option value="Agustus" className="text-gray-800">Agustus</option>
              <option value="September" className="text-gray-800">September</option>
              <option value="Oktober" className="text-gray-800">Oktober</option>
              <option value="November" className="text-gray-800">November</option>
              <option value="Desember" className="text-gray-800">Desember</option>
            </select>
          </div>
        </div>
        <Button
          type="button"
          variant="custom"
          onClick={getLaporan}
          className="bg-blue-900 text-sm text-nowrap text-white hover:bg-blue-800 cursor-pointer h-12 px-15"
        >
          Ambil Rekap Bulanan
        </Button>
      </div>

      {rekap.length > 0 && siswaDetail && (
        <>
          <div ref={componentRef} className="w-full flex flex-col gap-5 py-10 px-10">
            <h2 className="text-center text-2xl font-bold">Laporan Penilaian Bulanan</h2>
            <table className="w-full min-w-full bg-white border border-gray-400 rounded-xl shadow">
              <tbody className="border border-gray-400">
                <tr className="h-16 border-b border-gray-400">
                  <td className="align-top w-[35%] px-4 py-2">Bulan Ke</td>
                  <td className="align-top px-4 py-2">{bulan}</td>
                </tr>
                <tr className="h-16 border-b border-gray-400">
                  <td className="align-top w-[35%] px-4 py-2">Wali Kelas</td>
                  <td className="align-top px-4 py-2">{siswaDetail.guru?.nama || "-"}</td>
                </tr>
                <tr className="h-16 border-b border-gray-400">
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

            <TabelDetailBulanan data={rekap} filterBulan={bulan} showNo={true} showBulan={false} />

            <div className="w-full flex justify-around items-start pt-10">
              <div className="flex flex-col items-center text-xl gap-1">
                <p>Mengetahui :</p>
                <p>Kepala Sekolah</p>
                <div className="h-20" />
                <p className="font-semibold">Putri Irma Susanti, M.Pd.</p>
                <p className="font-semibold">NUPTK. 3859764665300042</p>
              </div>
              <div className="flex flex-col items-center text-xl gap-1">
                <p>Tasikmalaya, {tanggalCetak}</p>
                <p>Wali Kelas,</p>
                <div className="h-20" />
                <p className="font-semibold">{siswaDetail.guru?.nama || "-"}</p>
                <p className="font-semibold">NUPTK. {siswaDetail.guru?.nuptk || "-"}</p>
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

export default CetakLaporanBulanan;