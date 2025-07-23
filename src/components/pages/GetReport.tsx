import { useEffect, useRef, useState } from "react";
import Button from "../fragments/Button";
import Dropdown from "../fragments/Dropdown";
import TabelReport from "../fragments/TabelReport";
import api from "../../libs/axios";
import { Modul, NilaiKegiatan, Siswa } from "../../types";
import DropdownSiswa from "../fragments/DropdownSiswa";
import toast from "react-hot-toast";
import { useReactToPrint } from "react-to-print";
import swal from "../../libs/swal";

interface GetReportProps {
  siswaId?: string;
  kategori?: "harian" | "mingguan" | "bulanan" | "semester";
}

const GetReport: React.FC<GetReportProps> = ({ siswaId, kategori }) => {
  const [selectedModul, setSelectedModul] = useState<number>(0);
  const [selectedSiswa, setSelectedSiswa] = useState<number>(0);
  const [listModul, setListModul] = useState<Modul[]>([]);
  const [listSiswa, setListSiswa] = useState<Siswa[]>([]);
  const [reportData, setReportData] = useState<NilaiKegiatan[]>([]);

  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  const handleClickPrint = () => {
    handlePrint();
  };

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

  const getReport = async () => {
    if (!selectedModul || !selectedSiswa) {
      toast.error("Siswa atau modul belum dipilih");
      return;
    }

    const data = await api.get(
      `/nilai/${selectedSiswa}?modulId=${selectedModul}`
    );

    if (data.data.data.length === 0) {
      toast.error("Data belum ada");
    }

    setReportData(data.data.data);
  };

  const getReportFromKategori = async () => {
    if (!siswaId || !kategori) return;

    try {
      const { data } = await api.get(
        `/laporan?siswaId=${siswaId}&kategori=${kategori}`
      );
      setReportData(data);
    } catch (err) {
      toast.error("Gagal mengambil data laporan");
    }
  };

  const deleteKegiatan = async (modulId: number, siswaId: number) => {
    swal
      .fire({
        title: "Hapus laporan?",
        text: "Anda tidak bisa mengembalikannya",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const { data } = await api.delete(
              `/nilai?siswaId=${siswaId}&modulId=${modulId}`
            );
            if (data) {
              toast.success("Berhasil menghapus laporan nilai");
              window.location.reload();
            }
          } catch (error) {
            toast.error("Gagal menghapus laporan nilai");
          }
        }
      });
  };

  useEffect(() => {
    fetchModul();
    fetchSiswa();
  }, []);

  useEffect(() => {
    if (siswaId && kategori) {
      getReportFromKategori();
    }
  }, [siswaId, kategori]);

  useEffect(() => {
    fetchSiswa();
  }, [selectedModul]);

  return (
    <div className="px-30 py-10">
      {!siswaId && !kategori && (
        <div className="flex flex-col justify-between shadow-form-container w-full bg-white p-[2rem] rounded-lg text-[#333] gap-7">
          <div className="flex gap-10 justify-end items-end">
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
                Pilih siswa
              </label>
              <DropdownSiswa
                onChange={setSelectedSiswa}
                options={listSiswa}
                value={selectedSiswa}
              />
            </div>
          </div>
          <Button
            type="button"
            variant="custom"
            className="bg-blue-900 text-sm text-nowrap text-white hover:bg-blue-800 cursor-pointer h-12 px-15"
            onClick={getReport}
          >
            Ambil laporan nilai
          </Button>
        </div>
      )}

      <TabelReport data={reportData} ref={componentRef} />

      {reportData.length !== 0 && (
        <div className="w-full flex justify-end gap-10">
          <Button className="h-12" onClick={handleClickPrint}>
            Print Laporan
          </Button>
          {siswaId && kategori === "harian" && (
            <Button
              variant={"custom"}
              className="bg-red-600 text-white hover:bg-red-500 active:bg-red-700 h-12"
              onClick={() =>
                deleteKegiatan(reportData[0].id_modul, reportData[0].id_siswa)
              }
            >
              Hapus Laporan Nilai
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default GetReport;