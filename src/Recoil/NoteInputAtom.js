import { atom } from "recoil";

export const NoteInputAtom = atom({
  key: "NoteInputAtom",
  default: {
    jobId: null,
    note: "",
    isEditing: false,
    isLoading: false,
    error: null,
  },
});
