import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useAuth } from "../../components/Context/AuthProvider";
import { useNavigate } from "react-router-dom";

const END_POINT = "http://localhost:3000/login";

import { User } from "../../Types/User";

export const useLoginQuery = () => {
  const [token, setToken] = useState(undefined);

  const [loginError, setError] = useState<string | null>(null);

  const { updateToken, updateUsername } = useAuth();
  const navigate = useNavigate();

  const loginUser = async (user: User) => {
    setError(null);
    try {
      updateUsername(user.email);
      const response = await axios.post(END_POINT, user, {
        withCredentials: true,
      });

      const tokenRetrieved = response.headers["x-auth-token"];
      setToken(tokenRetrieved);
      updateToken(tokenRetrieved);
      // console.log("Headers Retrieved :", response.headers);
      navigate("/");
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.status);
        console.error(error.response?.data);
        console.error(error.response?.headers);
        setError(`Error with status code ${error.status}  occurred! \n 
           ${error.response?.data}`);
      }
    }
  };

  return { token, loginUser, loginError };
};
