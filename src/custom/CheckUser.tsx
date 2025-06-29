import { getUser } from "../api/endpoints/user";
import useUserStore from "../store/user";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckUser: React.FC = () => {
  const { setUserData, clearUserData } = useUserStore();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      clearUserData();
      navigate("/auth");
      return;
    }

    const fetchUser = async () => {
      try {
        const user = await getUser();
        setUserData(user);
      } catch (error) {
        clearUserData();
        navigate("/auth");
      }
    };

    fetchUser();
  }, [token, setUserData, clearUserData, navigate]);

  return null;
};

export default CheckUser;
