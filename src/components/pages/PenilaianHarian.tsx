import { useState } from "react";
import ModulInput from "../pages/ModulInput";
import PembelajaranInput from "../pages/PembelajaranInput";
import NilaiIInput from "./NilaiIInput";

const PenilaianHarian = () => {
  const [subTab, setSubTab] = useState<"modul" | "pembelajaran" | "nilai">("modul");

  return (
    <div className="p-4 bg-white rounded shadow">
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
      </div>

      <div>
        {subTab === "modul" && <ModulInput />}
        {subTab === "pembelajaran" && <PembelajaranInput />}
        {subTab === "nilai" && <NilaiIInput />}
      </div>
    </div>
  );
};

export default PenilaianHarian;
