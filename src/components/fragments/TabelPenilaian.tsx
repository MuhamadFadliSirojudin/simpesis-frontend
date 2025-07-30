import React from "react";
import { NilaiProps } from "../../types";

const opsiNilai = [
  "Belum Muncul",
  "Muncul Sebagian Kecil",
  "Sudah Muncul di Sebagian Besar",
  "Semuanya Muncul",
];

const TablePenilaian: React.FC<NilaiProps> = ({
  data,
  onChangeNilai,
  onChangeFile,
  isLoading,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-md bg-white text-sm">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="border px-4 py-3 text-center w-[25%]">
              Kegiatan Pembelajaran
            </th>
            <th className="border px-4 py-3 text-center">Foto Karya</th>
            {opsiNilai.map((opt) => (
              <th key={opt} className="border px-4 py-2 text-center">
                {opt}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500 italic">
                Belum ada kegiatan ditambahkan atau modul belum dipilih
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="border-t h-12">
                <td className="border px-4 py-2">{item.nama}</td>
                <td className="border px-4 py-2">
                  <input
                    type="file"
                    accept="image/*"
                    name={`foto${item.id}`}
                    onChange={(e) =>
                      onChangeFile &&
                      onChangeFile(item.id, e.target.files?.[0] ?? null)
                    }
                    className="text-sm"
                  />
                </td>
                {opsiNilai.map((opt, i) => (
                  <td key={opt} className="border px-4 py-2 text-center">
                    <input
                      type="radio"
                      name={`nilai${item.id}`}
                      value={i + 1}
                      onChange={() =>
                        onChangeNilai && onChangeNilai(item.id, opt)
                      }
                      className="accent-blue-700"
                    />
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {data.length > 0 && (
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 disabled:opacity-75"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TablePenilaian;
