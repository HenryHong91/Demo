// useDataApi.js
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { LocationAtom } from "../Recoil/LocationAtom";
import * as mockDataFiles from "../assets/mockDataFiles.js";

const useLocationApi = (queryKey, apiEndPoint) => {
  const {
    isLoading,
    error,
    data: rawData,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      // mock 데이터 사용
      const mockData = mockDataFiles[apiEndPoint];
      console.log(mockData);
      if (!mockData) {
        throw new Error(`Failed to fetch ${apiEndPoint} data`);
      }
      return mockData;
    },
    staleTime: 1000 * 60 * 10,
  });

  const [location, setLocation] = useRecoilState(LocationAtom);

  // 위치 데이터를 그룹화하는 함수
  const groupLocations = (locations) => {
    const activeLocations = locations.filter(
      (loc) =>
        !loc.Description.includes("**INACTIVE**") && loc.Id !== "IN-TRANSIT"
    );
    const inactiveLocations = locations.filter((loc) =>
      loc.Description.includes("**INACTIVE**")
    );
    const inTransitLocation = locations.find((loc) => loc.Id === "IN-TRANSIT");

    // 활성 위치들을 알파벳 순서로 정렬
    activeLocations.sort((a, b) => a.Description.localeCompare(b.Description));

    let result = [];

    // 알파벳 순서로 정렬된 활성 위치들 추가
    activeLocations.forEach((loc) => {
      const prefix = loc.Id.slice(0, 3);
      if (
        result.length === 0 ||
        result[result.length - 1].Id.slice(0, 3) !== prefix
      ) {
        result.push({
          Id: `divider_${prefix}`,
          Description: `──────────────────${prefix}──────────────────`,
        });
      }
      result.push(loc);
    });

    // Add IN-TRANSIT if it exists
    if (inTransitLocation) {
      result.push(
        {
          Id: "divider_in_transit",
          Description: "────────────────IN-TRANSIT────────────────",
        },
        inTransitLocation
      );
    }

    // Add inactive locations at the end if they exist
    if (inactiveLocations.length > 0) {
      result.push(
        {
          Id: "divider_inactive",
          Description: "────────────────**INACTIVE**────────────────",
        },
        ...inactiveLocations
      );
    }

    return result;
  };

  useEffect(() => {
    if (rawData) {
      const groupedData = groupLocations(rawData);
      setLocation(groupedData);
      console.log(location);
    }
  }, [rawData, setLocation]);

  return { isLoading, error, location };
};

export default useLocationApi;
