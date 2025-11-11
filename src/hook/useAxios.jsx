import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxios = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      const token = user.accessToken;
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });

    const responseInterceptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const status = err.status;
        if (status === 401 || status === 403) {
          toast.error(" Log out the user for bad intention");
          console.log(" Log out the user for bad intention");
          signOutUser().then(() => {
            // navigate("auth/login");
          });
        }
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, signOutUser,navigate]);

  return instance;
};

export default useAxios;
