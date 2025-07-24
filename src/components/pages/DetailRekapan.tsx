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
}

interface Props {
  siswaId?: number;
}

const DetailRekapan: React.FC<Props> = ({ siswaId: propsSiswaId }) => {
  const [siswaId, setSiswaId] = useState<number | null>(propsSiswaId || null);
  const [listSiswa, setListSiswa] = useState<Siswa[]>([]);
  const [rekap, setRekap] = useState<RekapItem[]>([]);

  const fetchSiswa = async () => {
    try {
      const { data } = await api.get("/siswa");
      setListSiswa(data.data);
    } catch (err) {
      console.error("Gagal mengambil data siswa:", err);
    }
  };

  const fetchRekap = async (id: number) => {
    try {
      const { data } = await api.get(`/rekap/mingguan?siswaId=${id}`);
      setRekap(data); // Sesuaikan struktur sesuai response backend
    } catch (err) {
      console.error("Gagal mengambil data rekap:", err);
    }
  };

  useEffect(() => {
    fetchSiswa();
  }, []);

  useEffect(() => {
    if (propsSiswaId) {
      setSiswaId(propsSiswaId);
      fetchRekap(propsSiswaId);
    }
  }, [propsSiswaId]);

  useEffect(() => {
    if (siswaId && !propsSiswaId) {
      fetchRekap(siswaId);
    }
  }, [siswaId]);

  return (
    <div className="w-full gap-10 shadow rounded-lg bg-[#f4f4f9] p-8">
      {!propsSiswaId && (
        <div className="mb-4 w-1/2">
          <label className="font-semibold block mb-2">Pilih Siswa</label>
          <DropdownSiswa
            value={siswaId || 0}
            onChange={(val) => setSiswaId(val)}
            options={listSiswa}
          />
        </div>
      )}

      {rekap.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border bg-white">
            <thead>
              <tr className="bg-gray-100 bg-blue-900 text-white">
                <th className="border px-4 py-2 text-center">Minggu Ke</th>
                <th className="border px-4 py-2 text-center">Modul</th>
                <th className="border px-4 py-2 text-center">Jumlah Penilaian</th>
                <th className="border px-4 py-2 text-center">Rata-Rata</th>
              </tr>
            </thead>
            <tbody>
              {rekap.map((item, idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2 text-center">{item.mingguKe}</td>
                  <td className="border px-4 py-2">{item.modul}</td>
                  <td className="border px-4 py-2 text-center">{item.jumlah}</td>
                  <td className="border px-4 py-2 text-center">{item.rataRata}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center py-4">Belum ada data rekap untuk siswa ini.</p>
      )}
    </div>
  );
};

export default DetailRekapan;
