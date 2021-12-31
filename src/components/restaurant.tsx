import React from "react";
import { Link } from "react-router-dom";

interface IRestaurantProps {
  id: string;
  name: string;
  categoryName?: string;
  coverImg: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  id,
  name,
  categoryName,
  coverImg,
}) => (
  <Link to={`/restaurants/${id}`}>
    <div>
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className="bg-red-500 py-28 bg-cover bg-center mb-3 max-w-xl"
      ></div>
      <h3 className="text-xl font-bold">{name}</h3>
      <div className="border-t-2 mt-3 py-2 text-xs border-gray-300 opacity-50">
        {categoryName}
      </div>
    </div>
  </Link>
);
