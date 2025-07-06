import React from "react";

const Monitoring: React.FC = () => {
  // Fake data
  const todayIncome = 1250000;
  const todayOutcome = 870000;

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Bugungi Monitoring
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <div className="text-sm text-green-700 font-semibold">
            Kirim (Income)
          </div>
          <div className="text-2xl font-bold text-green-900 mt-1">
            {todayIncome.toLocaleString()} so'm
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <div className="text-sm text-red-700 font-semibold">
            Chiqim (Outcome)
          </div>
          <div className="text-2xl font-bold text-red-900 mt-1">
            {todayOutcome.toLocaleString()} so'm
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
