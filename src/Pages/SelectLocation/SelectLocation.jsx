import React, { useEffect, useState } from "react";
import logo from "../../assets/kiwi.jpg";
import { Link } from "react-router-dom";
import "./SelectLocation.css";
import { useRecoilState } from "recoil";
import useLocationApi from "../../Api/GetLocationApi";
import LocationSelection from "../../Components/LocationSelection/LocationSelection";
import { SelectedLocationAtom } from "../../Recoil/SelectedLocationAtom";

const SelectLocation = () => {
  const { isLoading, error, location } = useLocationApi("location", "location");
  const [selectedLocation, setSelectedLocation] =
    useRecoilState(SelectedLocationAtom);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const locationHandleOnChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen gradient-background">
      <div className="card bg-base-100 shadow-xl shadow-black w-96 h-fit p-10">
        <figure
          className={`p-10 opacity-0 ${animate ? "animate-fadeIn1" : ""}`}
        >
          <img src={logo} alt="NZPG Logo" className="w-full h-fit" />
        </figure>
        <div className="card-body items-center text-center ">
          <h1
            className={`text-3xl font-bold text-center m-2 opacity-0 ${
              animate ? "animate-fadeIn2" : ""
            }`}
          >
            Welcome!
          </h1>
          <h1
            className={`text-3xl font-bold text-center m-2 opacity-0 ${
              animate ? "animate-fadeIn3" : ""
            }`}
          >
            Henry
          </h1>
          <p
            className={`opacity-0 text-lg capitalize m-2 ${
              animate ? "animate-fadeIn4" : ""
            }`}
          >
            please select location
          </p>
          {/* --------------------------------------------------------- */}
          <LocationSelection />
          {/* <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={selectedLocation}
            onChange={locationHandleOnChange}
            sx={{ fontWeight: "bold", width: 1 }}
            className={`text-3xl font-bold text-center m-2 opacity-0 ${
              animate ? "animate-fadeIn5" : ""
            }`}
            autoWidth
          >
            <MenuItem
              value="All"
              sx={{
                fontWeight: "bold",
                textAlign: "center",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              All Area
            </MenuItem>
            {location.map((item) => (
              <MenuItem
                disabled={
                  item.Description.includes("**INACTIVE**") ||
                  item.Description.includes("IN-TRANSIT")
                } // Disable based on condition
                key={item.Id}
                value={item.Id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="border-black border-2"
              >
                {item.Description}
              </MenuItem>
            ))}
          </Select> */}

          <Link
            to="/job_manager"
            className={`w-full rounded-2xl opacity-0 m-2 ${
              animate ? "animate-fadeIn6" : ""
            }`}
          >
            <button className="btn btn-info w-4/5 rounded-3xl shadow-2xl text-white border-blue-500 animate-pulse">
              DONE
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectLocation;
