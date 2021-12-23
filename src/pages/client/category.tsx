import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

export const Category = () => {
  const location = useLocation();
  const param = useParams();
  useEffect(() => {
    console.log(location);
    console.log(param);
  }, [location]);

  return <h1>Cat</h1>;
};
