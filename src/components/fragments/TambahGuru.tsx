import { useEffect, useState } from "react";
import api from "../../libs/axios";
import toast from "react-hot-toast";

type Guru = {
  id: number;
  nama: string;
  username: string;
  nuptk: string;
};

const TambahGuru = () => {
  const [form, setForm] = useState({
    nama: "",
    username: "",
    password: "",
    nuptk: "",
  });

  const [guruList, setGuruList] = useState<Guru[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchGuru = async () => {
    try {
      const { data } = await api.get("/guru");
      setGuruList(data.data);
    } catch (err) {
      toast.error("Gagal mengambil daftar guru");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/guru", { ...form, role: "guru" });
      toast.success("Guru berhasil ditambahkan");
      setForm({ nama: "", username: "", password: "", nuptk: "" });
      fetchGuru(); // refresh list
    } catch (err) {
      toast.error("Gagal menambahkan guru");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus guru ini?")) return;
    try {
      await api.delete(`/guru/${id}`);
      toast.success("Guru berhasil dihapus");
      fetchGuru(); // refresh list
    } catch (err) {
      toast.error("Gagal menghapus guru");
    }
  };

  useEffect(() => {
    fetchGuru();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="nama"
          placeholder="Nama Lengkap"
          value={form.nama}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="nuptk"
          placeholder="NUPTK"
          value={form.nuptk}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
        >
          Tambah Guru
        </button>
      </form>

      <div>
        <h2 className="text-lg font-semibold mb-2">Daftar Guru:</h2>
        <ul className="flex flex-col gap-2">
          {guruList.map((guru) => (
            <li
              key={guru.id}
              className="border p-2 rounded flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{guru.nama}</div>
                <div className="text-sm text-gray-600">{guru.username}</div>
                <div className="text-sm text-gray-500">NUPTK: {guru.nuptk}</div>
              </div>
              <div className="flex gap-2">
                <button
                  className="text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                  onClick={() => handleDelete(guru.id)}
                >
                  Hapus
                </button>
                {/* Tombol Edit bisa ditambahkan nanti */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TambahGuru;
