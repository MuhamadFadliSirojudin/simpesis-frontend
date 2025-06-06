import toast from "react-hot-toast";
import api from "../../libs/axios";
import { Modul } from "../../types";

const TableListModul = ({
  data,
  fetch,
}: {
  data: Modul[];
  fetch: () => void;
}) => {
  const deleteModul = async (id: number) => {
    try {
      const { data } = await api.delete(`/modul/${id}`);
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
              <th className="px-4 py-3 w-[10%] text-center">No</th>
              <th className="px-4 py-3 text-left">Topik/Sub Topik</th>
              <th className="px-4 py-3 w-[10%]"></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((modul, index) => (
              <tr
                key={index}
                className="border-b hover:bg-blue-50 p-4 transition"
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2">{modul.topik}</td>
                <td>
                  <button
                    className="px-4 py-2 text-red-700 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteModul(modul.id);
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

export default TableListModul;
