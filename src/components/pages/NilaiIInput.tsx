import { useEffect, useState } from "react";
import { NilaiKegiatan } from "../../types";
import TablePenilaian from "../fragments/TabelPenilaian";
import Dropdown from "../fragments/Dropdown";
import TabelReportNilai from "../fragments/TabelReportNilai";
import { BaseDataNilai, Modul, Pembelajaran, Siswa } from "../../types";
import api from "../../libs/axios";
import DropdownSiswa from "../fragments/DropdownSiswa";
import { convertToStructuredArray, InputObject } from "../../libs/helper";
import toast from "react-hot-toast";

const NilaiIInput = () => {
  const [selectedModul, setSelectedModul] = useState<number>(0);
  const [selectedSiswa, setSelectedSiswa] = useState<number>(0);
  const [listModul, setListModul] = useState<Modul[]>([]);
  const [listSiswa, setListSiswa] = useState<Siswa[]>([]);
  const [listPembelajaran, setListPembelajaran] = useState<Pembelajaran[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nilaiList, setNilaiList] = useState<NilaiKegiatan[]>([]);

  const fetchSiswa = async () => {
    const { data } = await api.get("/siswa");
    const addedData: Siswa[] = [
      { id: 0, kelompok: "no", nama: "Pilih Siswa", semester: 0 },
      ...data.data,
    ];

    setListSiswa(addedData);
  };

  const fetchModul = async () => {
    const { data } = await api.get("/modul");
    const addedData: Modul[] = [
      { id: 0, penyusun: "kosong", topik: "Pilih Modul", tujuan: "kosong" },
      ...data.data,
    ];

    setListModul(addedData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (!selectedModul || !selectedSiswa) {
      toast.error("Modul atau siswa tidak boleh kosong");
      setIsLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const formDataObj = Object.fromEntries(formData.entries());
    const baseData: BaseDataNilai = {
      id_modul: selectedModul,
      id_siswa: selectedSiswa,
    };
    const { nama, semester, ...rest } = formDataObj;

    const sendArr = await convertToStructuredArray(
      rest as InputObject,
      baseData
    );

    console.log(sendArr);
    try {
      const res = await api.post("/nilai", {
        data: sendArr,
      });

      if (res.status) {
        toast.success("Berhasil menambahkan data penilaian");
        fetchNilaiList();
      }
    } catch (error: any) {
      if (error.status == 409) {
        toast.error("Nilai siswa dengan modul tersebut sudah ada");
        return;
      }
      toast.error("Terjadi kesalahan pada server");
    } finally {
      setIsLoading(false);
    }
  };

  const getPembelajaran = async () => {
    const { data } = await api.get(`/pembelajaran/${+selectedModul}`);
    setListPembelajaran(data.data);
  };

  const fetchNilaiList = async () => {
    if (!selectedSiswa) return;
    try {
      const { data } = await api.get(`/nilai/${selectedSiswa}`);
      setNilaiList(data.data);
    } catch (err) {
      console.error("Gagal ambil nilai siswa:", err);
    }
  };

  // ✅ Edit nilai
  const handleEditNilai = async (item: NilaiKegiatan) => {
    const newNilai = prompt("Masukkan nilai baru:", item.nilai.toString());
    if (!newNilai) return;

    try {
      await api.put(`/nilai/${item.id}`, { nilai: parseInt(newNilai) });
      toast.success("Nilai berhasil diperbarui");
      fetchNilaiList();
    } catch (err) {
      toast.error("Gagal update nilai");
    }
  };

  // ✅ Hapus nilai
  const handleDeleteNilai = async (id: number) => {
    if (!confirm("Yakin ingin menghapus nilai ini?")) return;

    try {
      await api.delete(`/nilai/${id}`);
      toast.success("Nilai berhasil dihapus");
      fetchNilaiList();
    } catch (err) {
      toast.error("Gagal menghapus nilai");
    }
  };

  useEffect(() => {
    fetchModul();
    fetchSiswa();
  }, []);

  useEffect(() => {
    getPembelajaran();
  }, [selectedModul]);

  useEffect(() => {
    fetchNilaiList();
  }, [selectedSiswa]);

  return (
    <div className="min-h-[100vh] w-full flex flex-col items-center gap-5 justify-between bg-[#f4f4f9] p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="flex shadow-form-container w-full  bg-white p-[2rem] rounded-lg text-[#333] gap-7">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="topik" className="text-base font-semibold">
              Pilih Modul
            </label>
            <Dropdown
              options={listModul}
              value={selectedModul}
              onChange={setSelectedModul}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="nama" className="text-base font-semibold">
              Nama siswa
            </label>
            <DropdownSiswa
              onChange={setSelectedSiswa}
              options={listSiswa}
              value={selectedSiswa}
            />
          </div>
        </div>
        <TablePenilaian data={listPembelajaran} isLoading={isLoading} />

        <TabelReportNilai
          data={nilaiList}
          onEdit={handleEditNilai}
          onDelete={handleDeleteNilai}
        />
      </form>
    </div>
  );
};

export default NilaiIInput;
