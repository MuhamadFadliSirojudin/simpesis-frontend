// File: TabelDetailRekapan.tsx
import React from "react";

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
  data: RekapItem[];
  filterMinggu?: string;
  showMinggu?: boolean;
  showNo?: boolean;
}

const TabelDetailRekapan: React.FC<Props> = ({ 
  data, 
  filterMinggu = "all",
  showNo = false,
  showMinggu = true,
}) => {
  const filteredRekap =
    filterMinggu === "all"
      ? data
      : data.filter((item) => item.mingguKe.toString() === filterMinggu);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border bg-white">
        <thead>
          <tr className="bg-blue-900 text-white">
            {showNo && <th className="border px-4 py-2 text-center">No</th>}
            {showMinggu && <th className="border px-4 py-2 text-center">Minggu Ke</th>}
            <th className="border px-4 py-2 text-center">Nama Modul</th>
            <th className="border px-4 py-2 text-center">Kegiatan Pembelajaran</th>
            <th className="border px-4 py-2 text-center">Nilai</th>
            <th className="border px-4 py-2 text-center">Jumlah Penilaian</th>
            <th className="border px-4 py-2 text-center">Rata-Rata Nilai</th>
          </tr>
        </thead>
        <tbody>
          {filteredRekap.map((item, i) =>
            Array.isArray(item.kegiatanList) && item.kegiatanList.length > 0 ? (
              item.kegiatanList.map((kegiatan, j) => (
                <tr key={`${i}-${j}`}>
                  {j === 0 && (
                    <>
                      {showNo && <td className="border px-2 py-1 text-center">{i + 1}</td>}
                      {showMinggu && <td
                        className="border px-4 py-2 text-center"
                        rowSpan={item.kegiatanList.length}
                      >
                        {item.mingguKe}
                      </td>}
                      <td
                        className="border px-4 py-2"
                        rowSpan={item.kegiatanList.length}
                      >
                        {item.modul}
                      </td>
                    </>
                  )}
                  <td className="border px-2 py-1">{kegiatan.nama}</td>
                  <td className="border px-2 py-1 text-center">{kegiatan.nilai}</td>
                  {j === 0 && (
                    <>
                      <td
                        className="border px-4 py-2 text-center"
                        rowSpan={item.kegiatanList.length}
                      >
                        {item.jumlah}
                      </td>
                      <td
                        className="border px-4 py-2 text-center"
                        rowSpan={item.kegiatanList.length}
                      >
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
                <td
                  className="border px-2 py-1 text-center italic text-gray-500"
                  colSpan={4}
                >
                  Tidak ada kegiatan pembelajaran
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TabelDetailRekapan;
