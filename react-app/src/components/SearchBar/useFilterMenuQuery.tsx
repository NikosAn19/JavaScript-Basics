import { useState, useEffect } from "react";
import axios from "axios";
const END_POINT = "http://localhost:3000/pistons/getIdentities";

export function useFilterMenuQuery() {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formatedFields, setFormatedFields] = useState([]);

  useEffect(() => {
    async function fetchFields() {
      try {
        const response = await axios.get(END_POINT);
        setFormatedFields(response.data.fieldNamesFormatted || []);
        setFields(response.data.fieldNamesRaw || []);
      } catch (error) {
        console.error("Error fetching fields:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFields();
  }, []);

  return { fields, loading, formatedFields };
}
