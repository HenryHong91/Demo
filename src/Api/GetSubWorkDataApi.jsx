// useDataApi.js
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

import { GetSubWorkDataAtom } from "../Recoil/GetSubWorkDataAtom";

const useGetSubWorkDataApi = (queryKey, apiEndPoint) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      console.log(`${apiEndPoint} data fetching...`);
      const response = await fetch(
        `http://localhost:5265/api/currentJob/subwork?JobId=${apiEndPoint}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch ${apiEndPoint} data`);
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 10,
  });

  const [subWorkData, setSubWorkData] = useRecoilState(GetSubWorkDataAtom);

  useEffect(() => {
    if (data) {
      setSubWorkData(data);
      console.log(subWorkData);
    }
  }, [data]);

  return { isLoading, error, subWorkData };
};

export default useGetSubWorkDataApi;
