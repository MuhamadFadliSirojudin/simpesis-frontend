import { useEffect, useState } from "react";
import api from "../../libs/axios";

interface GetReportProps {
  siswaId: string;
  kategori: "harian" | "mingguan" | "bulanan" | "semester";
}

interface NilaiKegiatan {
  id: number;
  nilai: number;
  namaModul: string;
  namaPembelajaran: string;
  tanggal: string;
}

const GetReport: React.FC<GetReportProps> = ({ siswaId, kategori }) => {
  const [reportData, setReportData] = useState<NilaiKegiatan[]>([]);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data } = await api.get(
          `/laporan?siswaId=${siswaId}&kategori=${kategori}`
        );
        setReportData(data);
      } catch (err) {
        console.error("Gagal mengambil data laporan:", err);
      }
    };

    if (siswaId && kategori) {
      fetchReport();
    }
  }, [siswaId, kategori]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="px-10 py-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">
        Laporan Penilaian {kategori}
      </h3>

      {reportData.length === 0 ? (
        <p className="text-gray-500">Belum ada data penilaian.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">Modul</th>
                  <th className="border px-4 py-2">Pembelajaran</th>
                  <th className="border px-4 py-2">Nilai</th>
                  <th className="border px-4 py-2">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2">{item.namaModul}</td>
                    <td className="border px-4 py-2">{item.namaPembelajaran}</td>
                    <td className="border px-4 py-2 text-center">{item.nilai}</td>
                    <td className="border px-4 py-2 text-center">{item.tanggal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handlePrint}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Cetak Laporan
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default GetReport;
