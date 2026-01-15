import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, logout } from "../app/features/Auth/Auth";
import axiosInstance from "../config/axios.config";


export const useAuthInit = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.user?.jwt);

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/users/me?populate=role", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(
          setCredentials({
            jwt: token,
            user: res.data,
          })
        );
      } catch (error) {
        dispatch(logout());
      }
    };

    fetchUser();
  }, [token, dispatch]);
};
