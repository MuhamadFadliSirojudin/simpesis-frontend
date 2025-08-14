import toast from "react-hot-toast";
import Button from "../fragments/Button";
import api from "../../libs/axios";
import TableListModul from "../fragments/TableListModul";
import { Modul } from "../../types";
import { useEffect, useState } from "react";

const ModulInput = () => {
  const [listModul, setListModul] = useState<Modul[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    topik: "",
    penyusun: "",
    tujuan: "",
    nip: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.penyusun || !formData.topik || !formData.tujuan) {
      toast.error("Form tidak boleh kosong");
      return;
    }

    try {
      if (editId) {
        const res = await api.put(`/modul/${editId}`, formData);
        if (res.status) {
          toast.success("Berhasil memperbarui modul");
        }
      } else {
        const res = await api.post("/modul", formData);
        if (res.status) {
          toast.success("Berhasil menambahkan modul");
        }
      }
      fetchModul();
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan modul");
    } finally {
      setFormData({
        penyusun: "",
        topik: "",
        tujuan: "",
        nip: "",
      });
      setEditId(null);
    }
  };

  const fetchModul = async () => {
    const { data } = await api.get("/modul");
    setListModul(data.data);
  };

  const startEdit = async (id: number) => {
    try {
      const { data } = await api.get(`/modul/${id}`);
      if (data?.data) {
        setFormData({
          topik: data.data.topik || "",
          penyusun: data.data.penyusun || "",
          tujuan: data.data.tujuan || "",
          nip: data.data.nip || "",
        });
        setEditId(id);
      }
    } catch (error) {
      toast.error("Gagal mengambil data modul");
    }
  };

  useEffect(() => {
    fetchModul();
  }, []);

  return (
    <div className="min-h-[100vh] w-full flex gap-10 bg-[#f4f4f9] p-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col shadow-form-container w-[50%]  bg-white p-[2rem] rounded-lg text-[#333] gap-7"
      >
        <h1 className="text-center font-semibold text-black text-2xl ">
          {editId ? "Edit Modul" : "Tambah Modul"}
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="topik" className="text-base font-semibold">
            Nama Modul
          </label>
          <input
            type="text"
            id="topik"
            name="topik"
            value={formData.topik}
            onChange={handleChange}
            className="border border-[#ccc] rounded focus:border-blue-800 focus:outline-none p-1 w-full h-10"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="penyusun" className="text-base font-semibold">
              Wali Kelas
            </label>
            <input
              type="text"
              id="penyusun"
              name="penyusun"
              value={formData.penyusun}
              onChange={handleChange}
              className="border border-[#ccc] rounded focus:border-blue-800 focus:outline-none p-1 w-full h-10"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="nip" className="text-base font-semibold">
              NUPTK
            </label>
            <input
              type="text"
              id="nip"
              name="nip"
              value={formData.nip}
              onChange={handleChange}
              className="border border-[#ccc] rounded focus:border-blue-800 focus:outline-none p-1 w-full h-10"
            />
          </div>
          <label htmlFor="tujuan" className="text-base font-semibold">
            Tujuan Pembelajaran
            <p className="text-xs text-red-500">
              gunakan $ sebagai penanda ujung baris
            </p>
          </label>
          <textarea
            id="tujuan"
            name="tujuan"
            value={formData.tujuan}
            onChange={handleChange}
            className="border border-[#ccc] rounded focus:border-blue-800 focus:outline-none p-1 w-full h-50 resize-none flex items-start justify-start"
          ></textarea>
        </div>
        <Button
          variant="custom"
          className="bg-blue-900 text-white hover:bg-blue-800 cursor-pointer"
        >
          {editId ? "Simpan Perubahan" : "Tambahkan"}
        </Button>
      </form>
      <TableListModul data={listModul} fetch={fetchModul} onEdit={startEdit} />
    </div>
  );
};

export default ModulInput;
