import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout.tsx";
import Login from "./components/pages/Login.tsx";
import ModulInput from "./components/pages/ModulInput.tsx";
import PembelajaranInput from "./components/pages/PembelajaranInput.tsx";
import NilaiIInput from "./components/pages/NilaiIInput.tsx";
import Register from "./components/pages/Register.tsx";
import GetReport from "./components/pages/GetReport.tsx";
import SiswaInput from "./components/pages/SiswaInput.tsx";
import Menu from "./components/pages/Menu.tsx";
import DaftarGuru from "./components/pages/DaftarGuru";
import Contact from "./components/pages/Contact.tsx";
import { AuthProvider } from "./libs/auth-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/modul" element={<ModulInput />} />
            <Route path="/pembelajaran" element={<PembelajaranInput />} />
            <Route path="/penilaian" element={<NilaiIInput />} />
            <Route path="/siswa" element={<SiswaInput />} />
            <Route path="/laporan" element={<GetReport />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/daftar-guru" element={<DaftarGuru />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
