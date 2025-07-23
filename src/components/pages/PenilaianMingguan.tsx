import { useEffect, useState } from "react";
import api from "../../libs/axios";
import { useParams } from "react-router-dom";
import GetReport from "../pages/GetReport";

interface Nilai {
    id: number;
    tanggal: string;
    nilai: number;
    minggu: number;
    pembelajaran: {
        nama: string;
    };
}

const PenilaianMingguan = () => {
    const { siswaId } = useParams();
    const [rekap, setRekap] = useState<Record<number, { jumlah: number; total: number; nama: string }[]>>({});

    useEffect(() => {
        const fetchNilai = async () => {
            try {
                const { data } = await api.get('/nilai?siswaId=${siswaId}');
                const grouped: Record<number, { jumlah: number; total: number; nama: string }[]> = {};

                data.data.forEach((n: Nilai) => {
                    const minggu = getWeek(new Date(n.tanggal));
                    if (!grouped[minggu]) grouped[minggu] = [];
                    const existing = grouped[minggu].find((item) => item.nama === n.pembelajaran.nama);
                    if (existing) {
                        existing.total += n.nilai;
                        existing.jumlah += 1;
                    } else {
                        grouped[minggu].push({ nama: n.pembelajaran.nama, jumlah: 1, total: n.nilai });
                    }
                });

                setRekap(grouped);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNilai();
    }, [siswaId]);

    const getWeek = (date: Date): number => {
        const firstJan = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date.getTime() - firstJan.getTime()) / 86400000;
        return Math.ceil((pastDaysOfYear + firstJan.getDay() + 1) / 7);
    };

    return (
        <div className="p-6 bg-white shadow rounded">
            <h2 className="text-lg font-bold mb-4">Rekap Nilai Mingguan</h2>
            {Object.keys(rekap).map((minggu) => (
                <div key={minggu} className="mb-4">
                    <h3 className="text-md font-semibold mb-2">Minggu ke-{minggu}</h3>
                    <table className="w-full border">
                        <thead>
                            <tr className="bg-blue-100">
                                <th className="border px-4 py-2">Pembelajaran</th>
                                <th className="border px-4 py-2">Rata-rata Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rekap[parseInt(minggu)].map((item, idx) => (
                                <tr key={idx}>
                                    <td className="border px-4 py-2">{item.nama}</td>
                                    <td className="border px-4 py-2">{(item.total / item.jumlah).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
            <GetReport />
        </div>
    );
};

export default PenilaianMingguan;