import { useNavigate } from "react-router-dom";
import Button from "../../fragments/Button";
import academicsImage from "/academics.svg";

const Academics = () => {
  const navigate = useNavigate()
  return (
    <div className="flex w-full justify-between items-center" id="academics">
      <img src={academicsImage} alt="" width={450} />
      <div className="max-w-[45%] flex flex-col justify-between gap-5">
        <h1 className="text-6xl font-bold">Akademik Siswa</h1>
        <p className="text-xl">
          Catat momen belajar anak setiap hari dan lihat perkembangan mereka
          lewat laporan lengkap!
        </p>

        <div className="flex gap-5">
          <Button onClick={() => navigate("/penilaian")}>Input Nilai</Button>
          <Button variant="outline" onClick={() => navigate("/laporan")}>Laporan Siswa</Button>
        </div>
      </div>
    </div>
  );
};

export default Academics;
