import { useEffect } from "react";
import Academics from "./components/layout/Home/Academics";
import Hero from "./components/layout/Home/Hero";
import { useLocation } from "react-router-dom";


function App() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);
  return (
    <div className="flex flex-col gap-40 bg-blue-bg px-30 py-10 text-white">
      <Hero />
      <Academics />
    </div>
  );
}

export default App;
