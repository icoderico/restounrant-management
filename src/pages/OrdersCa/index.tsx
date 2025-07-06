import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { getOrders, updateOrder } from "../../api/endpoints/order";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/button";
import { formatThousand } from "../../utils/formatNumber";
import Loader from "../../custom/Loader";

const OrdersCashier: React.FC = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const mutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => window.location.reload(),
    onError: (error: any) => toast.error(error?.response?.data?.message),
  });

  const handleAccept = (orderId: string) => {
    mutation.mutate({ id: orderId, status: "COMPLETED" });
  };

  if (isLoading || mutation.isPending) return <Loader />;

  return (
    <div className="p-4 space-y-4">
      {orders
        ?.filter((order: any) => order.status !== "COMPLETED")
        .map((order: any) => (
          <div key={order.id} className="border p-4 rounded shadow">
            <div className="flex justify-between items-center mb-5">
              <div>
                <div className="font-semibold text-lg">{order.table}</div>

                <div className="text-sm text-main font-semibold ">
                  Umumiy: {formatThousand(order.total)} so‘m
                </div>
              </div>
              {order.status === "PENDING" && (
                <Button
                  onClick={() => handleAccept(order.id)}
                  className="bg-main text-white"
                >
                  Qabul qilish
                </Button>
              )}
            </div>

            <div className="mt-2 space-y-1">
              {order.OrderItem.map((item: any) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b py-1"
                >
                  <div>
                    <div className="font-medium">{item.product.name}</div>
                    <div className="text-sm text-gray-500">
                      {item.quantity} × {formatThousand(item.product.price)}{" "}
                      so‘m
                    </div>
                  </div>
                  <div className="text-sm font-semibold">
                    {formatThousand(item.total)} so‘m
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default OrdersCashier;
