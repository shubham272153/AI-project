import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Loading = () => {
  const Navigate = useNavigate();
  const { fetchUser } = useAppContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUser();
      Navigate("/");
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#531BB1] to-[#29184B]  backdrop-opacity-60 flex justify-center items-center h-screen w-screen text-white text-2xl">
      <div className="w-10 h-10 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
