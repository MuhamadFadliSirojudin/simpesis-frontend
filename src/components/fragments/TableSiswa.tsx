import toast from "react-hot-toast";
import api from "../../libs/axios";
import { Siswa } from "../../types";
import { useNavigate } from "react-router-dom";

const TableSiswa = ({ data, fetch }: { data: Siswa[]; fetch: () => void }) => {
  const guruId = localStorage.getItem("guruId");
  const navigate = useNavigate(); // ✅ Tambahkan ini
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
              <th className="px-4 py-3 w-[10%] border text-center">No</th>
              <th className="px-4 py-3 border text-center">Nama</th>
              <th className="px-4 py-3 border text-center">Semester</th>
              <th className="px-4 py-3 border text-center">Kelompok</th>
              <th className="px-4 py-3 border text-center">Status</th>
              <th className="px-4 py-3 border text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((siswa, index) => (
              <tr
                key={index}
                className="border-b hover:bg-blue-50 p-4 transition"
              >
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{siswa.nama}</td>
                <td className="px-4 py-2 border">{siswa.semester}</td>
                <td className="px-4 py-2 border">{siswa.kelompok}</td>
                <td className="px-4 py-2 border text-center">{siswa.totalNilai && siswa.totalNilai > 0 ? "✅" : "❌"}</td>
                <td className="px-4 py-2 border">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      className="text-sm text-white cursor-pointer bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteSiswa(siswa.id);
                      }}
                    >
                      Hapus
                    </button>
                    <button
                      className="text-sm text-white cursor-pointer bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                      onClick={() => navigate(`/penilaian/${siswa.id}`)}
                    >
                      Lihat Penilaian
                    </button>
                  </div>
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
