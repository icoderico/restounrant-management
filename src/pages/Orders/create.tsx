import { Input } from "../../components/ui/input";
import { getFoods } from "../../api/endpoints/food";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { formatThousand } from "../../utils/formatNumber";

const Create: React.FC = () => {
  const { data: items } = useQuery({
    queryKey: ["foods"],
    queryFn: getFoods,
  });

  const [openPopover, setOpenPopover] = React.useState(false);

  return (
    <div>
      <Input
        onFocus={() => setOpenPopover(true)}
        onBlur={() => setOpenPopover(false)}
      />

      {openPopover && (
        <div className="bg-gray-200 flex flex-col gap-2 p-3 rounded-md mt-3 max-h-[400px] overflow-y-scroll">
          {items?.map((item) => (
            <div className="bg-white rounded p-3">
              <div className="flex flex-col">
                <span className="font-semibold">{item.name}</span>
                <span className="text-sm">{formatThousand(item.price)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Create;
