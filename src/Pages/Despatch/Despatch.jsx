import React from "react";
import { useTableOptions } from "../../Hooks/tableOption";
import useDataApi from "../../Api/GetDataApi";
import DataTable from "../../Components/DataTable/DataTable";

const Despatch = () => {
  const { isLoading, error, fetchedData } = useDataApi("despatch", "despatch");
  const tableOptions = useTableOptions(fetchedData);

  return (
    <DataTable
      isLoading={isLoading}
      message={"Fetching Despatch List...."}
      tableOptions={tableOptions}
    />
  );
};

export default Despatch;
