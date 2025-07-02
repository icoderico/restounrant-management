import Home from "./pages/Home";
import Staff from "./pages/Staff";
import Foods from "./pages/Foods";
import FoodsWaiter from "./pages/FoodsWaiter";
import Orders from "./pages/Orders";

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
    path: "/foods-waiter",
    component: FoodsWaiter,
    role: ["WAITER"],
  },
  {
    path: "/myorders",
    component: Orders,
    role: ["WAITER"],
  },
];
