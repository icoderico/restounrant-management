import { NavLink } from "react-router-dom";
import { Icons } from "../assets/incons";
import React from "react";
import meenuLogo from "../assets/logo.png";
import useUserStore from "../store/user";
import { Skeleton } from "../components/ui/skeleton";
import { useMediaQuery } from "react-responsive";

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  container: React.ReactNode;
}

interface SidebarRouteTypes {
  label: string;
  icon: React.ReactNode;
  container: React.ReactNode;
  role: Array<"OWNER" | "CASHER" | "WAITER">;
  specialValue?: string;
}

const sidebarRoutes: SidebarRouteTypes[] = [
  {
    label: "Xodimlar",
    icon: <Icons.Users />,
    container: <NavLink to={"/staff"} />,
    role: ["OWNER"],
  },
  {
    label: "Taomlar boshqaruvi",
    icon: <Icons.Soup />,
    container: <NavLink to={"/foods"} />,
    role: ["OWNER"],
  },
  {
    label: "Monitoring",
    icon: <Icons.ChartNoAxesCombined />,
    container: <NavLink to={"/"} />,
    role: ["OWNER", "CASHER"],
  },
  {
    label: "Qarzlar",
    icon: <Icons.Coins />,
    container: <NavLink to={"/"} />,
    role: ["OWNER", "CASHER"],
  },
  {
    label: "Tariflar",
    icon: <Icons.Wallet />,
    container: <NavLink to={"/"} />,
    role: ["OWNER"],
  },

  {
    label: "Buyurtmalar",
    icon: <Icons.HandPlatter />,
    container: <NavLink to={"/myorders"} />,
    role: ["WAITER"],
  },
  {
    label: "Maoshim",
    icon: <Icons.Banknote />,
    container: <NavLink to={"/mybalance"} />,
    role: ["WAITER"],
  },
  {
    label: "Buyurtmalar",
    icon: <Icons.ListOrdered />,
    container: <NavLink to={"/orders-cashier"} />,
    role: ["CASHER"],
  },
];

const SidebarItem: React.FC<SidebarItem> = ({ label, icon, container }) => {
  const containerChildren = (
    <div className="flex items-center gap-2 bg-main text-white p-2 rounded-md border hover:bg-white hover:text-main hover:border hover:border-main ">
      {icon} <h2>{label}</h2>{" "}
    </div>
  );
  const resultContainer = React.isValidElement(container) ? container : <div />;
  return React.cloneElement(resultContainer, {}, containerChildren);
};

const Sidebar: React.FC<{
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsSidebarOpen }) => {
  const { userData } = useUserStore();
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <div className="w-full p-3 relative">
      <img className="w-1/3 mx-auto" src={meenuLogo} alt="" />
      <div className="flex pt-5 flex-col gap-2">
        {userData ? (
          <div className="flex flex-col gap-2">
            {sidebarRoutes
              .filter((route) => route.role.includes(userData?.role))
              .map((route, index) => (
                <div
                  onClick={() => (!isDesktop ? setIsSidebarOpen(false) : null)}
                >
                  <SidebarItem
                    key={index}
                    label={route.label}
                    icon={route.icon}
                    container={route.container}
                  />
                </div>
              ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {[...Array(3)].map((_, index) => (
              <Skeleton
                key={index}
                className="h-[40px] w-full rounded-md bg-gray-300"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
