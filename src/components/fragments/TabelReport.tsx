import { NilaiKegiatan } from "../../types";
import TabelReportNilai from "./TabelReportNilai";
import { forwardRef, Ref } from "react";

type Props = {
  data: NilaiKegiatan[];
};

const TabelReport = forwardRef<HTMLDivElement, Props>(
  ({ data }: { data: NilaiKegiatan[] }, ref: Ref<HTMLDivElement>) => {
    return !data || data.length == 0 ? (
      <h1 className="text-center py-10">
        Data tidak ditemukan atau belum dipilih
      </h1>
    ) : (
      <div ref={ref} className="w-full flex flex-col gap-5 py-10 px-10">
        <h1 className="text-center text-2xl font-bold">Nilai Semester Siswa</h1>
        <table className="w-full min-w-full bg-white border border-gray-400 rounded-xl shadow">
          <tbody className="border border-gray-400">
            <tr className="h-16 border-b border-gray-400">
              <td className="align-top w-[35%] px-4 py-2">Semester</td>
              <td className="align-top px-4 py-2">{data[0].siswa.semester}</td>
            </tr>
            <tr className="h-16 border-b border-gray-400">
              <td className="align-top px-4 py-2">Penyusun</td>
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
              <td className="align-top px-4 py-2 rounded">test</td>
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
        <div className="w-full flex flex-row justify-between pr-10 pl-10 pt-20 text-xl">
          <div className="flex flex-col items-center gap-20">
            <h1>Mengetahui:</h1>
            <h1>Kepala Sekolah</h1>
        </div>
        <div className="flex flex-col items-center gap-16">
          <h1>{data[0].modul.penyusun}</h1>
          <h1>NIP.{data[0].modul.nip}</h1>
        </div>
      </div>
      </div>
    );
  }
);

export default TabelReport;
