import Home from "./pages/Home";
import Staff from "./pages/Staff";
import Foods from "./pages/Foods";
import Orders from "./pages/Orders";
import MyBalance from "./pages/MyBalance";
import OrdersCashier from "./pages/OrdersCa";

interface RoutingTypes {
  path: string;
  component: React.ComponentType;
  role: Array<"OWNER" | "CASHER" | "WAITER">;
}

export const globalRouting: RoutingTypes[] = [
  {
    path: "/",
    component: Home,
    role: ["OWNER", "CASHER", "WAITER"],
  },
  {
    path: "/staff",
    component: Staff,
    role: ["OWNER"],
  },
  {
    path: "/foods",
    component: Foods,
    role: ["OWNER"],
  },

  {
    path: "/myorders",
    component: Orders,
    role: ["WAITER"],
  },

  {
    path: "/mybalance",
    component: MyBalance,
    role: ["WAITER"],
  },
  {
    path: "/orders-cashier",
    component: OrdersCashier,
    role: ["CASHER"],
  },
];
