import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./MobileNav/Navbar";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="flex flex-col">
      <div className=" md:hidden">
        <Navbar />
      </div>
      <div className="fixed left-0 hidden h-[96%] md:m-3 md:block md:w-[18%]">
        <Sidebar />
      </div>
      <div className="mt-20 flex flex-col gap-8 md:mt-4 md:ml-[19.5%]">
        <div className="mx-1.5 md:mx-3">
          <Outlet />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
