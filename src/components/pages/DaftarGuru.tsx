import { useEffect, useState } from "react";
import api from "../../libs/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Guru = {
  id: number;
  nama: string;
};

const DaftarGuru = () => {
  const [guruList, setGuruList] = useState<Guru[]>([]);
  const navigate = useNavigate();

  const fetchGuru = async () => {
    try {
      const res = await api.get("/guru"); // asumsi endpoint getAllGuru
      setGuruList(res.data.data || []);
    } catch (err) {
      toast.error("Gagal memuat daftar guru");
    }
  };

  const handleSelectGuru = (id: number) => {
    navigate(`/siswa/${id}`); // arahkan ke halaman siswa berdasarkan guru
  };

  useEffect(() => {
    fetchGuru();
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-semibold mb-6">Daftar Guru</h2>
      <ul className="flex flex-col gap-3">
        {guruList.map((guru) => (
          <li
            key={guru.id}
            onClick={() => handleSelectGuru(guru.id)}
            className="cursor-pointer p-4 border rounded hover:bg-blue-100"
          >
            {guru.nama}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DaftarGuru;
