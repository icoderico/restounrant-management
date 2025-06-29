import Home from "./pages/Home/index.tsx";

interface RoutingTypes {
  path: string;
  component: React.ComponentType;
}

export const globalRouting: RoutingTypes[] = [
  {
    path: "/",
    component: Home,
  },
];
