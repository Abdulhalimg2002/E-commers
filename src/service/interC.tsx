import { useEffect, useState, type ReactNode } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { networkM } from "../app/features/NetworkS";
// عدّل المسار حسب مشروعك

interface IPropes {
  children: ReactNode;
}

const InterC = ({ children }: IPropes) => {
  const [isOnline, setOnline] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStatus = () => {
      const online = navigator.onLine;

      // 🔥 تحديث Redux
      dispatch(networkM(online));

      // Toast عند الرجوع أونلاين
      if (!isOnline && online) {
        toast.success("You are connected", {
          icon: "🟢",
          duration: 3000,
        });
      }

      setOnline(online);
    };

    handleStatus();

    window.addEventListener("online", handleStatus);
    window.addEventListener("offline", handleStatus);

    return () => {
      window.removeEventListener("online", handleStatus);
      window.removeEventListener("offline", handleStatus);
    };
  }, [isOnline, dispatch]);

  return (
    <>
      {!isOnline && (
        <div
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            background: "#dc2626",
            color: "white",
            padding: "10px",
            textAlign: "center",
            zIndex: 9999,
            fontWeight: "bold",
          }}
        >
          ⚠️ No internet connection
        </div>
      )}

      <div style={{ paddingTop: !isOnline ? "42px" : "0" }}>
        {children}
      </div>
    </>
  );
};

export default InterC;
