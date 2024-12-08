import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../AuthProvider";
import { PistonFields } from "../../Types/PistonFields";

const END_POINT = "http://localhost:3000/pistons/createNew";
export const useAddNewQuery = () => {
  const { axiosInstance } = useAuth();

  const [waitingForItems, setLoading] = useState(false);
  const [dataAccepted, setDataAccepted] = useState<boolean | undefined>();
  const [code, setCode] = useState<string | undefined>(" ");
  const [query, setQuery] = useState({});
  // const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (query: PistonFields) => {
      setLoading(true);
      setQuery(query);

      try {
        const results = await axiosInstance.post(END_POINT, query);

        if (results.status === 409) {
          console.log("Piston with that code already exists");
          setDataAccepted(false);
        } else if (results.status === 500) {
          console.log("Error with server");
          setDataAccepted(false);
        } else if (results.status === 201) {
          console.log("Piston saved!!!");
          setCode(query.piston_code);
          setDataAccepted(true);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  const handleData = () => {
    setDataAccepted(false);
  };

  // useEffect(() => {
  //   console.log("Query: ", query);
  // }, [query]);

  // useEffect(() => {
  //   console.log("Code: ", code);
  // }, [code]);
  return { waitingForItems, fetchData, dataAccepted, code, handleData };
};
