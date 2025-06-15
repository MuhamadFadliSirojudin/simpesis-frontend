import { useEffect, useState } from "react";
import api from "../../libs/axios";
import toast from "react-hot-toast";

type Admin = {
  id: number;
  nama: string;
  username: string;
  nuptk: string;
};

const KelolaAdmin = () => {
  const [form, setForm] = useState({
    id: null as number | null,
    nama: "",
    username: "",
    password: "",
    nuptk: "",
  });

  const [adminList, setAdminList] = useState<Admin[]>([]);
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchAdmin = async () => {
    try {
      const res = await api.get("/admin");
      const list = Array.isArray(res.data) ? res.data : res.data.data || [];
      setAdminList(list);
    } catch (err) {
      toast.error("Gagal mengambil daftar admin");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && form.id) {
        await api.put(`/admin/${form.id}`, {
          nama: form.nama,
          username: form.username,
          nuptk: form.nuptk,
          ...(form.password && { password: form.password }),
        });
        toast.success("Admin berhasil diperbarui");
      } else {
        await api.post("/admin", { ...form, role: "admin" });
        toast.success("admin berhasil ditambahkan");
      }
      setForm({ id: null, nama: "", username: "", password: "", nuptk: "" });
      setIsEdit(false);
      fetchAdmin();
    } catch (err) {
      toast.error("Gagal menyimpan data admin");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus admin ini?")) return;
    try {
      await api.delete(`/admin/${id}`);
      toast.success("admin berhasil dihapus");
      fetchAdmin();
    } catch (err) {
      toast.error("Gagal menghapus admin");
    }
  };

  const handleEdit = (admin: Admin) => {
    setIsEdit(true);
    setForm({
      id: admin.id,
      nama: admin.nama,
      username: admin.username,
      password: "",
      nuptk: admin.nuptk,
    });
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <div className="min-h-[100vh] h-full w-full flex flex-col items-center gap-5 justify-around bg-[#f4f4f9] p-10">
      <form onSubmit={handleSubmit} 
      className="flex flex-col shadow-form-container w-[50%]  bg-white p-[2rem] rounded-lg text-[#333] gap-7">
        <h2 className="text-center font-semibold text-black text-2xl">
          {isEdit ? "Edit Admin" : "Tambah Admin"}
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
            {isEdit ? "Simpan Perubahan" : "Tambah Admin"}
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
        {adminList?.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
              Belum ada admin ditambahkan.
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
            {adminList.map((admin, index) => (
              <tr key={admin.id} className="hover:bg-blue-50 p-4 transition">
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{admin.nama}</td>
                <td className="px-4 py-2 border">{admin.username}</td>
                <td className="px-4 py-2 border">{admin.nuptk}</td>
                <td className="px-4 py-2 border">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      className="text-sm text-white cursor-pointer bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                      onClick={() => handleEdit(admin)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-sm text-white cursor-pointer bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                      onClick={() => handleDelete(admin.id)}
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

export default KelolaAdmin;
