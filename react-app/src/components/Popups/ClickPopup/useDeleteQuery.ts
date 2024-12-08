import { useCallback, useState } from "react";
import { useAuth } from "../../AuthProvider";
import { PistonFields } from "../../../Types/PistonFields";

const END_POINT = "http://localhost:3000/pistons/deletePiston";

export const useDeleteQuery = () => {
  const { axiosInstance } = useAuth();

  const [query, setQuery] = useState({});

  const [loading, setLoading] = useState(false);

  const deleteData = useCallback(
    async (dataToDelete: PistonFields) => {
      setLoading(true);

      try {
        const response = await axiosInstance.delete(END_POINT, {
          data: dataToDelete,
        });

        if (response.status === 400) {
          console.log(response.data.message);
        } else if (response.status === 200) {
          console.log(response.data.message);
        }
        console.log("Data deleted!!");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  return { deleteData, loading };
};
