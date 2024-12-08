import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
const END_POINT = "http://localhost:3000/login//api/refreshToken";

export type Auth = {
  accessToken: string | undefined;
  updateToken: (token: string) => void;
  updateCookie: (cookie: string) => void;
  isInitialized: boolean;
  axiosInstance: AxiosInstance;
};

const AuthContext = createContext<Auth | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("AuthContext is undefined");
  }

  return context;
};

export default function AuthProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [isInitialized, setIsInitialized] = useState(false);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const updateToken = (token: string) => {
    setAccessToken(token);
    console.log("Access Token in updateToken: ", accessToken);
  };

  const updateCookie = (cookie: string) => {
    if (cookie !== undefined) {
      throw new Error("cookie is undefined");
    }
  };

  // On refresh , request new Access Token.
  useLayoutEffect(() => {
    console.log("Access Token in Auth Provider", accessToken);
    const getAccessToken = async () => {
      try {
        const response = await axios.get(END_POINT, { withCredentials: true });
        const token = response.headers["x-auth-token"];
        setAccessToken(token);
        console.log("Access Token in useLayoutEffect : ", accessToken);
      } catch (error) {
        console.error("AXIOS ERROR", error);
        setAccessToken(undefined);
      } finally {
        setIsInitialized(true); // Δηλώνει ότι έγινε το αρχικό setup
      }
    };

    getAccessToken();
  }, []);

  useEffect(() => {
    console.log("useEffect AFTER state update:", accessToken);
  }, [isInitialized]);

  // Intercept requests to server with the token header

  useLayoutEffect(() => {
    const authInterceptor = axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Αφαίρεση του interceptor on unmount/ cleanup
    return () => {
      axiosInstance.interceptors.request.eject(authInterceptor);
    };
  }, [accessToken]);

  // useLayoutEffect(() => {
  //   const authInterceptor = axios.interceptors.request.use(
  //     (config: InternalAxiosRequestConfig & { _retry?: boolean }) => {
  //       config.headers.Authorization =
  //         !config._retry && accessToken
  //           ? `Bearer ${accessToken}`
  //           : config.headers.Authorization;
  //       return config;
  //     },
  //     (error) => {
  //       return Promise.reject(error);
  //     }
  //   );

  //   return axios.interceptors.request.eject(authInterceptor);
  // }, [accessToken]);

  // useLayoutEffect(() => {
  //   const refreshInterceptor = axios.interceptors.response.use(
  //     function (response) {
  //       // Any status code that lie within the range of 2xx cause this function to trigger
  //       // Do something with response data
  //       return response;
  //     },
  //     async function (error) {
  //       // Any status codes that falls outside the range of 2xx cause this function to trigger
  //       // Do something with response error

  //       const originalRequest = error.config;
  //       if (
  //         error.response.status === 403 &&
  //         error.response.data.message === "Unauthorized"
  //       ) {
  //         try {
  //           const response = await axios.get(END_POINT);
  //           setAccessToken(response.data.accessToken);

  //           originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
  //           originalRequest._retry = true;

  //           return axios(originalRequest);
  //         } catch {
  //           setAccessToken(undefined);
  //         }
  //       }
  //       return Promise.reject(error);
  //     }
  //   );
  //   return axios.interceptors.response.eject(refreshInterceptor);
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        updateToken,
        updateCookie,
        isInitialized,
        axiosInstance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
