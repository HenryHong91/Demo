import logo from "../../assets/kiwi.jpg";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSidebarContext } from "../../Context/SidebarContext/SidebarContext";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import useLocationApi from "../../Api/GetLocationApi";
import { SelectedLocationAtom } from "../../Recoil/SelectedLocationAtom";
import { useState } from "react";
import LocationSelection from "../LocationSelection/LocationSelection";

const NavBar = () => {
  const { toggleSidebar } = useSidebarContext();
  const { isLoading, error, location } = useLocationApi("location", "location");
  const setSelectedLocation = useSetRecoilState(SelectedLocationAtom);

  const locationHandleOnChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  return (
    <div className="flex flex-row justify-between align-middle items-center navbar bg-base-100 max-sm:flex-row">
      <div className="flex">
        <button className="btn btn-square btn-ghost" onClick={toggleSidebar}>
          <GiHamburgerMenu className="text-3xl" />
        </button>
        <div className=" w-fit ">
          <img src={logo} className="w-28" alt="Logo" />
        </div>
      </div>

      <div className="flex flex-col items-end px-3 pb-3 max-sm:flex-row">
        <h1 className="max-sm:text-sm">Hi, Henry</h1>
        <div className="flex flex-row gap-5 max-sm:hidden  justify-center items-center">
          <p>You selected </p>
          <LocationSelection />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
