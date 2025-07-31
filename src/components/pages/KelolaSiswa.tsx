import { useState } from "react";
import ModulInput from "./ModulInput";
import PembelajaranInput from "./PembelajaranInput";
import NilaiIInput from "./NilaiIInput";
import GetReport from "./CetakLaporanKelola";

const PenilaianHarian = () => {
  const [subTab, setSubTab] = useState<"modul" | "pembelajaran" | "nilai" |"laporan">("modul");

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-6 justify-center">
        <button
          onClick={() => setSubTab("modul")}
          className={`px-4 py-2 rounded ${subTab === "modul" ? "bg-blue-800 text-white" : "bg-gray-200"}`}
        >
          Input Modul
        </button>
        <button
          onClick={() => setSubTab("pembelajaran")}
          className={`px-4 py-2 rounded ${subTab === "pembelajaran" ? "bg-blue-800 text-white" : "bg-gray-200"}`}
        >
          Input Pembelajaran
        </button>
        <button
          onClick={() => setSubTab("nilai")}
          className={`px-4 py-2 rounded ${subTab === "nilai" ? "bg-blue-800 text-white" : "bg-gray-200"}`}
        >
          Input Nilai
        </button>
        <button
          onClick={() => setSubTab("laporan")}
          className={`px-4 py-2 rounded ${subTab === "laporan" ? "bg-blue-800 text-white" : "bg-gray-200"}`}
        >
          Cetak Laporan
        </button>
      </div>

      <div>
        {subTab === "modul" && <ModulInput />}
        {subTab === "pembelajaran" && <PembelajaranInput />}
        {subTab === "nilai" && <NilaiIInput />}
        {subTab === "laporan" && <GetReport />}
      </div>
    </div>
  );
};

export default PenilaianHarian;
