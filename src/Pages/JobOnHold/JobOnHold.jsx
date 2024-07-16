import React from "react";
import { useTableOptions } from "../../Hooks/tableOption";
import useDataApi from "../../Api/GetDataApi";
import DataTable from "../../Components/DataTable/DataTable";

const JobOnHold = () => {
  const { isLoading, error, fetchedData } = useDataApi(
    "JobOnHold",
    "JobOnHold"
  );
  const tableOptions = useTableOptions(fetchedData);

  return (
    <DataTable
      isLoading={isLoading}
      message={"Fetching Job On Hold List...."}
      tableOptions={tableOptions}
    />
  );
};

export default JobOnHold;
