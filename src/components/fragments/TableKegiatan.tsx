import toast from "react-hot-toast";
import api from "../../libs/axios";
import { Pembelajaran } from "../../types";

type TabelKegiatanProps = {
  data: Pembelajaran[];
  fetch: () => void;
};

const TabelKegiatan: React.FC<TabelKegiatanProps> = ({ data, fetch }) => {
  const deleteKegiatan = async (id: number) => {
    try {
      const { data } = await api.delete(`/pembelajaran/${id}`);

      if (data) {
        toast.success("Berhasil menghapus modul");
      }
      fetch();
    } catch (error) {
      toast.error("Gagal menghapus modul yang mungkin memiliki nilai");
    }
  };
  return (
    <div className="overflow-x-autos rounded w-full">
      {data?.length === 0 ? (
        <div className="text-center text-gray-500 py-6">
          Belum ada data kegiatan atau belum memilih modul.
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded shadow">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="border px-4 py-3 w-[10%] text-center">No</th>
              <th className="border px-4 py-3 text-center">Nama Kegiatan</th>
              <th className="border px-4 py-3 w-[10%] text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((kegiatan, index) => (
              <tr key={index} className="border-b hover:bg-blue-50 transition">
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2">{kegiatan.nama}</td>
                <td className="px-4 py-2 border">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      className="text-sm text-white cursor-pointer bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteKegiatan(kegiatan.id);
                      }}
                    >
                      Hapus
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

export default TabelKegiatan;
