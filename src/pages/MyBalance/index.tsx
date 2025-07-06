import { formatThousand } from "../../utils/formatNumber";
import useUserStore from "../../store/user";
import React from "react";

const MyBalance: React.FC = () => {
  const { userData } = useUserStore();

  console.log(userData);

  return (
    <div>
      <div className="bg-main text-white lg:text-[60px] text-[40px] flex items-center justify-center p-2 rounded-lg h-[200px]">
        <h1>{formatThousand(userData.balance || userData.fixedSalary)} so'm</h1>
      </div>
    </div>
  );
};

export default MyBalance;
