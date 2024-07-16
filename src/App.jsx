import React from "react";
import "./App.css";
import SideBar from "./Components/SideBar/SideBar";
import { Outlet } from "react-router";
import NavBar from "./Components/NavBar/NavBar";
import { SidebarProvider } from "./Context/SidebarContext/SidebarContext";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <SidebarProvider>
        <div className="flex w-full h-full">
          <SideBar />
          <div className="flex flex-col w-full h-full">
            <div className="min-h-16">
              <NavBar />
            </div>

            <div className=" h-full overflow-auto pr-1.5">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarProvider>
      <div className=" w-full min-h-14">
        <Footer />
      </div>
    </>
  );
}

export default App;
