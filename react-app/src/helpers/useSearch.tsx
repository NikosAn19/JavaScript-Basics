// useSearchQuery.ts
import { useState } from "react";
import { PistonFields } from "../Types/PistonFields";

export const useSearchQuery = () => {
  const [searchQuery, setSearchQuery] = useState<PistonFields | {}>({});

  return {
    searchQuery,
    setSearchQuery,
  };
};
