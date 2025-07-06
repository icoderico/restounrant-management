import { Input } from "../../components/ui/input";
import { getFoods } from "../../api/endpoints/food";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { formatThousand } from "../../utils/formatNumber";
import { Button } from "../../components/ui/button";
import useUserStore from "../../store/user";
import { createOrder } from "../../api/endpoints/order";
import { toast } from "react-toastify";

interface SelectedFood {
  id: number;
  name: string;
  count: number;
}

const Create: React.FC<{ table: string }> = ({ table }) => {
  const { data: items } = useQuery({
    queryKey: ["foods"],
    queryFn: getFoods,
  });

  const { userData } = useUserStore();

  const [openPopover, setOpenPopover] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFoods, setSelectedFoods] = useState<{
    table: string;
    orderedItems: SelectedFood[];
  }>({
    table,
    orderedItems: [],
  });

  const filteredItems = React.useMemo(() => {
    if (!searchTerm.trim()) return items || [];
    return (items || []).filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-300 text-black rounded-sm">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const handleSelectItem = (item: any) => {
    setSelectedFoods((prev) => {
      const existing = prev.orderedItems.find((f) => f.id === item.id);
      let updatedItems;
      if (existing) {
        updatedItems = prev.orderedItems.map((f) =>
          f.id === item.id ? { ...f, count: f.count + 1 } : f
        );
      } else {
        updatedItems = [
          ...prev.orderedItems,
          { id: item.id, name: item.name, count: 1 },
        ];
      }
      return { ...prev, orderedItems: updatedItems };
    });

    setSearchTerm("");
    setOpenPopover(false);
  };

  const handleCountChange = (id: number, delta: number) => {
    setSelectedFoods((prev) => {
      const updated = prev.orderedItems
        .map((f) => (f.id === id ? { ...f, count: f.count + delta } : f))
        .filter((f) => f.count > 0);

      return { ...prev, orderedItems: updated };
    });
  };

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => window.location.reload(),
    onError: (error: any) => toast.error(error?.response?.data?.message),
  });

  const handleCreate = () => {
    const preparedData = {
      restaurantId: userData.restaurantId,
      userId: userData.id,
      table: selectedFoods.table,
      orderItems: selectedFoods.orderedItems.map((f) => ({
        productId: f.id,
        quantity: f.count,
      })),
    };

    mutation.mutate(preparedData);
  };

  return (
    <div className="p-2 space-y-5">
      <div className="relative">
        <Input
          onFocus={() => setOpenPopover(true)}
          onBlur={() => setOpenPopover(false)}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Taomni qidirish..."
        />

        {openPopover && (
          <div className="bg-gray-200 flex absolute w-full flex-col gap-2 p-3 rounded-md mt-3 max-h-[300px] overflow-y-scroll z-10">
            {filteredItems?.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded p-3 cursor-pointer hover:bg-gray-100"
                onMouseDown={() => handleSelectItem(item)}
              >
                <div className="flex flex-col">
                  <span className="font-semibold">
                    {highlightMatch(item.name, searchTerm)}
                  </span>
                  <span className="text-sm">{formatThousand(item.price)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedFoods.orderedItems.length > 0 && (
        <div className="chek bg-second min-h-[100px] p-2 pb-10">
          {selectedFoods.orderedItems.map((food) => (
            <div key={food.id} className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-sm">{food.name}</div>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold pr-3">{food.count}</span>
                <button
                  onClick={() => handleCountChange(food.id, -1)}
                  className="bg-red-500 border text-white px-2 py-1 w-[60px]"
                >
                  –
                </button>
                <button
                  onClick={() => handleCountChange(food.id, 1)}
                  className="bg-green-500 border text-white px-2 py-1 w-[60px] "
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <Button
            onClick={() => handleCreate()}
            className="bg-main w-full mt-4"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Yuklanmoqda..." : "Yuborish"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Create;
