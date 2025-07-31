import { useEffect, useState } from "react";
import api from "../../libs/axios";
import { Siswa } from "../../types";
import DropdownSiswa from "../fragments/DropdownSiswa";
import TabelDetailBulanan from "../fragments/TabelDetailBulanan";

interface RekapBulananItem {
  bulan: string;
  modul: string;
  jumlah: number;
  rataRata: number;
  kegiatanList: {
    nama: string;
    nilai: number;
  }[];
}

interface Props {
  siswaId?: number;
}

const DetailRekapBulanan: React.FC<Props> = ({ siswaId: propsSiswaId }) => {
  const [listSiswa, setListSiswa] = useState<Siswa[]>([]);
  const [siswaId, setSiswaId] = useState<number | null>(propsSiswaId ?? null);
  const [rekap, setRekap] = useState<RekapBulananItem[]>([]);
  const [filterBulan, setFilterBulan] = useState("Semua");

  const fetchSiswa = async () => {
    const { data } = await api.get("/siswa");
    const siswaList = data.data;
      const siswaWithPlaceholder = [
        { id: 0, nama: "Pilih Siswa", semester: "" },
        ...siswaList,
      ];

    setListSiswa(siswaWithPlaceholder);
  };

  const fetchRekap = async (id: number) => {
    try {
      const { data } = await api.get(`/rekap/bulanan-by-siswa?siswaId=${id}`);

      const hasil = data.rekap.map((item: any) => ({
        ...item,
        bulan: convertBulan(item.bulan),
      }));

      setRekap(hasil);
    } catch (err) {
      console.error("Gagal mengambil data rekap:", err);
    }
  };

  const convertBulan = (bulanNumber: number): string => {
    const bulanMap = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return bulanMap[bulanNumber - 1] || "";
  };

  useEffect(() => {
    fetchSiswa();
  }, []);

  useEffect(() => {
    if (propsSiswaId !== undefined) {
      setSiswaId(propsSiswaId);
      fetchRekap(propsSiswaId);
    }
  }, [propsSiswaId]);

  useEffect(() => {
    if (siswaId && !propsSiswaId === undefined) {
      fetchRekap(siswaId);
    }
  }, [siswaId]);
  
  return (
    <div className="w-full gap-10 shadow rounded-lg bg-[#f4f4f9] p-8">
      <div className="flex shadow-form-container w-full  bg-white p-[2rem] rounded-lg text-[#333] gap-7 mb-6">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="nama" className="font-semibold text-base">
            Pilih Siswa
          </label>
          <DropdownSiswa
            value={siswaId ?? 0}
            onChange={(val) => {
              setSiswaId(val);
              fetchRekap(val);
            }}
            options={listSiswa}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-base font-semibold">
            Filter Bulan
          </label>
          <select
            className="block w-full appearance-none bg-white border border-gray-400 text-black font-medium px-4 py-3 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-900 transition-all"
            value={filterBulan}
            onChange={(e) => setFilterBulan(e.target.value)}
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
      
      {siswaId === null && (
        <p className="text-center py-4">Silakan pilih siswa untuk melihat detail rekap.</p>
      )}

      {siswaId !== null && rekap.length === 0 && (
        <p className="text-center py-4">Belum ada data rekap untuk siswa ini.</p>
      )}

      {siswaId !== null && rekap.length > 0 && (
        <TabelDetailBulanan
          data={rekap}
          filterBulan={filterBulan}
        />
      )}
    </div>
  );
};

export default DetailRekapBulanan;