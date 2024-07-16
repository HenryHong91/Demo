import { Select, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import useLocationApi from "../../Api/GetLocationApi";
import { SelectedLocationAtom } from "../../Recoil/SelectedLocationAtom";

const LocationSelection = () => {
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
    <Select
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
    </Select>
  );
};

export default LocationSelection;
