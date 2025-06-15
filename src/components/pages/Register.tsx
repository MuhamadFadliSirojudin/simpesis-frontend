import { NavLink, useNavigate } from "react-router-dom";
import Button from "../fragments/Button";
import api from "../../libs/axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formDataObj = Object.fromEntries(formData.entries());

    if (
      !formDataObj.nama ||
      !formDataObj.username ||
      !formDataObj.password ||
      !formDataObj.confirmPassword ||
      !formDataObj.nuptk
    ) {
      toast.error("Form tidak boleh kosong!");
      return;
    }

    if (formDataObj.password !== formDataObj.confirmPassword) {
      toast.error("Password dan konfirmasi password tidak sama");
      return;
    }

    try {
      const res = await api.post("/auth/register", formDataObj);

      if (res) {
        toast.success("berhasil membuat akun");
        navigate("/login");
      }
    } catch (error: any) {
      if (error.response?.status == 409) {
        toast.error("akun dengan username sama sudah terdaftar");
        return;
      }
      toast.error("error login");
    }
  };

  return (
    <div className="flex items-center justify-center bg-blue-bg px-30 py-10 text-white">
      <div className="bg-[#535252] flex flex-col w-[70%] md:w-[35%] p-10 rounded-xl gap-10">
        <h1 className="text-center text-4xl">Login Administrator</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <label htmlFor="nama">Nama Lengkap</label>
            <input
              className="bg-white text-black rounded-lg h-8 px-2"
              type="text"
              id="nama"
              name="nama"
            />
            <label htmlFor="username">Username</label>
            <input
              className="bg-white text-black rounded-lg h-8 px-2"
              type="text"
              id="username"
              name="username"
            />
            <label htmlFor="password">Password</label>
            <input
              className="bg-white text-black rounded-lg h-8 px-2"
              type="password"
              id="password"
              name="password"
            />
            <label htmlFor="confirm-password">Konfirmasi Password</label>
            <input
              className="bg-white text-black rounded-lg h-8 px-2"
              type="password"
              id="confirm-password"
              name="confirmPassword"
            />
            <label htmlFor="nuptk">NUPTK</label>
            <input
              className="bg-white text-black rounded-lg h-8 px-2"
              type="text"
              id="nuptk"
              name="nuptk"
            />
          </div>
          <Button className="bg-indigo-600">Register</Button>
        </form>
        <p className="text-center">
          Sudah punya akun?{" "}
          <NavLink to={"/login"} className={"underline"}>
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
