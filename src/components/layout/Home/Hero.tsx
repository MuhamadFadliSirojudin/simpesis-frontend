import { useNavigate } from "react-router-dom";
import Button from "../../fragments/Button";
import homeImage from "/home.svg";
import { useEffect, useState } from "react";
import { useAuth } from "../../../libs/auth-context";

const Hero = () => {
  const navigate = useNavigate();
  const [, setToken] = useState<string | null>(null);

  const { login, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    logout();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      login("admin");
      setToken(token);
    }
  }, []);

  return (
    <div className="flex w-full justify-between items-center">
      <div className="max-w-[45%] flex flex-col justify-between gap-5">
        <h1 className="text-6xl font-bold">Sistem Penilaian Anak Usia Dini</h1>
        <p className="text-xl">
          Membantu guru mendokumentasikan perkembangan siswa secara objektif dan
          menyeluruh.
        </p>

        <div className="flex gap-5">
          <Button
            className="px-10 cursor-pointer"
            onClick={
              isAuthenticated ? () => handleLogout() : () => navigate("/login")
            }
          >
            {isAuthenticated ? "Logout" : "Login"}
          </Button>
          <Button variant="outline" onClick={() => navigate("/laporan")}>
            Laporan Siswa
          </Button>
        </div>
      </div>
      <img src={homeImage} alt="" width={450} />
    </div>
  );
};

export default Hero;
