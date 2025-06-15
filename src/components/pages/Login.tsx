import toast from "react-hot-toast";
import api from "../../libs/axios";
import Button from "../fragments/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../libs/auth-context";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formDataObj = Object.fromEntries(formData.entries());
    try {
      const res = await api.post("/auth/login", formDataObj);

      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("role", res.data.role); // ⬅️ tambahkan baris ini
      localStorage.setItem("username", res.data.username); // opsional
      login();
      
      // Redirect sesuai role
      const role = res.data.role;

      if (role === "admin") {
        navigate("/menu");
      } else if (role === "guru") {
        navigate("/daftar-guru");
      }

      toast.success("login berhasil");
    } catch (error: any) {
      console.log(error);
      toast.error("Error login");
    }
  };
  return (
    <div className="flex items-center justify-center bg-blue-bg px-30 py-10 text-white">
      <div className="bg-[#535252] flex flex-col w-[70%] md:w-[35%] p-10 rounded-xl gap-10">
        <h1 className="text-center text-4xl">Login Administrator</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
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
          </div>
          <Button className="bg-indigo-600 cursor-pointer hover:bg-indigo-500 active:bg-indigo-700">
            Login
          </Button>
        </form>
        <p className="text-center">
          Belum punya akun?{" "}
          <NavLink to={"/register"} className={"underline"}>
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
