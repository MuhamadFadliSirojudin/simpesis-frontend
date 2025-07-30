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
    setListSiswa(data.data);
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

  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-5 p-8">
      <div className="w-full flex justify-between items-end mb-4">
        <div className="w-1/2">
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
        <div className="flex gap-2 items-center">
          <label className="text-base font-semibold">Filter Bulan:</label>
          <select
            className="border px-2 py-1 rounded"
            value={filterBulan}
            onChange={(e) => setFilterBulan(e.target.value)}
          >
            <option value="Semua">Semua</option>
            <option value="Januari">Januari</option>
            <option value="Februari">Februari</option>
            <option value="Maret">Maret</option>
            <option value="April">April</option>
            <option value="Mei">Mei</option>
            <option value="Juni">Juni</option>
            <option value="Juli">Juli</option>
            <option value="Agustus">Agustus</option>
            <option value="September">September</option>
            <option value="Oktober">Oktober</option>
            <option value="November">November</option>
            <option value="Desember">Desember</option>
          </select>
        </div>
      </div>

      <TabelDetailBulanan
        data={rekap}
        filterBulan={filterBulan}
        showNo={true}
        showBulan={true}
      />
    </div>
  );
};

export default DetailRekapBulanan;