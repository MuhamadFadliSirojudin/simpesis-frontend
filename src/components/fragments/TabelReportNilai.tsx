import { NilaiKegiatan } from "../../types";

const opsiNilai = [
  "Belum Muncul",
  "Muncul Sebagian Kecil",
  "Sudah Muncul di Sebagian Besar",
  "Semuanya Muncul",
];

const TabelReportNilai = ({ data }: { data: NilaiKegiatan[] }) => {
  return (
    <table className="min-w-full border border-gray-300 rounded-md bg-white text-sm">
      <thead className="bg-blue-900 text-white">
        <tr>
          <th className="px-4 py-3 text-center w-[30%] border border-black">
            Kegiatan Pembelajaran
          </th>
          <th className="px-4 py-3 text-center border border-black">
            Foto Karya
          </th>
          {opsiNilai.map((opt) => (
            <th
              key={opt}
              className="px-4 py-3 text-center w-[12%] border border-black"
            >
              {opt}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center py-6 text-gray-500 italic ">
              Belum ada kegiatan ditambahkan atau modul belum dipilih
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item.id} className="border border-gray-400">
              <td className="px-4 py-2 border border-gray-400">
                {item.pembelajaran.nama}
              </td>
              <td className="px-4 py-2 border border-gray-400">
                <img
                  src={item.foto_karya}
                  className="w-full"
                  alt="Foto rusak/tidak ada"
                />
              </td>
              {opsiNilai.map((opt, i) => (
                <td
                  key={opt}
                  className="px-4 py-2 text-center border border-gray-400"
                >
                  {item.nilai === i + 1 ? "√" : " "}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TabelReportNilai;
