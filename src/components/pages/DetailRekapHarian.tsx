// File: DetailRekapHarian.tsx
import { useEffect, useState } from "react";
import api from "../../libs/axios";
import { Siswa } from "../../types";
import DropdownSiswa from "../fragments/DropdownSiswa";
import TabelDetailHarian from "../fragments/TabelDetailHarian";

interface RekapItem {
  tanggal: string;
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

const DetailRekapHarian: React.FC<Props> = ({ siswaId: propsSiswaId }) => {
  const [siswaId, setSiswaId] = useState<number | null>(propsSiswaId ?? null);
  const [listSiswa, setListSiswa] = useState<Siswa[]>([]);
  const [rekap, setRekap] = useState<RekapItem[]>([]);
  const [filterTanggal, setFilterTanggal] = useState<string>("Semua");

  const fetchSiswa = async () => {
    try {
      const { data } = await api.get("/siswa");
      const siswaList = data.data;
      const siswaWithPlaceholder = [
        { id: 0, nama: "Pilih Siswa" },
        ...siswaList,
      ];
      setListSiswa(siswaWithPlaceholder);
    } catch (err) {
      console.error("Gagal mengambil data siswa:", err);
    }
  };

  const fetchRekap = async (id: number) => {
    try {
      const { data } = await api.get(`/rekap/harian-detail-by-siswa?siswaId=${id}`);
      setRekap(data);
    } catch (err) {
      console.error("Gagal mengambil data rekap:", err);
    }
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
    if (siswaId && propsSiswaId === undefined) {
      fetchRekap(siswaId);
    }
  }, [siswaId]);

  return (
    <div className="w-full gap-10 shadow rounded-lg bg-[#f4f4f9] p-8">
      <div className="flex shadow-form-container w-full bg-white p-[2rem] rounded-lg text-[#333] gap-7 mb-6">
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
            Filter Tanggal
          </label>
          <input
            type="date"
            className="block w-full bg-white border border-gray-400 text-black font-medium px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-900 transition-all"
            value={filterTanggal === "Semua" ? "" : filterTanggal}
            onChange={(e) =>
              setFilterTanggal(e.target.value === "" ? "Semua" : e.target.value)
            }
          />
        </div>
      </div>

      {siswaId === null && (
        <p className="text-center py-4">Silakan pilih siswa untuk melihat detail rekap.</p>
      )}

      {siswaId !== null && rekap.length === 0 && (
        <p className="text-center py-4">Belum ada data rekap untuk siswa ini.</p>
      )}

      {siswaId !== null && rekap.length > 0 && (
        <TabelDetailHarian data={rekap} filterTanggal={filterTanggal} />
      )}
    </div>
  );
};

export default DetailRekapHarian;