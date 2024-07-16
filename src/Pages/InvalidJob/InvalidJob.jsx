import { useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMediaQuery } from "@mui/material";
import { Toaster, toast } from "sonner";
import { useTableOptions } from "../../Hooks/tableOption";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

// 공통 옵션 파일 import

const InvaliJob = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [fetcheddata, setFetchedData] = useState([]);
  const { isLoading, error, data } = useQuery({
    queryKey: ["InvaliJob"],
    queryFn: async () => {
      console.log("InvaliJob data fetching...");
      return fetch("http://localhost:5265/api/invalidJob").then((res) =>
        res.json()
      );
    },
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    setFetchedData(data || []);
  }, [data]);
  const handleOnClick = () => {
    toast.success("Success");
  };

  const tableOptions = useTableOptions(
    fetcheddata,
    handleOnClick,
    isMobile,
    setFetchedData
  );
  const table = useMaterialReactTable(tableOptions);

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="p-2 m-2 bg-white">
        {isLoading ? (
          <LoadingSpinner target="InvaliJob List" />
        ) : (
          <MaterialReactTable table={table} />
        )}
      </div>
    </>
  );
};

export default InvaliJob;
