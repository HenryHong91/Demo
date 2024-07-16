// useDataApi.js
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { GetDataAtom } from "../Recoil/GetDataAtom";
import { SelectedLocationAtom } from "../Recoil/SelectedLocationAtom";
import * as mockDataFiles from "../assets/mockDataFiles.js";

const useDataApi = (queryKey, apiEndPoint) => {
  const [selectedLocation, setSelectedLocation] =
    useRecoilState(SelectedLocationAtom);
  const [fetchedData, setFetchedData] = useRecoilState(GetDataAtom);

  const { isLoading, error, data } = useQuery({
    queryKey: [queryKey, selectedLocation],
    queryFn: async () => {
      let url = `http://localhost:5265/api/${apiEndPoint}`;

      if (selectedLocation !== "All") {
        url += `?LocationId=${selectedLocation}`;
      }

      //const response = await fetch(url); // Mock API fetch call using  API

      //-------------for using mock data files--------------
      const mockData = mockDataFiles[apiEndPoint];

      const response =
        selectedLocation === "All"
          ? mockData
          : mockData.filter((item) => item.LocationId === selectedLocation);
      //-------------for using mock data files--------------

      if (!response || response.length === 0) {
        throw new Error(`Failed to fetch ${apiEndPoint} data`);
      }

      return response;
    },
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (data) {
      setFetchedData(data);
    }
  }, [data, selectedLocation, setFetchedData]);

  return { isLoading, error, fetchedData };
};

export default useDataApi;
