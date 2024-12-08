import { useCallback, useEffect, useState } from "react";
import { PistonFields } from "../../Types/PistonFields";
import { useAuth } from "../AuthProvider";

const END_POINT = "http://localhost:3000/pistons";

export const useTableQuery = () => {
  const [pistonData, setPistons] = useState<PistonFields[]>([]);
  const [query, setQuery] = useState({});
  const { axiosInstance } = useAuth();
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const fetchData = async (optionalQuery?: {}) => {
    try {
      const response = await axiosInstance.post(END_POINT, query);
      setPistons(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  useEffect(() => {
    if (shouldUpdate) {
      fetchData({});
      console.log("Refresh done!");
      setShouldUpdate(false);
    }
  }, [shouldUpdate]);

  const triggerUpdate = () => {
    setShouldUpdate(true);
  };

  useEffect(() => {
    console.log("Pistons updated :", pistonData);
  }, [pistonData]);
  useEffect(() => {
    console.log("Query in table hook: ", query);
  }, [query]);

  return { pistonData, setQuery, triggerUpdate };
};
