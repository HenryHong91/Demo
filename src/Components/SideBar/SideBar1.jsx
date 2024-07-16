import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuSearchCheck } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import { BsBox } from "react-icons/bs";
import { HiOutlineTruck } from "react-icons/hi2";
import { RiAlarmWarningLine } from "react-icons/ri";
import { CiPause1 } from "react-icons/ci";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import "./SideBar.css";
import { useSidebarContext } from "../../Context/SidebarContext/SidebarContext";

const sidebarItems = [
  { name: "Dashboard", icon: <MdOutlineSpaceDashboard />, link: "dashboard" },
  { name: "Search", icon: <LuSearchCheck />, link: "search" },
  { name: "Scheduling", icon: <FaRegBell />, link: "scheduling" },
  { name: "Current Job", icon: <BsBox />, link: "current_job" },
  { name: "Despatch", icon: <HiOutlineTruck />, link: "despatch" },
  { name: "Invalid Jobs", icon: <RiAlarmWarningLine />, link: "invalid_job" },
  { name: "Jobs on Hold", icon: <CiPause1 />, link: "jobs_on_hold" },
];
//${isSidebarOpen ? "sidebar-open " : "sidebar-close"}

const SideBar1 = () => {
  const { isSidebarOpen } = useSidebarContext();

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle " />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>

      <div
        id="sidebar"
        className={`
      ${isSidebarOpen ? "sidebar-open " : "sidebar-close"} 
       h-full flex flex-col justify-between pt-4 px-1 pb-3 bg-slate-50 max-sm:p-0  `}
      >
        {/* Link Container */}
        <div className="h-4/5 p-5 text-md  ">
          {sidebarItems.map((item, index) => (
            <Link to={item.link} key={index}>
              <div
                id="item"
                className="flex items-center gap-3 mb-2 py-4 px-2 rounded-lg hover:bg-slate-300 max-sm:gap-1 max-sm:mb-5 max-sm:py-1 max-sm:px-1"
              >
                <p
                  id="sidebarList"
                  className=" text-2xl max-sm:text-sm max-md:text-md"
                >
                  {item.icon}
                </p>
                <p
                  id="sidebarList"
                  className="font-bold max-sm:text-xs max-md:text-md"
                >
                  {item.name}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* LogOut Container */}
        <div
          className={`
         h-1/5 flex justify-center items-center `}
        >
          <div>
            <button className="btn hover:bg-error">
              <CiLogout className="text-lg sm:text-sm md:text-md" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar1;
