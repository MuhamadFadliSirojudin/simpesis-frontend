import { useEffect, useState } from "react";
import api from "../../libs/axios";
import toast from "react-hot-toast";

type Guru = {
  id: number;
  nama: string;
  username: string;
  nuptk: string;
};

const KelolaGuru = () => {
  const [form, setForm] = useState({
    id: null as number | null,
    nama: "",
    username: "",
    password: "",
    nuptk: "",
  });

  const [guruList, setGuruList] = useState<Guru[]>([]);
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchGuru = async () => {
    try {
      const res = await api.get("/guru");
      const list = Array.isArray(res.data) ? res.data : res.data.data || [];
      setGuruList(list);
    } catch (err) {
      toast.error("Gagal mengambil daftar guru");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && form.id) {
        await api.put(`/guru/${form.id}`, {
          nama: form.nama,
          username: form.username,
          nuptk: form.nuptk,
          ...(form.password && { password: form.password }),
        });
        toast.success("Guru berhasil diperbarui");
      } else {
        await api.post("/guru", { ...form, role: "guru" });
        toast.success("Guru berhasil ditambahkan");
      }
      setForm({ id: null, nama: "", username: "", password: "", nuptk: "" });
      setIsEdit(false);
      fetchGuru();
    } catch (err) {
      toast.error("Gagal menyimpan data guru");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus guru ini?")) return;
    try {
      await api.delete(`/guru/${id}`);
      toast.success("Guru berhasil dihapus");
      fetchGuru();
    } catch (err) {
      toast.error("Gagal menghapus guru");
    }
  };

  const handleEdit = (guru: Guru) => {
    setIsEdit(true);
    setForm({
      id: guru.id,
      nama: guru.nama,
      username: guru.username,
      password: "",
      nuptk: guru.nuptk,
    });
  };

  useEffect(() => {
    fetchGuru();
  }, []);

  return (
    <div className="min-h-[100vh] h-full w-full flex flex-col items-center gap-5 justify-around bg-[#f4f4f9] p-10">
      <form onSubmit={handleSubmit} 
      className="flex flex-col shadow-form-container w-[50%]  bg-white p-[2rem] rounded-lg text-[#333] gap-7">
        <h2 className="text-center font-semibold text-black text-2xl">
          {isEdit ? "Edit Guru" : "Tambah Guru"}
        </h2>
        <input
          type="text"
          name="nama"
          placeholder="Nama Lengkap"
          value={form.nama}
          onChange={handleChange}
          className="border border-[#ccc] rounded focus:border-blue-800 focus:outline-none p-1 w-full resize-none flex items-start justify-start h-10"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border border-[#ccc] rounded focus:border-blue-800 focus:outline-none p-1 w-full resize-none flex items-start justify-start h-10"
        />
        <div className="flex flex-col gap-1">
        <input
          type="password"
          name="password"
          placeholder={isEdit ? "Ubah Password (opsional)" : "Password"}
          value={form.password}
          onChange={handleChange}
          className="border border-[#ccc] rounded focus:border-blue-800 focus:outline-none p-1 w-full resize-none flex items-start justify-start h-10"
        />
        {isEdit && (
          <p className="text-xs text-gray-500 italic">
            Kosongkan jika tidak ingin mengganti password
          </p>
        )}
        </div>
        <input
          type="text"
          name="nuptk"
          placeholder="NUPTK"
          value={form.nuptk}
          onChange={handleChange}
          className="border border-[#ccc] rounded focus:border-blue-800 focus:outline-none p-1 w-full resize-none flex items-start justify-start h-10"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-900 text-white focus:outline-none p-1 w-full resize-none rounded hover:bg-blue-500"
          >
            {isEdit ? "Simpan Perubahan" : "Tambah Guru"}
          </button>
          {isEdit && (
            <button
              type="button"
              onClick={() => {
                setIsEdit(false);
                setForm({ id: null, nama: "", username: "", password: "", nuptk: "" });
              }}
              className="bg-blue-900 text-white focus:outline-none p-1 w-full resize-none rounded hover:bg-blue-500"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto rounded w-full">
        {guruList?.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
              Belum ada guru ditambahkan.
          </div>
        ) : (
        <table className="min-w-full bg-white border border-gray-200 text-left">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="px-4 py-2 border text-center">No</th>
              <th className="px-4 py-2 border text-center">Nama</th>
              <th className="px-4 py-2 border text-center">Username</th>
              <th className="px-4 py-2 border text-center">NUPTK</th>
              <th className="px-4 py-2 border text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {guruList.map((guru, index) => (
              <tr key={guru.id} className="hover:bg-blue-50 p-4 transition">
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{guru.nama}</td>
                <td className="px-4 py-2 border">{guru.username}</td>
                <td className="px-4 py-2 border">{guru.nuptk}</td>
                <td className="px-4 py-2 border">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      className="text-sm text-white cursor-pointer bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                      onClick={() => handleEdit(guru)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-sm text-white cursor-pointer bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                      onClick={() => handleDelete(guru.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
        </div>
    </div>
  );
};

export default KelolaGuru;
