import { useEffect, useMemo, useState, useRef } from "react";
import { IoIosRadioButtonOn } from "react-icons/io";
import { toast } from "sonner";
import {
  Box,
  useMediaQuery,
  TextField,
  ClickAwayListener,
} from "@mui/material";
import { NoteInputAtom } from "../Recoil/NoteInputAtom";
import { useRecoilState } from "recoil";
import useLocationApi from "../Api/GetWorkArea";

const updateNote = async (JobID, note) => {
  //api http://localhost:5265/api/UpdateNote/{id}
  console.log(`Updating note for id ${JobID}: ${note}`);
  return new Promise((resolve) => setTimeout(resolve, 500));
};

export const useTableOptions = (fetcheddata) => {
  const [backgroundSize, setBackgroundSize] = useState(window.innerWidth);
  const [activeNoteEditor, setActiveNoteEditor] = useRecoilState(NoteInputAtom);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { isLoading, error, workArea } = useLocationApi(
    "workAreaList",
    "workAreaList"
  );

  useEffect(() => {
    const handleResize = () => {
      setBackgroundSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [backgroundSize]);

  const handleOnClick = () => {
    toast.success("Success");
  };

  const workCell = ({ row, accessorKey }) => {
    const status = row.original[accessorKey];
    let textColorClass = "";
    switch (status) {
      case 1:
        textColorClass = "text-green-500";
        break;
      case 0:
        textColorClass = "text-slate-500";
        break;
      case -1:
        textColorClass = "text-base-200";
        break;
      case "Completed":
        textColorClass = "text-green-500";
        break;
      case "Waiting":
        textColorClass = "text-slate-500";
        break;
      case null:
        textColorClass = "text-base-200";
        break;
      default:
        break;
    }
    return status == null ? (
      <div className={`text-base-200 text-3xl`}>
        <button onClick={handleOnClick}>
          <IoIosRadioButtonOn />
        </button>
      </div>
    ) : (
      <div className={`${textColorClass} text-3xl`}>
        <button>
          <IoIosRadioButtonOn />
        </button>
      </div>
    );
  };

  const columns = useMemo(() => {
    if (isLoading || !workArea.length) {
      return [];
    }

    const firstJob = fetcheddata.length > 0 ? fetcheddata[0] : {};
    const keys = Object.keys(firstJob);
    const nzpgNoteIndex = keys.findIndex((key) => key === "NZPG_Note");
    const workStateOption = {
      enableEditing: false,
      enableClickToCopy: false,
      size: 100,
    };

    const workAreaColumns = [...workArea, "~"].map((item) => ({
      accessorKey: item,
      header: "~" === item ? "Total" : item,
      ...workStateOption,
      muiTableBodyCellProps: ({ row }) => ({
        sx: {
          justifyContent: "center",
          borderLeft: "dashed 0.5px gray",
          borderRight: "dashed 0.5px gray",
          backgroundColor: row.getIsExpanded() ? "#fffbe3" : "",
        },
      }),
      Cell: ({ row }) => workCell({ row, accessorKey: item }),
    }));

    let workStateKeys =
      nzpgNoteIndex !== -1 ? keys.slice(nzpgNoteIndex + 1) : [];

    return [
      {
        accessorKey: "RequiredDate",
        header: "Date",
        size: 170,
        Cell: ({ row }) => {
          const today = new Date();
          const date = row.original.RequiredDate;
          if (!date) {
            return null;
          }
          const trimmedDate = date.split("T")[0];
          const dateObj = new Date(trimmedDate);
          const oneWeekAgo = new Date(today);
          const dueCheck = oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          let status;
          if (dateObj < today) {
            status = "overdue";
          } else if (dateObj > today) {
            status = "a month ago";
          } else if (dateObj < dueCheck) {
            status = "a week ago";
          } else {
            status = "today";
          }
          const day = dateObj.getDate();
          const month = dateObj.toLocaleDateString("default", {
            month: "short",
          });
          const year = dateObj.getFullYear().toString();
          const formattedDate = `${day}-${month}-${year}`;

          return (
            <span
              className={`${
                (status === "overdue" &&
                  "bg-rose-300 text-rose-950 border-2 border-rose-400") ||
                (status === "today" &&
                  "bg-slate-600 text-slate-900 border-2 border-slate-400") ||
                (status === "a month ago" &&
                  "bg-green-300 text-green-800 border-2 border-green-400") ||
                (status === "a week ago" &&
                  "bg-orange-300 text-orange-800 border-2 border-orange-400")
              } px-1 py-1 rounded-lg font-bold font-mono text-md`}
            >
              {formattedDate}
            </span>
          );
        },
        enableEditing: false,
        enableClickToCopy: false,
      },
      {
        accessorKey: "JobNo",
        header: "Job Number",
        size: 180,
        enableEditing: false,
        enableClickToCopy: true,
        Cell: ({ row }) => {
          const jobNo = row.original.JobNo;
          const itemNo = row.original.ItemNo;
          return jobNo ? (
            <div
              className={`${
                row.getIsExpanded()
                  ? "border-orange-400 text-orange-700  bg-orange-100 "
                  : " border-purple-400 text-purple-700  bg-purple-100"
              } text-md font-bold bg-purple-100 px-1 py-1 rounded-lg font-mono border-2`}
            >
              {jobNo}
            </div>
          ) : (
            <span className="bg-slate-200 text-slate-900 border-2 border-slate-400 p-1 px-10 rounded-md font-bold ">
              {itemNo}
            </span>
          );
        },
      },
      {
        accessorKey: "Customer",
        header: "Customer",
        size: 350,
        enableEditing: false,
        enableClickToCopy: true,
        Cell: ({ row }) => (
          <div
            className={`${
              row.original.Customer === undefined
                ? null
                : `${
                    row.getIsExpanded()
                      ? "border-orange-400 text-orange-700  bg-orange-100"
                      : " border-blue-400 text-blue-700  bg-blue-100"
                  } font-bold text-center py-1 px-1 rounded-lg font-mono text-md border-2`
            }`}
          >
            {row.original.Customer}
          </div>
        ),
      },
      ...workAreaColumns,
    ];
  }, [fetcheddata, workArea, isLoading]);

  return {
    columns,
    enableClickToCopy: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableExpandAll: true,
    enableExpanding: true,
    filterFromLeafRows: true,
    data: fetcheddata,
    paginateExpandedRows: false,
    layoutMode: "grid",
    enableEditing: true,
    editDisplayMode: "cell",
    enableColumnPing: true,
    positionExpandColumn: "last",
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    enableColumnActions: false,

    muiTableHeadProps: {
      sx: {
        "& .MuiTableCell-root": {
          color: "white",
          textAlign: "center",
          fontSize: "18px",
          backgroundColor: "#151c39",
          borderBottom: "double white",
          border: "3px double white",
          "& .MuiTableSortLabel-root svg": {
            color: "#ffffff",
            marginLeft: "0.5 rem",
            padding: "px",
            width: "1rem",
          },
        },
      },
    },

    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        backgroundColor: row.depth === 1 ? "#fffbe3" : "",
        borderBottom: row.depth === 1 ? "0.1px dashed #cfd1d0" : "",
      },
    }),

    muiTableHeadCellProps: () => ({
      align: "center",
    }),

    muiTableBodyCellProps: ({ cell, column, table, row }) => ({
      align: "center",
      sx: {
        backgroundColor: row.getIsExpanded() ? "#fffbe3" : "",
      },
    }),

    style: {
      width: "100%",
      height: "100%",
      overflow: "auto",
      display: "flex",
      justifyContent: "center",
    },

    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "Details",
        size: 50,
      },
    },

    initialState: {
      columnPinning: {
        left: isMobile ? ["jobNumber"] : [],
      },
    },

    renderDetailPanel: ({ row }) => {
      const [note, setNote] = useState(row.original.Note || "");
      const [isEditing, setIsEditing] = useState(false);
      const [isSaving, setIsSaving] = useState(false);
      const prevNoteRef = useRef(note);

      useEffect(() => {
        if (!isEditing && note !== prevNoteRef.current) {
          setIsSaving(true);
          updateNote(row.original.JobID, note)
            .then(() => {
              toast.success("Note updated successfully");
              prevNoteRef.current = note;
            })
            .catch((error) => {
              toast.error("Failed to update note");
              setNote(prevNoteRef.current);
            })
            .finally(() => {
              setIsSaving(false);
            });
        }
      }, [isEditing, note, row.original.JobID]);

      const handleNoteChange = (event) => {
        setNote(event.target.value);
      };

      const handleEditStart = () => {
        setIsEditing(true);
      };

      const handleEditEnd = () => {
        setIsEditing(false);
      };

      return (
        <ClickAwayListener onClickAway={handleEditEnd}>
          <Box sx={{ width: "100%", padding: 2 }} onClick={handleEditStart}>
            {isEditing ? (
              <TextField
                fullWidth
                multiline
                value={note}
                onChange={handleNoteChange}
                autoFocus
                disabled={isSaving}
              />
            ) : (
              <Box className="text-xl">
                Note:{" "}
                <span className="font-bold text-2xl text-purple-600">
                  {isSaving ? "Saving..." : note || "No NOTE"}
                </span>
              </Box>
            )}
          </Box>
        </ClickAwayListener>
      );
    },

    muiDetailPanelProps: () => ({
      sx: (theme) => ({
        backgroundColor: "#fffbe3",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }),
    }),
  };
};
