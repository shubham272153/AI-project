import React, { useState } from "react";
import Sidebar from "./componenets/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import ChatBox from "./componenets/ChatBox";
import Cradits from "./pages/Cradits";
import Community from "./pages/Community";
import Loading from "./pages/Loading";
import { assets } from "./assets/assets";
import "./assets/prism.css";
import { useAppContext } from "./contexts/AppContext";
import Login from "./pages/Login";

const App = () => {
  const { user } = useAppContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { pathname } = useLocation();
  if (pathname === "/loading") return <Loading />;

  return (
    <>
      {!isMenuOpen && (
        <img
          src={assets.menu_icon}
          className="absolute top-3 left-3 w-8 h-8 cursor-progress md:hidden not-dark:invert "
          onClick={() => setIsMenuOpen(true)}
        />
      )}

      {user ? (
        <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white">
          <div className="flex h-screen w-screen">
            <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <Routes>
              <Route path="/" element={<ChatBox />} />
              <Route path="/credits" element={<Cradits />} />
              <Route path="/community" element={<Community />} />
              <Route path="/loading" element={<Loading />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-b from-[#242124] to-[#000000] h-screen w-screen flex items-center">
          <Login />
        </div>
      )}
    </>
  );
};

export default App;
