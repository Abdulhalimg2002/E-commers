import Cookies from "universal-cookie";
import type { CookieService } from "../interface";

const cookies = new Cookies();

const cookieService: CookieService = {
  setToken: (token) => {
    cookies.set("token", token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      secure: import.meta.env.PROD,
      sameSite: "strict",
    });
  },

  getToken: () => {
    return cookies.get("token");
  },

  removeToken: () => {
    cookies.remove("token", { path: "/" });  // 🔥 فقط هذا
  },
};

export default cookieService;
