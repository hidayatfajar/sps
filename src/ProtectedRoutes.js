import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoutes({ component: Component, ...rest }) {
  // hit siswa api to check if user is logged in using useEffect

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const data = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await axios
      .get("http://localhost:8000/siswa", config)
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setIsAuthenticated(false);
        }
      });
  };
  useEffect(() => {
    data();
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <>
            {/* {localStorage.removeItem("dataAdmin")}
            {localStorage.removeItem("token")} */}
            <Redirect to="/admin/login" />
          </>
        )
      }
    />
  );
}
