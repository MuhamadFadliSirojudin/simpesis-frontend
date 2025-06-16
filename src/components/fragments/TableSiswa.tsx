import toast from "react-hot-toast";
import api from "../../libs/axios";
import { Siswa } from "../../types";

const TableSiswa = ({ data, fetch }: { data: Siswa[]; fetch: () => void }) => {
  const guruId = localStorage.getItem("guruId");
  const deleteSiswa = async (id: number) => {
    try {
      const { data } = await api.delete(`/siswa/${id}?guruId=${guruId}`);
      if (data) {
        toast.success("Berhasil menghapus siswa");
      }
      fetch();
    } catch (error) {
      toast.error("Gagal menghapus siswa yang mungkin memiliki nilai");
    }
  };
  return (
    <div className="overflow-x-autos rounded w-full">
      {data?.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          Belum ada siswa ditambahkan.
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded shadow">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-4 py-3 w-[10%] text-center">No</th>
              <th className="px-4 py-3 text-left">Nama</th>
              <th className="px-4 py-3 text-left">Semester</th>
              <th className="px-4 py-3 text-left">Kelompok</th>
              <th className="px-4 py-3 w-[10%]"></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((siswa, index) => (
              <tr
                key={index}
                className="border-b hover:bg-blue-50 p-4 transition"
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2">{siswa.nama}</td>
                <td className="px-4 py-2">{siswa.semester}</td>
                <td className="px-4 py-2">{siswa.kelompok}</td>
                <td>
                  <button
                    className="px-4 py-2 text-red-700 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteSiswa(siswa.id);
                    }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableSiswa;
