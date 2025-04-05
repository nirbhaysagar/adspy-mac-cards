
import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
}

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300">
      <h2 className="text-lg font-medium text-gray-800 mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default Card;
