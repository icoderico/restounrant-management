import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useMediaQuery } from "react-responsive";
import { Icons } from "../assets/incons";
import CheckUser from "./CheckUser";
import useUserStore from "../store/user";

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const { userData } = useUserStore();

  return (
    <div className="min-h-screen flex bg-gray-50 relative">
      <CheckUser />
      <aside
        className={`
    ${isDesktop ? "static" : "absolute z-40"}
    top-0 left-0 h-screen w-[260px] bg-second border-r shadow-md transition-transform duration-300
    ${isDesktop ? (isSidebarOpen ? "block" : "hidden") : ""}
    ${!isDesktop ? (isSidebarOpen ? "translate-x-0" : "-translate-x-full") : ""}
  `}
      >
        <Sidebar />
      </aside>

      {!isDesktop && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white px-4 py-3 shadow-md">
          <button
            className="text-gray-700 focus:outline-none text-2xl"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            {isSidebarOpen ? <Icons.PanelLeftClose /> : <Icons.Menu />}
          </button>
          <h1 className="text-xl font-bold text-gray-800">{userData?.name}</h1>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
          <footer className="mt-10 border-t pt-4 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Shuhrat's Project. All rights
            reserved.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Layout;
