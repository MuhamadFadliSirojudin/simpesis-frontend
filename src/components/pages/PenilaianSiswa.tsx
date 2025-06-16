import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PenilaianHarian from "../pages/PenilaianHarian";
import api from "../../libs/axios"; // pastikan import ini sudah ada

const PenilaianSiswa = () => {
    const { siswaId } = useParams();
    const [activeTab, setActiveTab] = useState<"harian" | "mingguan" | "bulanan" | "semester">("harian");
    const [siswaNama, setSiswaNama] = useState("");
        useEffect(() => {
        if (!siswaId) return;

    const fetchNama = async () => {
        try {
            const res = await api.get(`/siswa/${siswaId}`);
            setSiswaNama(res.data.data.nama);
        } catch (err) {
            console.error("Gagal mengambil nama siswa:", err);
        }
    };


        fetchNama();
        }, [siswaId]);

return (
    <div className="p-6 bg-[#f4f4f9] min-h-screen">
        <h2 className="text-2xl font-semibold mb-6 text-center">Penilaian Siswa</h2>
        <h2 className="text-xl font-semibold mb-4 text-center">{siswaNama}</h2>

        {/* Tab Navigasi */}
        <div className="flex gap-4 justify-center mb-8">
            <button
            onClick={() => setActiveTab("harian")}
            className={`px-4 py-2 rounded ${activeTab === "harian" ? "bg-blue-800 text-white" : "bg-gray-200 text-black"}`}
            >
            Penilaian Harian
            </button>
            <button
            onClick={() => setActiveTab("mingguan")}
            className={`px-4 py-2 rounded ${activeTab === "mingguan" ? "bg-blue-800 text-white" : "bg-gray-200 text-black"}`}
            >
            Penilaian Mingguan
            </button>
            <button
            onClick={() => setActiveTab("bulanan")}
            className={`px-4 py-2 rounded ${activeTab === "bulanan" ? "bg-blue-800 text-white" : "bg-gray-200 text-black"}`}
            >
            Penilaian Bulanan
            </button>
            <button
            onClick={() => setActiveTab("semester")}
            className={`px-4 py-2 rounded ${activeTab === "semester" ? "bg-blue-800 text-white" : "bg-gray-200 text-black"}`}
            >
            Penilaian Semester
            </button>
        </div>

        {/* Konten Tab */}
        <div className="bg-white p-6 rounded shadow">
            {activeTab === "harian" && <div>📘 Form Input Penilaian Harian</div>}
            {activeTab === "mingguan" && <div>📗 Rekap dari Penilaian Harian</div>}
            {activeTab === "bulanan" && <div>📙 Rekap dari Penilaian Mingguan</div>}
            {activeTab === "semester" && <div>📕 Rekap dari Penilaian Bulanan</div>}
        </div>

        {activeTab === "harian" && <PenilaianHarian />}

        </div>
);
};

export default PenilaianSiswa;