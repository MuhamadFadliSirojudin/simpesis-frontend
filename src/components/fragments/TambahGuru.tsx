import { useState } from "react";
import api from "../../libs/axios";
import toast from "react-hot-toast";

const TambahGuru = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [form, setForm] = useState({
    nama: "",
    username: "",
    password: "",
    nuptk: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/guru", { ...form, role: "guru" });
      toast.success("Guru berhasil ditambahkan");
      onSuccess?.();
      setForm({ nama: "", username: "", password: "", nuptk: "" });
    } catch (err) {
      toast.error("Gagal menambahkan guru");
    }
  };

  return (
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
  );
};

export default TambahGuru;
