import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Dashboard from "./components/Dashboard";
export default function Layout() {
  return (
    <div>
      <Header />
      <Dashboard />

      <div style={{ marginLeft: "220px", marginTop: "90px" }}>
  <Outlet />
</div>
    </div>
  );
}
