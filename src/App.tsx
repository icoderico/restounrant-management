import { Route, Routes } from "react-router-dom";
import { globalRouting } from "./routes";
import Layout from "./custom/Layout";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer autoClose={2000} position="top-center" />

      <Routes>
        <Route path="/" element={<Layout />}>
          {globalRouting.map((route) => (
            <Route
              path={route.path}
              element={<route.component />}
              key={route.path}
            />
          ))}
        </Route>
        <Route path="/auth" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
