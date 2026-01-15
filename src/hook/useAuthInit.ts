import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCredentials, logout } from "../app/features/Auth/Auth";
import axios from "axios";

export const useAuthInit = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.user?.jwt);

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(
           `${import.meta.env.VITE_SERVER_URL}/users/me?populate=role`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(
          setCredentials({
            jwt: token,
            user: res.data, // res.data is the user object from Strapi /api/users/me
          })
        );
      } catch (error) {
        dispatch(logout());
      }
    };

    fetchUser();
  }, [token, dispatch]);
};
