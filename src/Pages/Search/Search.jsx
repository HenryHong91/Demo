import SearchIcon from "@mui/icons-material/Search";
import {
  Divider,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { NoteInputAtom } from "../../Recoil/NoteInputAtom";
import { useQuery } from "@tanstack/react-query";
import { useTableOptions } from "../../Hooks/tableOption";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Toaster, toast } from "sonner";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const Search = () => {
  const [search, setSearch] = React.useState();
  const handleOnChange = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setSearch(inputValue);
    if (!inputValue.trim()) {
      setSearchResult([]); // Clear search results if search input is empty
      setTriggerSearch(false); // Prevent search from triggering
    }
  };

  const isMobile = useMediaQuery("(max-width: 600px)");
  const [searchResult, setSearchResult] = useState([]);
  const [triggerSearch, setTriggerSearch] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["Search", search],
    queryFn: async () => {
      console.log("Search data fetching...");
      return fetch(
        `http://localhost:5265/api/search?searchString=${search}`
      ).then((res) => res.json());
    },
    enabled: triggerSearch, // This query will not automatically run until `triggerSearch` is true
    onSuccess: () => setTriggerSearch(false), // Reset trigger after successful fetch
    // staleTime: 1000 * 60,
  });

  useEffect(() => {
    setSearchResult(data || []);
  }, [data]);

  const handleOnClick = () => {
    toast.success("Success");
  };

  const tableOptions = useTableOptions(
    searchResult,
    handleOnClick,
    isMobile,
    setSearchResult
  );

  const handleOnSearchClick = (e) => {
    e.preventDefault();
    if (search) {
      if (!search.trim()) {
        setSearchResult([]); // Ensure search results are cleared if search is empty
        return; // Prevent searching for empty strings
      }
      setTriggerSearch(true); // Trigger the search
    } else toast.error("Please enter a search string");
  };

  const table = useMaterialReactTable(tableOptions);

  return (
    <div className="h-full w-full text-center align-middle px-2">
      <div className="h-1/5 mt- w-full flex justify-center items-center ">
        <Paper
          component="form"
          sx={{
            padding: "20px",
            display: "flex",
            justifyItems: "evenly",
            alignItems: "center",
            width: "80%",
            borderRadius: "30px",
            backgroundColor: "#ffffff",
          }}
          elevation={8}
          onSubmit={(e) => {
            e.preventDefault();
            handleOnSearchClick(e);
          }}
        >
          <TextField
            label="Search"
            variant="standard"
            sx={{ width: "100%" }}
            onChange={handleOnChange}
          />

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="button" onClick={handleOnSearchClick}>
            <SearchIcon color="success" fontSize="large" />
          </IconButton>
        </Paper>
      </div>

      <div className="h-2/4 w-full">
        <Toaster position="top-center" richColors />
        <div className="p-2 m-2 bg-white">
          {searchResult.length > 0 && (
            <h1 className="text-2xl py-5">
              Result of "{search}", Found {searchResult.length}
            </h1>
          )}
          {isLoading ? (
            <LoadingSpinner target="Search Result" />
          ) : (
            <>
              <MaterialReactTable table={table} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
