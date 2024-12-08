import { useState } from "react";
const END_POINT = "http://localhost:3000/register/new";

import axios, { AxiosError } from "axios";

type User = {
  username: string;
  email: string;
  password: string;
};

export const useRergisterQuery = () => {
  const [storedUser, setUser] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (user: User) => {
    setError(null);
    try {
      const response = await axios.post(END_POINT, user);

      setUser(response.data);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.status);
        setError(err.response?.data);
        // console.log(err);
      } else {
        setError("An error occurred!");
      }
    }
  };

  return { storedUser, registerUser, error };
};
