import React from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Toaster } from "sonner";

const DataTable = ({ isLoading, tableOptions, message }) => {
  const tableInstance = useMaterialReactTable(tableOptions);

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="p-2 m-2 bg-white">
        {isLoading ? (
          <LoadingSpinner message={message} />
        ) : (
          <MaterialReactTable table={tableInstance} />
        )}
      </div>
    </>
  );
};

export default DataTable;
