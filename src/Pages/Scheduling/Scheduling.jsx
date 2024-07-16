import React from "react";
import { useTableOptions } from "../../Hooks/tableOption";
import useDataApi from "../../Api/GetDataApi";
import DataTable from "../../Components/DataTable/DataTable";

const Scheduling = () => {
  const { isLoading, error, fetchedData } = useDataApi(
    "scheduling",
    "scheduling"
  );
  const tableOptions = useTableOptions(fetchedData);

  return (
    <DataTable
      isLoading={isLoading}
      message={"Fetching Scheduling List...."}
      tableOptions={tableOptions}
    />
  );
};

export default Scheduling;
