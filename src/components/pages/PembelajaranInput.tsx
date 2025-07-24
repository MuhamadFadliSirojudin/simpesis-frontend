import { useEffect, useState } from "react";
import Button from "../fragments/Button";
import Dropdown from "../fragments/Dropdown";
import TabelKegiatan from "../fragments/TableKegiatan";
import { Modul, Pembelajaran } from "../../types";
import api from "../../libs/axios";
import toast from "react-hot-toast";

const PembelajaranInput = () => {
  const [selected, setSelected] = useState<number>(0);
  const [listModul, setListModul] = useState<Modul[]>([]);
  const [listPembelajaran, setListPembelajaran] = useState<Pembelajaran[]>([]);

  const fetchModul = async () => {
    const { data } = await api.get("/modul");
    const addedData: Modul[] = [
      { id: 0, penyusun: "kosong", topik: "Pilih Modul", tujuan: "kosong" },
      ...data.data,
    ];

    setListModul(addedData);
  };

  const fetchPembelajaran = async () => {
    const { data } = await api.get(`/pembelajaran/${selected}`);

    setListPembelajaran(data.data);
  };

  const [formData, setFormData] = useState({
    nama: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addPembelajaran = async (e: React.FormEvent) => {
    e.preventDefault();

    const newFormData = { ...formData, modul_id: selected };
    try {
      await api.post("/pembelajaran", newFormData);
      fetchPembelajaran();
      toast.success("Berhasil menambahkan kegiatan pembelajaran");
    } catch (error) {
      toast.error("Gagal menambahkan kegiatan pembelajaran");
    } finally {
      setFormData({
        nama: "",
      });
    }
  };

  useEffect(() => {
    fetchModul();
  }, []);

  useEffect(() => {
    fetchPembelajaran();
  }, [selected]);

  return (
    <div className="min-h-[100vh] w-full flex flex-col items-center gap-5 justify-between bg-[#f4f4f9] p-8">
      <form
        onSubmit={addPembelajaran}
        className="flex flex-col shadow-form-container w-[50%]  bg-white p-[2rem] rounded-lg text-[#333] gap-7"
      >
        <h1 className="text-center font-semibold text-black text-2xl ">
          Tambah Kegiatan Pembelajaran
        </h1>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="topik" className="text-base font-semibold">
            Pilih Modul
          </label>
          <Dropdown
            options={listModul}
            value={selected}
            onChange={setSelected}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="nama" className="text-base font-semibold">
            Nama Kegiatan
          </label>
          <textarea
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="border border-[#ccc] rounded focus:border-blue-800 focus:outline-none p-1 w-full h-20 resize-none flex items-start justify-start "
          ></textarea>
        </div>
        <Button
          variant="custom"
          className="bg-blue-900 text-white hover:bg-blue-800 cursor-pointer"
        >
          Tambahkan
        </Button>
      </form>
      <TabelKegiatan data={listPembelajaran} fetch={fetchPembelajaran} />
    </div>
  );
};

export default PembelajaranInput;
