import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import KelolaSiswa from "./KelolaSiswa";
import PenilaianMingguan from "../pages/PenilaianMingguan";
import PenilaianBulanan from "../pages/PenilaianBulanan";
import api from "../../libs/axios"; // pastikan import ini sudah ada
import PenilaianSemester from "./PenilaianSemester";
import PenilaianHarian from "./PenilaianHarian";

const PenilaianSiswa = () => {
    const { siswaId } = useParams();
    const [activeTab, setActiveTab] = useState<"kelola" | "harian" | "mingguan" | "bulanan" | "semester">("harian");
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
            <h2 className="text-2xl font-semibold mb-6 text-center">Kelola Siswa</h2>
            <h2 className="text-xl font-semibold mb-4 text-center">{siswaNama}</h2>

            {/* Tab Navigasi */}
            <div className="flex gap-4 justify-center mb-8">
                <button
                    onClick={() => setActiveTab("kelola")}
                    className={`px-4 py-2 rounded ${activeTab === "kelola" ? "bg-blue-800 text-white" : "bg-gray-200 text-black"}`}
                >
                    Kelola Siswa
                </button>
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
                {activeTab === "kelola" && <KelolaSiswa/>}
                {activeTab === "harian" && <PenilaianHarian/>}
                {activeTab === "mingguan" && <PenilaianMingguan/>}
                {activeTab === "bulanan" && <PenilaianBulanan/>}
                {activeTab === "semester" && <PenilaianSemester/>}
            </div>
        </div>
    );
};

export default PenilaianSiswa;