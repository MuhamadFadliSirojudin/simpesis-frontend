import { NilaiKegiatan } from "../../types";

interface TabelReportNilaiProps {
  data: NilaiKegiatan[];
  onEdit?: (item: NilaiKegiatan) => void;
  onDelete?: (id: number) => void;
  showActions?: boolean; // default true
}

const opsiNilai = [
  "Belum Muncul",
  "Muncul Sebagian Kecil",
  "Sudah Muncul di Sebagian Besar",
  "Semuanya Muncul",
];

const TabelReportNilai: React.FC<TabelReportNilaiProps> = ({
  data,
  onEdit,
  onDelete,
  showActions = true
}) => {
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
          {showActions && <th className="border px-4 py-3 text-center w-[15%]">
            Aksi
          </th>}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={opsiNilai.length + 3} className="text-center py-6 text-gray-500 italic ">
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
              {showActions && (
                <td className="px-4 py-2 border">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => onEdit && onEdit(item)}
                      className="text-sm text-white cursor-pointer bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(item.id)}
                      className="text-sm text-white cursor-pointer bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TabelReportNilai;
