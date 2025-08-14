import { NilaiKegiatan } from "../../types";
import TabelReportNilai from "./TabelReportNilai";
import { forwardRef, Ref } from "react";

type Props = {
  data: NilaiKegiatan[];
};

const tanggalCetak = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const TabelReport = forwardRef<HTMLDivElement, Props>(
  ({ data }: { data: NilaiKegiatan[] }, ref: Ref<HTMLDivElement>) => {
    return !data || data.length == 0 ? (
      <h1 className="text-center py-10">
        Data tidak ditemukan atau belum dipilih
      </h1>
    ) : (
      <div ref={ref} className="w-full flex flex-col gap-5 py-10 px-10">
        <h1 className="text-center text-2xl font-bold">Laporan Nilai Siswa</h1>
        <table className="w-full min-w-full bg-white border border-gray-400 rounded-xl shadow">
          <tbody className="border border-gray-400">
            <tr className="h-16 border-b border-gray-400">
              <td className="align-top w-[35%] px-4 py-2">Semester</td>
              <td className="align-top px-4 py-2">{data[0].siswa.semester}</td>
            </tr>
            <tr className="h-16 border-b border-gray-400">
              <td className="align-top px-4 py-2">Wali Kelas</td>
              <td className="align-top px-4 py-2">{data[0]?.modul.penyusun}</td>
            </tr>
            <tr className="h-16 border border-gray-400">
              <td className="align-top px-4 py-2">Fase/Kelompok</td>
              <td className="align-top px-4 py-2">{data[0]?.siswa.kelompok}</td>
            </tr>
            <tr className="h-16 border-b border-gray-400">
              <td className="align-top px-4 py-2 rounded">
                Tujuan Pembelajaran
              </td>
              <td className="pl-8 align-top py-2">
                <ol className="list-decimal">
                  {data[0]?.modul.tujuan?.split("$").map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ol>
              </td>
            </tr>
            <tr className="h-16 border-b border-gray-400 rounded">
              <td className="align-top px-4 py-2 rounded">Topik/Sub Topik</td>
              <td className="align-top px-4 py-2 rounded">
                {data[0]?.modul.topik}
              </td>
            </tr>
            <tr className="h-16 border-b border-gray-400 rounded">
              <td className="align-top px-4 py-2 rounded">Nama Siswa</td>
              <td className="align-top px-4 py-2 rounded">
                {data[0].siswa.nama}
              </td>
            </tr>
          </tbody>
        </table>

        <TabelReportNilai data={data} />

        {/* Area tanda tangan */}
        <div className="w-full flex justify-around items-start pt-10">
          {/* Kolom Kepala Sekolah */}
          <div className="flex flex-col items-center text-xl gap-1">
            <p >Mengetahui :</p>
            <p >Kepala Sekolah</p>
            <div className="h-20" /> {/* Spacer tanda tangan */}
            <p className="font-semibold">Putri Irma Susanti, M.Pd.</p>
            <p className="font-semibold">NUPTK. 3859764665300042</p>
          </div>

          {/* Kolom Wali Kelas */}
          <div className="flex flex-col items-center text-xl gap-1">
            <p >Tasikmalaya, {tanggalCetak}</p>
            <p >Wali Kelas,</p>
            <div className="h-20" /> {/* Spacer tanda tangan */}
            <p className="font-semibold">{data[0].modul.penyusun}</p>
            <p className="font-semibold">NUPTK. {data[0].modul.nip}</p>
          </div>
        </div>
      </div>
    );
  }
);

export default TabelReport;
