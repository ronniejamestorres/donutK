import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const LogoutButton = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("loginUser") !== null);

  const handleLogout = () => {
    localStorage.removeItem("loginUser");
    setIsLoggedIn(false);
    console.log(isLoggedIn); // vérifier que la valeur est bien false
    navigate("/");
  };

  return (
    <>
      {isLoggedIn && (
        <Button onClick={handleLogout} colorScheme="pink">
          Logout
        </Button>
      )}
    </>
  );
};

export default LogoutButton;
