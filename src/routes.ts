import Home from "./pages/Home";
import Staff from "./pages/Staff";

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
];
