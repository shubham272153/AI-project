import React, { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { assets } from "../assets/assets";
import moment from "moment";
import toast from "react-hot-toast";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const {
    chats,
    setSelectedChat,
    theme,
    setTheme,
    user,
    navigate,
    createNewChat,
    axios,
    setChats,
    fetchUsersChats,
    setToken,
    token,
  } = useAppContext();

  const [search, setSearch] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logout successFully");
  };

  const deleteChat = async (e, chatId) => {
    try {
      e.stopPropagation();
      const confirm = window.confirm(
        "Are you sure you want to delete this chat ?"
      );
      if (!confirm) return;
      const { data } = await axios.post(
        "/api/chat/delete",
        { chatId },
        { headers: { Authorization: token } }
      );
      if (data.success) {
        setChats((prev) => prev.filter((chat) => chat._id !== chatId));
        await fetchUsersChats();
        toast.success(data.message);
      }
    } catch (error) {
      toast.success(error.message);
    }
  };

  // ✅ Filter chats by latest message or name
  const filteredChats = chats.filter((chat) => {
    if (!search) return true;
    const latestMsg = chat.messages?.[chat.messages.length - 1]?.content || "";
    return (
      latestMsg.toLowerCase().includes(search.toLowerCase()) ||
      chat.name?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div
      className={`flex flex-col h-screen min-w-72 p-5 dark:bg-gradient-to-b from-[#242124]/30 border-r border-[#80609F]/30 backdrop-blur-3xl transition-all duration-500 max-md:absolute  left-0 z-1 bg-white dark:bg-[#1a1a1a]
      ${!isMenuOpen && "max-md:-translate-x-full"}`}
    >
      {/* Logo */}
      <img
        src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
        alt="Logo"
        className="w-full max-w-48"
      />

      {/* New Chat Button */}
      <button
        onClick={createNewChat}
        className="flex justify-center items-center w-full py-2 mt-10 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-md cursor-pointer"
      >
        <span className="mr-2 text-xl">+</span>
        New Chat
      </button>

      {/* Search Conversation */}
      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md">
        <img
          src={assets.search_icon}
          alt="Search"
          className="w-4 invert dark:invert-0"
        />
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search conversation"
          className="text-xs placeholder:text-gray-400 outline-none bg-transparent flex-1"
        />
      </div>

      {/* Recent Chats */}
      {chats.length > 0 && <p className="mt-4 text-sm">Recent chats</p>}
      <div className="flex-1 overflow-y-auto mt-3 text-sm space-y-3 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-[#80609F]/30">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => {
                navigate("/");
                setSelectedChat(chat);
                setIsMenuOpen(false);
              }}
              className="p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group hover:bg-gray-100 dark:hover:bg-[#57317C]/20"
            >
              <div>
                <p className="truncate w-full">
                  {chat.messages?.length > 0
                    ? chat.messages[chat.messages.length - 1]?.content.slice(
                        0,
                        30
                      )
                    : chat.name || "Untitled"}
                </p>
                <p className="text-xs text-gray-500 dark:text-[#B1A6C0]">
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>
              <img
                src={assets.bin_icon}
                className="hidden group-hover:block w-4 cursor-pointer dark:invert"
                alt="Delete"
                onClick={(e) => {
                  toast.promise(deleteChat(e, chat._id), {
                    loading: "deleting...",
                  });
                }}
              />
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-500 text-center mt-5">
            No chats found
          </p>
        )}
      </div>

      {/* Community Image */}
      <div
        onClick={() => {
          navigate("/community");
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-105 transition-all"
      >
        <img
          src={assets.gallery_icon}
          className="w-4.5 dark:invert"
          alt="Community"
        />
        <div className="flex flex-col text-sm">
          <p>Community Image</p>
        </div>
      </div>

      {/* Credits */}
      <div
        onClick={() => {
          navigate("/credits");
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-105 transition-all"
      >
        <img
          src={assets.diamond_icon}
          className="w-4.5 dark:invert"
          alt="Credits"
        />
        <div className="flex flex-col text-sm">
          <p>Credits : {user?.credits}</p>
          <p className="text-xs text-gray-400">
            Purchase credits to use SmartGPT
          </p>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md">
        <div className="flex justify-between items-center gap-2 text-sm">
          <img
            src={assets.theme_icon}
            className="w-4.5 dark:invert"
            alt="Theme"
          />
          <p>Dark Mode</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer ml-auto">
          <input
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            type="checkbox"
            className="sr-only peer"
            checked={theme === "dark"}
          />
          <div className="w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all"></div>
          <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full peer-checked:translate-x-4 transition-transform"></span>
        </label>
      </div>

      {/* User Account */}
      <div className="flex items-center gap-3 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer group">
        <img src={assets.user_icon} className="w-7 rounded-full" alt="" />
        <p className="flex-1 text-sm dark:text-primary truncate">
          {user ? user.name : "Login your account"}
        </p>
        {user && (
          <img
            src={assets.logout_icon}
            className="h-5 cursor-pointer hidden invert dark:invert-0 group-hover:block"
            alt="Logout"
            onClick={logout}
          />
        )}
      </div>

      {/* Mobile Close Button */}
      <img
        onClick={() => setIsMenuOpen(false)}
        src={assets.close_icon}
        className="absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden invert dark:invert-0"
        alt="Close"
      />
    </div>
  );
};

export default Sidebar;
