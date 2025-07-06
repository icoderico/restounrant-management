import React from "react";

const Dept: React.FC = () => {
  const depts = [
    { name: "Umarov Javlon", amount: 100000 },
    { name: "Xolmatov Javlon", amount: 200000 },
    { name: "Raximov Javlon", amount: 300000 },
    { name: "Sultonov Javlon", amount: 400000 },
    { name: "Nazarov Javlon", amount: 500000 },
  ];

  return (
    <div className=" mx-auto mt-6 space-y-4">
      <h2 className="text-2xl font-bold text-center">Qarzdorlar ro'yxati</h2>
      {depts.map((dept, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-white shadow-sm border border-gray-200 rounded-xl px-4 py-3 hover:shadow-md transition"
        >
          <div className="text-gray-800 font-medium">{dept.name}</div>
          <div className="text-gray-600 font-semibold">
            {dept.amount.toLocaleString()} so'm
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dept;
