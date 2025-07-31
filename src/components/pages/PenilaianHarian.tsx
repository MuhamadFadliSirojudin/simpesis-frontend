import { useState } from "react";
import RekapHarian from "./RekapHarian";
import DetailRekapHarian from "./DetailRekapHarian";
import CetakLaporanHarian from "./CetakLaporanHarian";

const PenilaianHarian = () => {
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
          <RekapHarian
            onLihatRekap={handleLihatRekap}
            onCetakLaporan={handleCetakLaporan}
          />
        )}
        {subTab === "lihat-rekap" && (
          <DetailRekapHarian siswaId={selectedSiswaId ?? undefined} />
        )}
        {subTab === "laporan" && ( 
          <CetakLaporanHarian siswaId={selectedSiswaId ?? undefined}/>
        )}
      </div>
    </div>
  );
};

export default PenilaianHarian;
