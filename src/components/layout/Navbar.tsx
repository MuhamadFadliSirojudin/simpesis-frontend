import { NavLink } from "react-router-dom";
import { useAuth } from "../../libs/auth-context";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const role = localStorage.getItem("role"); // Ambil langsung agar selalu up to date

  return (
    <div className="flex w-full justify-between items-center py-12 bg-blue-bg px-30 text-white">
      <h1 className="font-bold text-3xl">TK LabSchool UPI</h1>

      <ul className="flex gap-20 font-light">
        <li>
          <NavLink to={"/#home"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/#academics"}>Academics</NavLink>
        </li>
        <li>
          <NavLink to={"/contact"}>Contact</NavLink>
        </li>

        {isAuthenticated && role === "admin" && (
          <li>
            <NavLink to={"/menu"}>Menu</NavLink>
          </li>
        )}

        {isAuthenticated && role === "guru" && (
          <li>
            <NavLink to={"/daftar-guru"}>Daftar Guru</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
