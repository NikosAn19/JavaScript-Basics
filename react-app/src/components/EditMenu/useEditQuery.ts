import { useCallback, useState } from "react";
import { useAuth } from "../Context/AuthProvider";
import { PistonFields } from "../../Types/PistonFields";

const END_POINT = "http://localhost:3000/pistons/editPiston";

export const useEditQuery = () => {
  const { axiosInstance } = useAuth();
  const [waiting, setWaiting] = useState(false);

  const fetchEdit = useCallback(
    async (query: PistonFields, old_code: string | undefined) => {
      setWaiting(true);

      const payload = { ...query, old_code };
      console.log("Payload  in custom hook : ", payload);
      try {
        const response = await axiosInstance.put(END_POINT, payload);
        if (response.status === 404) {
          console.log("Edit failed on server");
        } else if (response.status === 201) {
          console.log("Edit successfull!");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setWaiting(false);
      }
    },
    []
  );

  return { fetchEdit, waiting };
};
