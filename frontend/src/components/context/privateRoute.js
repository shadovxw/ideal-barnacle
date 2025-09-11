import axios from "axios";
import { useEffect } from "react";
import {useLocation, Navigate, Outlet} from "react-router-dom"

const ProtectedRoute = ({ children, role }) => {
  const location = useLocation();
  const user = localStorage.getItem("LoggedInUser");
  console.log(user)
  
  useEffect(() => {
  (async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/user/data/${user}`,{ withCredentials: true });
      console.log("heluu, dataa", data?.userData?.isAccountVerified);

    } catch (err) {
      console.error(err);
    }
  })();
}, [user]);

  return children;
};

export default ProtectedRoute;