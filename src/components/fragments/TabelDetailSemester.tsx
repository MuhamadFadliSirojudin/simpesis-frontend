import React from "react";

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
  data: RekapSemesterItem[];
  filterSemester?: string;
  showNo?: boolean;
  showSemester?: boolean;
}

const TabelDetailSemester: React.FC<Props> = ({
  data,
  filterSemester = "Semua",
  showNo = false,
  showSemester = true,
}) => {
  const filteredRekap =
    filterSemester === "Semua"
      ? data
      : data.filter((item) => item.semester.toString() === filterSemester);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border bg-white">
        <thead>
          <tr className="bg-blue-900 text-white">
            {showNo && <th className="border px-4 py-2 text-center">No</th>}
            {showSemester && (
              <th className="border px-4 py-2 text-center">Semester</th>
            )}
            <th className="border px-4 py-2 text-center">Nama Modul</th>
            <th className="border px-4 py-2 text-center">
              Kegiatan Pembelajaran
            </th>
            <th className="border px-4 py-2 text-center">Nilai</th>
            <th className="border px-4 py-2 text-center">
              Jumlah Penilaian
            </th>
            <th className="border px-4 py-2 text-center">
              Rata-Rata Nilai
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredRekap.map((item, index) =>
            Array.isArray(item.kegiatanList) && item.kegiatanList.length > 0 ? (
              item.kegiatanList.map((kegiatan, idx) => (
                <tr key={`${index}-${idx}`}>
                  {idx === 0 && showNo && (
                    <td
                      className="border px-2 py-1 text-center"
                      rowSpan={item.kegiatanList.length}
                    >
                      {index + 1}
                    </td>
                  )}
                  {idx === 0 && showSemester && (
                    <td
                      className="border px-4 py-2 text-center"
                      rowSpan={item.kegiatanList.length}
                    >
                      {item.semester}
                    </td>
                  )}
                  {idx === 0 && (
                    <td
                      className="border px-4 py-2"
                      rowSpan={item.kegiatanList.length}
                    >
                      {item.modul}
                    </td>
                  )}
                  <td className="border px-2 py-1">{kegiatan.nama}</td>
                  <td className="border px-2 py-1 text-center">
                    {kegiatan.nilai}
                  </td>
                  {idx === 0 && (
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
              <tr key={index}>
                {showNo && (
                  <td className="border px-2 py-1 text-center">{index + 1}</td>
                )}
                {showSemester && (
                  <td className="border px-4 py-2 text-center">
                    {item.semester}
                  </td>
                )}
                <td className="border px-4 py-2">{item.modul}</td>
                <td
                  className="border px-2 py-1 text-center italic text-gray-500"
                  colSpan={
                    4 + (showNo ? 1 : 0) + (showSemester ? 1 : 0)
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

export default TabelDetailSemester;
