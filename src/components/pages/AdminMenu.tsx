import { BookOpen, ClipboardList, FileText, Home, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminMenu = () => {
  const navigate = useNavigate();
  const menuItems = [
    { label: "Siswa", icon: <Users className="w-5 h-5" /> },
    { label: "Modul", icon: <BookOpen className="w-5 h-5" /> },
    { label: "Pembelajaran", icon: <Home className="w-5 h-5" /> },
    { label: "Penilaian", icon: <ClipboardList className="w-5 h-5" /> },
    { label: "Laporan", icon: <FileText className="w-5 h-5" /> },
  ];
  return (
    <div className="w-full bg-white shadow-lg border-r px-30 py-10">
      <h1 className="text-xl font-bold mb-6">Menu Utama</h1>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.label}>
            <button
              className="w-full flex items-center gap-3 h-14 px-3 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition border border-gray-300"
              onClick={() => navigate(`/${item.label.toLowerCase()}`)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminMenu;
