import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function Layout() {
  return (
    <div className="relative min-h-screen-plus-200">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;

