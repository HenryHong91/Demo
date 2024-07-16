import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const usePutNoteApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const updateNote = async (jobId, note) => {
    setIsLoading(true);
    setError(null);
    const url = `http://localhost:5265/api/UpdateNote/${jobId}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ note }),
      });

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      queryClient.invalidateQueries("workAreaList");
      toast.success("Note updated successfully");
      return response.json();
    } catch (error) {
      setError(error);
      toast.error("Failed to update note");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateNote,
    isLoading,
    error,
  };
};

export default usePutNoteApi;
