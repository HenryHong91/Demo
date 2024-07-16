// useDataApi.js
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { GetDataAtom } from "../Recoil/GetDataAtom";
import { GetWorkAreaAtom } from "../Recoil/GetWorkAreaAtom";
import WorkAreaList from "../assets/WorkAreaList.json"; // Ensure proper import

const useGetWorkArea = (queryKey, apiEndPoint) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      // Simulate fetching data from a real API endpoint
      // const response = await fetch(`http://localhost:5265/api/${apiEndPoint}`);
      // if (!response.ok) {
      //   throw new Error(`Failed to fetch ${apiEndPoint} data`);
      // }
      // return response.json();

      // Using mock data
      const workArea = WorkAreaList; // Ensure accessing the correct endpoint data

      if (!workArea) {
        throw new Error(`Failed to fetch ${apiEndPoint} data`);
      }
      return workArea;
    },
    staleTime: 1000 * 60 * 10,
  });

  const [workArea, setWorkArea] = useRecoilState(GetWorkAreaAtom);
  const [fetchedData] = useRecoilState(GetDataAtom);

  useEffect(() => {
    if (data && fetchedData && fetchedData.length > 0) {
      const shortKeys = fetchedData.map((item) =>
        Object.keys(item).filter((key) => key.length === 2)
      );
      const firstShortkey = shortKeys[0];
      const filteredWorkArea = data.filter((value) =>
        firstShortkey.includes(value)
      );
      setWorkArea(filteredWorkArea);
    }
  }, [data, fetchedData, setWorkArea]);

  return { isLoading, error, workArea };
};

export default useGetWorkArea;
