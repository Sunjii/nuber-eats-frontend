import React from "react";

interface IRestaurantProps {
  name: string;
  categoryName?: string;
  coverImg: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  name,
  categoryName,
  coverImg,
}) => (
  <div>
    <div
      style={{ backgroundImage: `url(${coverImg})` }}
      className="bg-red-500 py-28 bg-cover bg-center mb-3"
    ></div>
    <h3 className="text-xl font-bold">{name}</h3>
    <div className="border-t-2 mt-3 py-2 text-xs border-gray-300 opacity-50">
      {categoryName}
    </div>
  </div>
);
