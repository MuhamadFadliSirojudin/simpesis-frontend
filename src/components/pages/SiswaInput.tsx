import { useEffect, useState } from "react";
import Button from "../fragments/Button";
import TableSiswa from "../fragments/TableSiswa";
import { Siswa } from "../../types";
import toast from "react-hot-toast";
import api from "../../libs/axios";
import { useParams } from "react-router-dom";

const SiswaInput = () => {
  const { guruId } = useParams();
  
  useEffect(() => {
    if (guruId) {
      localStorage.setItem("guruId", guruId);
    }
  }, [guruId]);

  const [listSiswa, setListSiswa] = useState<Siswa[]>([]);
  const [formData, setFormData] = useState({
    nama: "",
    semester: "",
    kelompok: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchSiswa = async () => {
    const guruId = localStorage.getItem("guruId");
    if (!guruId) {
      toast.error("Gagal mengambil data siswa: ID guru tidak ditemukan");
      return;
    }
    const { data } = await api.get(`/siswa?guruId=${guruId}`);

    setListSiswa(data.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nama, kelompok, semester } = formData;
    if (!nama || !kelompok || !semester) {
      toast.error("Semua Form Wajib diisi!");
      return;
    }
    const guruId = localStorage.getItem("guruId");
    if (!guruId) {
      toast.error("Gagal menambahkan siswa: ID guru tidak ditemukan");
      return;
    }

    try {
      console.log("Guru ID:", guruId);
      const res = await api.post("/siswa", { ...formData, guruId: Number(guruId)});
      if (res.status) {
        fetchSiswa();
        toast.success("Berhasil menambahkan siswa");
      }
    } catch (error) {
      toast.error("Gagal menambahkan siswa");
    } finally {
      setFormData({
        nama: "",
        semester: "",
        kelompok: "",
      });
    }
  };

  useEffect(() => {
    fetchSiswa();
  }, []);

  return (
    <div className="min-h-[100vh] h-full w-full flex flex-col items-center gap-5 justify-around bg-[#f4f4f9] p-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col shadow-form-container w-[50%]  bg-white p-[2rem] rounded-lg text-[#333] gap-7"
      >
        <h1 className="text-center font-semibold text-black text-2xl ">
          Tambah Siswa
        </h1>
        <div className="flex w-full gap-5">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="nama" className="text-base font-semibold">
              Nama siswa
            </label>
            <input
              id="nama"
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="border border-[#ccc] rounded focus:border-blue-800 focus:outline-none p-1 w-full resize-none flex items-start justify-start h-10"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="semester" className="text-base font-semibold">
              Semester
            </label>
            <input
              id="semester"
              type="number"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              min={1}
              className="border border-[#ccc] rounded focus:border-blue-800 focus:outline-none p-1 w-full resize-none flex items-start justify-start h-10"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="kelompok" className="text-base font-semibold">
            Nama Kelompok
          </label>
          <input
            id="kelompok"
            type="text"
            name="kelompok"
            value={formData.kelompok}
            onChange={handleChange}
            className="border border-[#ccc] rounded focus:border-blue-800 focus:outline-none p-1 w-full resize-none flex items-start justify-start h-10"
          />
        </div>
        <Button
          variant="custom"
          className="bg-blue-900 text-white hover:bg-blue-800 cursor-pointer"
        >
          Tambahkan
        </Button>
      </form>
      <TableSiswa data={listSiswa} fetch={fetchSiswa} />
    </div>
  );
};

export default SiswaInput;
