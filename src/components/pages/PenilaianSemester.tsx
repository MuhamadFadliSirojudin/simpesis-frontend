import { useState } from "react";
import RekapSemester from "./RekapSemester";
import DetailRekapSemester from "./DetailRekapSemester";
import CetakLaporanSemester from "./CetakLaporanSemester";

const PenilaianSemester = () => {
  const [subTab, setSubTab] = useState<
    "rekap" | "lihat-rekap" | "laporan"
  >("rekap");

  const [selectedSiswaId, setSelectedSiswaId] = useState<number | null>(null);

  const handleLihatRekap = (siswaId: number) => {
    setSelectedSiswaId(siswaId);
    setSubTab("lihat-rekap");
  };

  const handleCetakLaporan = (siswaId: number) => {
    setSelectedSiswaId(siswaId);
    setSubTab("laporan");
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-6 justify-center">
        <button
          onClick={() => setSubTab("rekap")}
          className={`px-4 py-2 rounded ${
            subTab === "rekap"
              ? "bg-blue-800 text-white"
              : "bg-gray-200"
          }`}
        >
          Rekapan
        </button>
        <button
          onClick={() => setSubTab("lihat-rekap")}
          className={`px-4 py-2 rounded ${
            subTab === "lihat-rekap"
              ? "bg-blue-800 text-white"
              : "bg-gray-200"
          }`}
        >
          Detail Rekapan
        </button>
        <button
          onClick={() => setSubTab("laporan")}
          className={`px-4 py-2 rounded ${
            subTab === "laporan"
              ? "bg-blue-800 text-white"
              : "bg-gray-200"
          }`}
        >
          Cetak Laporan
        </button>
      </div>

      <div>
        {subTab === "rekap" && (
          <RekapSemester
            onLihatRekap={handleLihatRekap}
            onCetakLaporan={handleCetakLaporan}
          />
        )}
        {subTab === "lihat-rekap" && (
          <DetailRekapSemester siswaId={selectedSiswaId ?? undefined} />
        )}
        {subTab === "laporan" && ( 
          <CetakLaporanSemester siswaId={selectedSiswaId ?? undefined}/>
        )}
      </div>
    </div>
  );
};

export default PenilaianSemester;
