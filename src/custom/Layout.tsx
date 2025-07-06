import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useMediaQuery } from "react-responsive";
import { Icons } from "../assets/incons";
import CheckUser from "./CheckUser";
import useUserStore from "../store/user";

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const { userData } = useUserStore();

  useEffect(() => {
    if (!isDesktop && isSidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isSidebarOpen, isDesktop]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <CheckUser />

      <aside
        className={`
          fixed top-0 left-0 h-screen w-[260px] bg-second border-r shadow-md z-40
          transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          ${isDesktop ? "translate-x-0" : ""}
        `}
      >
        <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
        <NavLink
          to={"/auth"}
          className="border bottom-24 absolute  border-main w-[90%] left-[5%] inline-block text-center text-main font-semibold p-2"
        >
          Chiqish
        </NavLink>
      </aside>

      {/* Overlay for mobile */}
      {!isDesktop && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col w-full">
        <header className="flex items-center justify-between bg-white px-4 py-3 shadow-md">
          <button
            className="text-gray-700 focus:outline-none text-2xl"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            {isSidebarOpen ? <Icons.PanelLeftClose /> : <Icons.Menu />}
          </button>
          <h1 className="text-xl font-bold text-gray-800">{userData?.name}</h1>
        </header>

        <main
          className={`flex-1 p-2 transition-all ${
            isDesktop ? "ml-[260px]" : ""
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
