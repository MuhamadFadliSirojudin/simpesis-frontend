// File: DetailRekapan.tsx
import { useEffect, useState } from "react";
import api from "../../libs/axios";
import { Siswa } from "../../types";
import DropdownSiswa from "../fragments/DropdownSiswa";

interface RekapItem {
  mingguKe: number;
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

const DetailRekapan: React.FC<Props> = ({ siswaId: propsSiswaId }) => {
  const [siswaId, setSiswaId] = useState<number | null>(propsSiswaId ?? null);
  const [listSiswa, setListSiswa] = useState<Siswa[]>([]);
  const [rekap, setRekap] = useState<RekapItem[]>([]);

  const fetchSiswa = async () => {
    try {
      const { data } = await api.get("/siswa");
      const siswaList = data.data;
      const siswaWithPlaceholder = [
        { id: 0, nama: "Pilih Siswa", semester: "" },
        ...siswaList,
      ];
      setListSiswa(siswaWithPlaceholder);
    } catch (err) {
      console.error("Gagal mengambil data siswa:", err);
    }
  };

  const fetchRekap = async (id: number) => {
    console.log("Fetching rekap for siswaId:", id);
    try {
      const { data } = await api.get(`/rekap/mingguan-detail-by-siswa?siswaId=${id}`);
      setRekap(data); // Sesuaikan struktur sesuai response backend
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
    if (siswaId && !propsSiswaId === undefined) {
      fetchRekap(siswaId);
    }
  }, [siswaId]);

  return (
    <div className="w-full gap-10 shadow rounded-lg bg-[#f4f4f9] p-8">
      <div className="mb-4 w-1/2">
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

      {siswaId === null && (
        <p className="text-center py-4">Silakan pilih siswa untuk melihat detail rekap.</p>
      )}

      {siswaId !== null && rekap.length === 0 && (
        <p className="text-center py-4">Belum ada data rekap untuk siswa ini.</p>
      )}

      {siswaId !== null && rekap.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border bg-white">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="border px-4 py-2 text-center">Minggu Ke</th>
                <th className="border px-4 py-2 text-center">Nama Modul</th>
                <th className="border px-4 py-2 text-center">Kegiatan Pembelajaran</th>
                <th className="border px-4 py-2 text-center">Nilai</th>
                <th className="border px-4 py-2 text-center">Jumlah Penilaian</th>
                <th className="border px-4 py-2 text-center">Rata-Rata Nilai</th>
              </tr>
            </thead>
            <tbody>
            {rekap.map((item, i) =>
              Array.isArray(item.kegiatanList) && item.kegiatanList.length > 0 ? (
                item.kegiatanList.map((kegiatan, j) => (
                  <tr key={`${i}-${j}`}>
                    {j === 0 && (
                      <>
                        <td className="border px-4 py-2 text-center" rowSpan={item.kegiatanList.length}>
                          {item.mingguKe}
                        </td>
                        <td className="border px-4 py-2" rowSpan={item.kegiatanList.length}>
                          {item.modul}
                        </td>
                      </>
                    )}
                    <td className="border px-2 py-1">{kegiatan.nama}</td>
                    <td className="border px-2 py-1 text-center">{kegiatan.nilai}</td>
                    {j === 0 && (
                      <>
                        <td className="border px-4 py-2 text-center" rowSpan={item.kegiatanList.length}>
                          {item.jumlah}
                        </td>
                        <td className="border px-4 py-2 text-center" rowSpan={item.kegiatanList.length}>
                          {item.rataRata}
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr key={i}>
                  <td className="border px-4 py-2 text-center">{item.mingguKe}</td>
                  <td className="border px-4 py-2">{item.modul}</td>
                  <td className="border px-2 py-1 text-center italic text-gray-500" colSpan={4}>
                    Tidak ada kegiatan pembelajaran
                  </td>
                </tr>
              )
            )}
          </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DetailRekapan;
