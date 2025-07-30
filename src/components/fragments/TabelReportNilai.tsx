import { NilaiKegiatan } from "../../types";

const opsiNilai = [
  "Belum Muncul",
  "Muncul Sebagian Kecil",
  "Sudah Muncul di Sebagian Besar",
  "Semuanya Muncul",
];

const TabelReportNilai = ({ data }: { data: NilaiKegiatan[] }) => {
  return (
    <table className="min-w-full border border-gray-200 rounded shadow bg-white">
      <thead className="bg-blue-900 text-white">
        <tr>
          <th className="border px-4 py-3 text-center w-[30%]">
            Kegiatan Pembelajaran
          </th>
          <th className="border px-4 py-3 text-center">
            Foto Karya
          </th>
          {opsiNilai.map((opt) => (
            <th
              key={opt}
              className="border px-4 py-3 text-center w-[12%]"
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
            <tr key={item.id} className="border hover:bg-blue-50 transition">
              <td className="px-4 py-2 border">
                {item.pembelajaran.nama}
              </td>
              <td className="px-4 py-2 border">
                <img
                  src={item.foto_karya}
                  className="w-full"
                  alt="Foto rusak/tidak ada"
                />
              </td>
              {opsiNilai.map((opt, i) => (
                <td
                  key={opt}
                  className="px-4 py-2 text-center border"
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
