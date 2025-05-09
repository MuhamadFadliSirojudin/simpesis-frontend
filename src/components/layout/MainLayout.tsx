import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div className="flex flex-col justify-between h-full min-h-[100dvh]">
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
};

export default MainLayout;
