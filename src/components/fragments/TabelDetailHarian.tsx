import React from "react";

interface RekapHarianItem {
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
  data: RekapHarianItem[];
  filterTanggal?: string;
  showTanggal?: boolean;
  showNo?: boolean;
}

const TabelDetailHarian: React.FC<Props> = ({
  data,
  filterTanggal = "Semua",
  showNo = false,
  showTanggal = true,
}) => {
  const filteredRekap =
    filterTanggal === "Semua"
      ? data
      : data.filter((item) => item.tanggal === filterTanggal);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border bg-white">
        <thead>
          <tr className="bg-blue-900 text-white">
            {showNo && <th className="border px-4 py-2 text-center">No</th>}
            {showTanggal && <th className="border px-4 py-2 text-center">Tanggal</th>}
            <th className="border px-4 py-2 text-center">Nama Modul</th>
            <th className="border px-4 py-2 text-center">Kegiatan Pembelajaran</th>
            <th className="border px-4 py-2 text-center">Nilai</th>
            <th className="border px-4 py-2 text-center">Jumlah Penilaian</th>
            <th className="border px-4 py-2 text-center">Rata-Rata Nilai</th>
          </tr>
        </thead>
        <tbody>
          {filteredRekap.map((item, index) =>
            Array.isArray(item.kegiatanList) && item.kegiatanList.length > 0 ? (
              item.kegiatanList.map((kegiatan, idx) => (
                <tr key={`${index}-${idx}`}>
                  {idx === 0 && showNo && (
                    <td className="border px-2 py-1 text-center" rowSpan={item.kegiatanList.length}>
                      {index + 1}
                    </td>
                  )}
                  {idx === 0 && showTanggal && (
                    <td className="border px-4 py-2 text-center" rowSpan={item.kegiatanList.length}>
                      {item.tanggal}
                    </td>
                  )}
                  {idx === 0 && (
                    <td className="border px-4 py-2" rowSpan={item.kegiatanList.length}>
                      {item.modul}
                    </td>
                  )}
                  <td className="border px-2 py-1">{kegiatan.nama}</td>
                  <td className="border px-2 py-1 text-center">{kegiatan.nilai}</td>
                  {idx === 0 && (
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
              <tr key={index}>
                {showNo && <td className="border px-2 py-1 text-center">{index + 1}</td>}
                {showTanggal && <td className="border px-4 py-2 text-center">{item.tanggal}</td>}
                <td className="border px-4 py-2">{item.modul}</td>
                <td
                  className="border px-2 py-1 text-center italic text-gray-500"
                  colSpan={
                    4 + (showNo ? 1 : 0) + (showTanggal ? 1 : 0)
                  }
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

export default TabelDetailHarian;
