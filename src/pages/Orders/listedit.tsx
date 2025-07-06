import { getOrders, updateOrder } from "../../api/endpoints/order";
import { getFoods } from "../../api/endpoints/food";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState, useRef, useEffect } from "react";
import { formatThousand } from "../../utils/formatNumber";
import Loader from "../../custom/Loader";
import { Pencil, Plus, Minus } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { toast } from "react-toastify";
import useUserStore from "../../store/user";

const ListEdit: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  const { data: foods = [] } = useQuery({
    queryKey: ["foods"],
    queryFn: getFoods,
  });

  const mutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => window.location.reload(),
    onError: (error: any) => toast.error(error?.response?.data?.message),
  });

  const [editId, setEditId] = useState<number | null>(null);
  const [editedOrders, setEditedOrders] = useState<Record<number, any>>({});

  const { userData } = useUserStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [showList, setShowList] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showList &&
        !inputRef.current?.contains(e.target as Node) &&
        !listRef.current?.contains(e.target as Node)
      ) {
        setShowList(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [showList]);

  const handleQuantityChange = (
    tableId: number,
    productId: number,
    delta: number
  ) => {
    setEditedOrders((prev) => {
      const currentItems = prev[tableId]?.OrderItem || [];

      const updatedItems = currentItems
        .map((item: any) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);

      const newTotal = updatedItems.reduce(
        (acc: number, item: any) => acc + item.product.price * item.quantity,
        0
      );

      return {
        ...prev,
        [tableId]: {
          ...prev[tableId],
          OrderItem: updatedItems,
          total: newTotal, // 🟢 totalni ham yangilab qo'yamiz
        },
      };
    });
  };

  const handleAddFood = (tableId: number, product: any) => {
    setEditedOrders((prev) => {
      const order = prev[tableId];
      const existingItems = order?.OrderItem || [];

      const found = existingItems.find(
        (item: any) => item.product.id === product.id
      );

      let newItems;

      if (found) {
        newItems = existingItems.map((item: any) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * item.product.price,
              }
            : item
        );
      } else {
        const newItem = {
          id: crypto.randomUUID(),
          orderId: order.id,
          productId: product.id,
          quantity: 1,
          total: product.price,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          product,
        };
        newItems = [...existingItems, newItem];
      }

      const newTotal = newItems.reduce(
        (sum: number, item: any) => sum + item.quantity * item.product.price,
        0
      );

      return {
        ...prev,
        [tableId]: {
          ...order,
          OrderItem: newItems,
          total: newTotal,
        },
      };
    });

    setSearchTerm("");
    setShowList(false);
    inputRef.current?.blur();
  };

  const handleSave = (tableId: number) => {
    const forUpdate = editedOrders[tableId].OrderItem.map((item: any) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    mutation.mutate({
      id: editedOrders[tableId].id,
      payload: {
        restaurantId: editedOrders[tableId].restaurantId,
        userId: userData.id,
        orderItems: forUpdate,
      },
    });

    setEditId(null);
  };

  if (isLoading || mutation.isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-3">
      {data?.map((table: any) => {
        const isEditing = editId === table.id;
        const itemList = isEditing
          ? editedOrders[table.id]?.OrderItem || table.OrderItem
          : table.OrderItem;

        const filtered = foods.filter((f: any) =>
          f.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
          <div
            key={table.id}
            className={`relative chek ${
              table.status === "PENDING"
                ? "bg-main text-second font-semibold"
                : table.status === "COMPLETED"
                ? "bg-gray-200 opacity-50"
                : "bg-red-500"
            } min-h-[100px] p-2 pb-10`}
          >
            <button
              className="absolute top-2 right-2"
              onClick={() => {
                setEditId(isEditing ? null : table.id);
                setEditedOrders((prev) => ({
                  ...prev,
                  [table.id]: { ...table },
                }));
              }}
            >
              <Pencil className="w-4 h-4 text-second" />
            </button>

            {/* Stol nomi */}
            <div className="py-3">
              <h1 className="font-semibold bg-second w-[100px] text-center text-main">
                {table.table}
              </h1>
            </div>

            {/* 🔍 Qidiruv input + “drop‑down” */}
            {isEditing && (
              <div className="relative mb-2">
                <Input
                  ref={inputRef}
                  placeholder="Taom qidirish..."
                  value={searchTerm}
                  onFocus={() => setShowList(true)}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowList(true);
                  }}
                />

                {showList && (
                  <div
                    ref={listRef}
                    className="absolute top-full mt-1 w-full max-h-48 overflow-auto rounded border bg-white shadow z-10"
                  >
                    {filtered.length ? (
                      filtered.map((food: any) => (
                        <div
                          key={food.id}
                          onClick={() => handleAddFood(table.id, food)}
                          className="cursor-pointer px-2 py-1 hover:bg-gray-100"
                        >
                          {food.name} — {formatThousand(food.price)} so'm
                        </div>
                      ))
                    ) : (
                      <div className="px-2 py-1 text-sm text-gray-500">
                        Hech narsa topilmadi
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Taomlar ro‘yxi */}
            <div>
              {itemList.map((it: any) => (
                <div
                  key={it.product.id}
                  className="grid grid-cols-3 items-center p-1 border-b border-second"
                >
                  <div>{it.product.name}</div>
                  <div className="flex items-center justify-center gap-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() =>
                            handleQuantityChange(table.id, it.product.id, -1)
                          }
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span>{it.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(table.id, it.product.id, 1)
                          }
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <span>{it.quantity}</span>
                    )}
                  </div>
                  <div className="text-right">
                    {formatThousand(it.product.price * it.quantity)} so'm
                  </div>
                </div>
              ))}
            </div>

            {/* Umumiy summa */}
            <div className="pt-5 text-right">
              <h2>
                {formatThousand(
                  (itemList || []).reduce(
                    (sum: number, it: any) =>
                      sum + it.product.price * it.quantity,
                    0
                  )
                )}{" "}
                so'm
              </h2>
            </div>

            {isEditing && (
              <div className="pt-3 text-right">
                <Button
                  className="bg-second text-main w-full mt-10"
                  onClick={() => handleSave(table.id)}
                >
                  Saqlash
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ListEdit;
