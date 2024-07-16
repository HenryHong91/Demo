import React from "react";
import { useTableOptions } from "../../Hooks/tableOption";
import useDataApi from "../../Api/GetDataApi";
import DataTable from "../../Components/DataTable/DataTable";

const CurrentJob = () => {
  const { isLoading, error, fetchedData } = useDataApi(
    "currentJob",
    "currentJob"
  );
  const tableOptions = useTableOptions(fetchedData);

  return (
    <DataTable
      isLoading={isLoading}
      message={"Fetching current job List...."}
      tableOptions={tableOptions}
    />
  );
};

export default CurrentJob;
