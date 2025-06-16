// PenilaianHarian.tsx
import { useState } from "react";
import api from "../../libs/axios";
import toast from "react-hot-toast";

const PenilaianHarian = ({ siswaId }: { siswaId: string }) => {
  const [form, setForm] = useState({
    modul: "",
    pembelajaran: "",
    nilai: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/nilai", {
        siswaId: Number(siswaId),
        ...form,
        nilai: Number(form.nilai),
        kategori: "harian", // ⬅️ pastikan ada kategori harian
      });
      toast.success("Nilai berhasil ditambahkan");
      setForm({ modul: "", pembelajaran: "", nilai: "" });
    } catch (error) {
      toast.error("Gagal menambahkan nilai");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="modul"
        placeholder="Nama Modul"
        className="border p-2 rounded"
        value={form.modul}
        onChange={handleChange}
      />
      <input
        name="pembelajaran"
        placeholder="Jenis Pembelajaran"
        className="border p-2 rounded"
        value={form.pembelajaran}
        onChange={handleChange}
      />
      <input
        name="nilai"
        type="number"
        placeholder="Nilai"
        className="border p-2 rounded"
        value={form.nilai}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Simpan Nilai Harian
      </button>
    </form>
  );
};

export default PenilaianHarian;
