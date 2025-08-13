// File: DetailRekapSemester.tsx
import { useEffect, useState } from "react";
import api from "../../libs/axios";
import { Siswa } from "../../types";
import DropdownSiswa from "../fragments/DropdownSiswa";
import TabelDetailSemester from "../fragments/TabelDetailSemester";

interface RekapSemesterItem {
  semester: number;
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

const DetailRekapSemester: React.FC<Props> = ({ siswaId: propsSiswaId }) => {
  const [listSiswa, setListSiswa] = useState<Siswa[]>([]);
  const [siswaId, setSiswaId] = useState<number | null>(propsSiswaId ?? null);
  const [rekap, setRekap] = useState<RekapSemesterItem[]>([]);
  const [filterSemester, setFilterSemester] = useState("Semua");

  const fetchSiswa = async () => {
    const { data } = await api.get("/siswa");
    const siswaList = data.data;
    const siswaWithPlaceholder = [
      { id: 0, nama: "Pilih Siswa" },
      ...siswaList,
    ];
    setListSiswa(siswaWithPlaceholder);
  };

  const fetchRekap = async (id: number) => {
    try {
      const { data } = await api.get(`/rekap/semester-by-siswa?siswaId=${id}`);

      const hasil = data.map((item: any) => ({
        ...item,
        semester: convertSemester(item.semester),
      }));

      setRekap(hasil);
    } catch (err) {
      console.error("Gagal mengambil data rekap:", err);
    }
  };

  const convertSemester = (semesterNumber: number): string => {
    return semesterNumber === 1 ? "1" : "2";
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
            Filter Semester
          </label>
          <select
            className="block w-full appearance-none bg-white border border-gray-400 text-black font-medium px-4 py-3 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-900 transition-all"
            value={filterSemester}
            onChange={(e) => setFilterSemester(e.target.value)}
          >
            <option value="Semua" className="text-gray-800">Semua</option>
            <option value="1" className="text-gray-800">Semester 1</option>
            <option value="2" className="text-gray-800">Semester 2</option>
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
        <TabelDetailSemester
          data={rekap}
          filterSemester={filterSemester}
        />
      )}
    </div>
  );
};

export default DetailRekapSemester;
